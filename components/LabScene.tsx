'use client';

// 미션 작업대 3D 장면. 실제 부품을 단순한 도형으로 놓고, 전류는 선을 따라 움직이는 빛 알갱이로 보여준다.
// 알갱이 방향은 관례상 전류 방향(+ → 부하 → −)이고, 속도는 전류 크기에 비례한다.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { SceneKind } from '@/content/missions';

export interface SceneValues {
  sun: number;
  volts: number;
  amps: number;
  watts: number;
  ohms: number;
  rating: number;
  lux: number;
  lines: string[];
}

interface Props {
  kind: SceneKind;
  values: SceneValues;
  selected: string | null;
  onPick: (slug: string) => void;
}

const SUN_POS = new THREE.Vector3(-8, 7, -7);
const C = { red: 0xd93025, black: 0x26282b, sda: 0xf2b705, scl: 0x2e9e4f, usb: 0x8a8f98 };

type Handles = {
  update: (v: SceneValues) => void;
  select: (slug: string | null) => void;
  dispose: () => void;
};

export default function LabScene({ kind, values, selected, onPick }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const handles = useRef<Handles | null>(null);
  const valuesRef = useRef(values);
  const pickRef = useRef(onPick);
  valuesRef.current = values;
  pickRef.current = onPick;

  useEffect(() => {
    if (!host.current) return;
    handles.current = build(host.current, kind, valuesRef, (s) => pickRef.current(s));
    handles.current.update(valuesRef.current);
    return () => {
      handles.current?.dispose();
      handles.current = null;
    };
  }, [kind]);

  useEffect(() => {
    handles.current?.update(values);
  }, [values]);

  useEffect(() => {
    handles.current?.select(selected);
  }, [selected]);

  return <div ref={host} className="scene" role="img" aria-label="부품과 전기의 흐름을 보여주는 3D 작업대. 끌어서 돌리고, 부품을 누르면 설명이 나와." />;
}

function build(el: HTMLDivElement, kind: SceneKind, valuesRef: { current: SceneValues }, pick: (slug: string) => void): Handles {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  el.appendChild(renderer.domElement);
  const labels = new CSS2DRenderer();
  labels.domElement.className = 'scene-labels';
  el.appendChild(labels.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = 3;
  controls.maxDistance = 16;
  const focus = kind === 'meter' ? new THREE.Vector3(-1.1, 0.6, -0.2) : kind === 'load' ? new THREE.Vector3(-0.3, 0.45, -0.1) : new THREE.Vector3(0.9, 0.4, 0.5);
  const offset = kind === 'meter' ? new THREE.Vector3(2.6, 2.4, 3.8) : kind === 'load' ? new THREE.Vector3(3.0, 2.9, 4.3) : new THREE.Vector3(3.8, 3.8, 5.6);
  // 세로로 긴 화면(휴대폰)에서는 조금 뒤로 물러나 전체가 보이게 한다.
  if (el.clientWidth < el.clientHeight * 1.2) offset.multiplyScalar(1.35);
  controls.target.copy(focus);
  camera.position.copy(focus).add(offset);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f72, 1.1));
  const sunLight = new THREE.DirectionalLight(0xfff1d6, 2);
  sunLight.position.copy(SUN_POS);
  scene.add(sunLight);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.5);
  fill.position.set(6, 5, 8);
  scene.add(fill);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);
  const mat = (color: number, extra: THREE.MeshStandardMaterialParameters = {}) =>
    track(new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...extra }));
  const box = (w: number, h: number, d: number, m: THREE.Material | THREE.Material[]) => new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), m);

  const pickables: THREE.Object3D[] = [];
  const tags = new Map<string, HTMLDivElement[]>();
  const tag = (text: string, at: THREE.Vector3, parent: THREE.Object3D, slug?: string) => {
    const div = document.createElement('div');
    div.className = 'tag';
    div.textContent = text;
    if (slug) {
      div.dataset.slug = slug;
      div.addEventListener('click', () => pick(slug));
      tags.set(slug, [...(tags.get(slug) ?? []), div]);
    }
    const o = new CSS2DObject(div);
    o.position.copy(at);
    parent.add(o);
    return div;
  };
  const pickable = (o: THREE.Object3D, slug: string) => {
    o.traverse((c) => (c.userData.slug = slug));
    pickables.push(o);
  };

  // 책상
  const desk = new THREE.Mesh(track(new THREE.CircleGeometry(16, 64)), mat(0xd9c7a8, { roughness: 0.85 }));
  desk.rotation.x = -Math.PI / 2;
  desk.position.set(0, 0, 0.5);
  scene.add(desk);

  // 해
  const sunMat = track(new THREE.MeshBasicMaterial({ color: 0xffd65a }));
  const sunMesh = new THREE.Mesh(track(new THREE.SphereGeometry(0.7, 32, 16)), sunMat);
  sunMesh.position.copy(SUN_POS);
  scene.add(sunMesh);

  // 태양광 패널: 앞면(+z)이 해를 본다. 정션박스는 뒷면 위쪽.
  const panel = new THREE.Group();
  const cells = document.createElement('canvas');
  cells.width = 430;
  cells.height = 360;
  const cx = cells.getContext('2d')!;
  cx.fillStyle = '#16325c';
  cx.fillRect(0, 0, 430, 360);
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++) {
      cx.fillStyle = '#1f4a86';
      cx.fillRect(10 + i * 70, 10 + j * 58, 62, 50);
      cx.strokeStyle = 'rgba(200,220,255,.35)';
      cx.beginPath();
      cx.moveTo(10 + i * 70, 35 + j * 58);
      cx.lineTo(72 + i * 70, 35 + j * 58);
      cx.stroke();
    }
  const cellTex = track(new THREE.CanvasTexture(cells));
  cellTex.colorSpace = THREE.SRGBColorSpace;
  const cellMat = mat(0xffffff, { map: cellTex, roughness: 0.25, metalness: 0.3, emissive: 0x0b2a55, emissiveIntensity: 0 });
  const frameMat = mat(0xb8bcc2, { metalness: 0.6, roughness: 0.35 });
  const backMat = mat(0x3a3d42);
  const board = box(2.15, 1.8, 0.06, [frameMat, frameMat, frameMat, frameMat, cellMat, backMat]);
  panel.add(board);
  const jbox = box(0.56, 0.32, 0.12, mat(0x1d1f22));
  jbox.position.set(0, 0.5, -0.09);
  panel.add(jbox);
  const screw = (x: number, color: number) => {
    const s = new THREE.Mesh(track(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16)), mat(color, { metalness: 0.8, roughness: 0.3 }));
    s.rotation.x = Math.PI / 2;
    s.position.set(x, 0.6, -0.17);
    panel.add(s);
    return s;
  };
  const plusScrew = screw(-0.17, 0xc9a227);
  const minusScrew = screw(0.17, 0x9aa0a6);
  const diode = new THREE.Mesh(track(new THREE.CylinderGeometry(0.03, 0.03, 0.14, 12)), mat(0x111111));
  diode.rotation.z = Math.PI / 2;
  diode.position.set(0, 0.42, -0.16);
  panel.add(diode);
  panel.position.set(-2.1, 1.1, -1.2);
  panel.lookAt(SUN_POS);
  scene.add(panel);
  const leg = (x: number) => {
    const l = new THREE.Mesh(track(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8)), frameMat);
    l.position.set(-2.1 + x, 0.5, -0.85);
    scene.add(l);
  };
  leg(-0.8);
  leg(0.8);
  pickable(panel, 'SNP-5MA');
  panel.updateMatrixWorld(true);
  const plus = plusScrew.getWorldPosition(new THREE.Vector3());
  const minus = minusScrew.getWorldPosition(new THREE.Vector3());
  tag('+ 오른쪽 위 나사', new THREE.Vector3(-0.55, 1.0, -0.2), panel);
  tag('− 왼쪽 위 나사', new THREE.Vector3(0.55, 1.0, -0.2), panel);
  tag('태양광 패널', new THREE.Vector3(0, -1.05, 0), panel, 'SNP-5MA');

  // 선
  const wire = (pts: THREE.Vector3[], color: number, r = 0.022) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const m = new THREE.Mesh(track(new THREE.TubeGeometry(curve, 80, r, 8)), mat(color, { roughness: 0.45 }));
    scene.add(m);
    return curve;
  };
  const sag = (a: THREE.Vector3, b: THREE.Vector3, lift = 0.25) => {
    const mid = a.clone().lerp(b, 0.5);
    mid.y = Math.max(0.04, Math.min(a.y, b.y) - lift);
    return [a, a.clone().lerp(mid, 0.5).setY((a.y + mid.y) / 2), mid, b.clone().lerp(mid, 0.5).setY((b.y + mid.y) / 2), b];
  };

  // 부품들
  let meterCanvas: HTMLCanvasElement | null = null;
  let meterTex: THREE.CanvasTexture | null = null;
  let screenCanvas: HTMLCanvasElement | null = null;
  let screenTex: THREE.CanvasTexture | null = null;
  let resistorMat: THREE.MeshStandardMaterial | null = null;
  let resistorTag: HTMLDivElement | null = null;
  let resistorEnds: [THREE.Vector3, THREE.Vector3] | null = null;
  const hasMeter = kind === 'meter' || kind === 'load';
  const hasResistor = kind !== 'meter';
  const hasEsp = kind === 'ina219' || kind === 'bh1750' || kind === 'logger';

  if (hasMeter) {
    const g = new THREE.Group();
    const body = box(0.8, 0.22, 1.45, mat(0xf1c232));
    g.add(body);
    meterCanvas = document.createElement('canvas');
    meterCanvas.width = 256;
    meterCanvas.height = 128;
    meterTex = track(new THREE.CanvasTexture(meterCanvas));
    meterTex.colorSpace = THREE.SRGBColorSpace;
    const lcd = new THREE.Mesh(track(new THREE.PlaneGeometry(0.62, 0.31)), track(new THREE.MeshBasicMaterial({ map: meterTex })));
    lcd.rotation.x = -Math.PI / 2;
    lcd.position.set(0, 0.112, -0.38);
    g.add(lcd);
    const dial = new THREE.Mesh(track(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 32)), mat(0x2b2b2b));
    dial.position.set(0, 0.13, 0.12);
    g.add(dial);
    const jack = (x: number, color: number) => {
      const j = new THREE.Mesh(track(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 16)), mat(color));
      j.position.set(x, 0.13, 0.55);
      g.add(j);
      return j;
    };
    const com = jack(-0.18, C.black);
    const vo = jack(0.18, C.red);
    g.position.set(kind === 'meter' ? -0.5 : 1.3, 0.11, kind === 'meter' ? 0.7 : 1.0);
    g.rotation.y = kind === 'meter' ? -0.35 : -0.6;
    scene.add(g);
    g.updateMatrixWorld(true);
    pickable(g, 'UNI-T-UT33A+');
    tag('멀티미터 (DC V)', new THREE.Vector3(0, 0.4, -0.2), g, 'UNI-T-UT33A+');
    const comP = com.getWorldPosition(new THREE.Vector3());
    const voP = vo.getWorldPosition(new THREE.Vector3());
    // 미션 1은 패널 단자, 미션 2는 저항 양 끝에 침을 댄다(아래에서 연결).
    (g.userData as { com: THREE.Vector3; vo: THREE.Vector3 }).com = comP;
    (g.userData as { com: THREE.Vector3; vo: THREE.Vector3 }).vo = voP;
    if (kind === 'meter') {
      wire(sag(voP, plus.clone().add(new THREE.Vector3(0, 0, 0.02)), 0.6), C.red, 0.016);
      wire(sag(comP, minus.clone().add(new THREE.Vector3(0, 0, 0.02)), 0.5), C.black, 0.016);
    }
  }

  if (hasResistor) {
    const g = new THREE.Group();
    resistorMat = mat(0xe8e2d6, { emissive: 0xff5a1f, emissiveIntensity: 0, roughness: 0.9 });
    g.add(box(1.0, 0.3, 0.3, resistorMat));
    const leadMat = mat(0xc0c4c8, { metalness: 0.8, roughness: 0.3 });
    for (const s of [-1, 1]) {
      const lead = new THREE.Mesh(track(new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8)), leadMat);
      lead.rotation.z = Math.PI / 2;
      lead.position.set(s * 0.67, 0, 0);
      g.add(lead);
    }
    g.position.set(hasEsp ? 0.2 : 0.4, 0.17, hasEsp ? -0.8 : -0.2);
    scene.add(g);
    g.updateMatrixWorld(true);
    pickable(g, 'cement-resistors');
    resistorTag = tag('시멘트 저항', new THREE.Vector3(0, 0.38, 0), g, 'cement-resistors');
    resistorEnds = [g.localToWorld(new THREE.Vector3(-0.84, 0, 0)), g.localToWorld(new THREE.Vector3(0.84, 0, 0))];
  }

  // 전류가 지나는 길 (+ → 부하 → −)
  const loop: THREE.Vector3[] = [];
  const addCurve = (curve: THREE.Curve<THREE.Vector3>, reverse = false) => {
    const pts = curve.getSpacedPoints(60);
    if (reverse) pts.reverse();
    loop.push(...pts);
  };

  let ina: THREE.Group | null = null;
  let esp: THREE.Group | null = null;
  let espPins: Record<string, THREE.Vector3> = {};
  let sdaCurves: THREE.Curve<THREE.Vector3>[] = [];
  let usbCurve: THREE.Curve<THREE.Vector3> | null = null;

  if (hasEsp) {
    // 브레드보드 + ESP32
    const bb = box(2.5, 0.12, 0.9, mat(0xf4f1ea, { roughness: 0.9 }));
    bb.position.set(1.4, 0.06, 1.7);
    scene.add(bb);
    pickable(bb, 'breadboard');
    tag('브레드보드', new THREE.Vector3(1.4, 0.15, 2.25), scene, 'breadboard');
    esp = new THREE.Group();
    esp.add(box(1.1, 0.05, 0.5, mat(0x1f2328)));
    const shield = box(0.46, 0.06, 0.34, mat(0xc7ccd1, { metalness: 0.7, roughness: 0.35 }));
    shield.position.set(-0.2, 0.05, 0);
    esp.add(shield);
    const usb = box(0.14, 0.06, 0.18, mat(0x9aa0a6, { metalness: 0.7 }));
    usb.position.set(0.56, 0.04, 0);
    esp.add(usb);
    esp.position.set(1.4, 0.16, 1.7);
    scene.add(esp);
    esp.updateMatrixWorld(true);
    pickable(esp, 'ESP32-DevKitC');
    tag('ESP32', new THREE.Vector3(-0.2, 0.25, 0), esp, 'ESP32-DevKitC');
    const pin = (x: number) => esp!.localToWorld(new THREE.Vector3(x, 0.04, -0.23));
    espPins = { v33: pin(-0.45), gnd: pin(-0.32), sda: pin(0.18), scl: pin(0.3) };
    for (const [name, p] of Object.entries(espPins)) {
      const label = { v33: '3.3V', gnd: 'GND', sda: '21 SDA', scl: '22 SCL' }[name]!;
      const t = tag(label, p.clone().add(new THREE.Vector3(0, 0.12, -0.05)), scene);
      t.classList.add('pin');
    }

    // INA219
    ina = new THREE.Group();
    ina.add(box(0.55, 0.035, 0.34, mat(0x4b3a8c)));
    const term = box(0.3, 0.12, 0.12, mat(0x2f6fd6));
    term.position.set(0, 0.07, -0.12);
    ina.add(term);
    const chip = box(0.12, 0.03, 0.08, mat(0x111111));
    chip.position.set(0, 0.03, 0.04);
    ina.add(chip);
    ina.position.set(-1.0, 0.06, 0.3);
    scene.add(ina);
    ina.updateMatrixWorld(true);
    pickable(ina, 'INA219');
    tag('INA219', new THREE.Vector3(0, 0.3, 0.1), ina, 'INA219');
    const vinPlus = ina.localToWorld(new THREE.Vector3(-0.08, 0.14, -0.12));
    const vinMinus = ina.localToWorld(new THREE.Vector3(0.08, 0.14, -0.12));
    tag('VIN+', vinPlus.clone().add(new THREE.Vector3(-0.08, 0.1, 0)), scene).classList.add('pin');
    tag('VIN−', vinMinus.clone().add(new THREE.Vector3(0.08, 0.1, 0)), scene).classList.add('pin');
    const inaPin = (x: number) => ina!.localToWorld(new THREE.Vector3(x, 0.03, 0.15));

    const a = wire(sag(plus, vinPlus, 0.7), C.red);
    const b = wire(sag(vinMinus, resistorEnds![0], 0.1), C.red);
    const c = wire(sag(resistorEnds![1], minus, 0.6), C.black);
    wire(sag(minus, espPins.gnd, 0.9), C.black, 0.012);
    addCurve(a);
    addCurve(b);
    addCurve(new THREE.LineCurve3(resistorEnds![0], resistorEnds![1]));
    addCurve(c);

    const bus = (from: (k: number) => THREE.Vector3, offset: number) => {
      const k = ['v33', 'gnd', 'sda', 'scl'];
      const colors = [C.red, C.black, C.sda, C.scl];
      return k.map((name, i) => wire(sag(from(i), espPins[name].clone().add(new THREE.Vector3(offset, 0, 0)), 0.02), colors[i], 0.011));
    };
    const inaBus = bus((i) => inaPin(-0.18 + i * 0.12), 0);
    sdaCurves.push(inaBus[2]);

    if (kind === 'bh1750' || kind === 'logger') {
      const bh = new THREE.Group();
      bh.add(box(0.32, 0.03, 0.26, mat(0x1e5aa8)));
      const dome = new THREE.Mesh(track(new THREE.SphereGeometry(0.05, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)), mat(0xf5f5f5, { roughness: 0.2 }));
      dome.position.set(0, 0.015, 0);
      bh.add(dome);
      bh.position.set(-1.9, 0.05, 1.3);
      scene.add(bh);
      bh.updateMatrixWorld(true);
      pickable(bh, 'BH1750');
      tag('BH1750', new THREE.Vector3(0, 0.25, 0), bh, 'BH1750');
      const bhBus = bus((i) => bh.localToWorld(new THREE.Vector3(-0.09 + i * 0.06, 0.02, 0.12)), 0.03);
      sdaCurves.push(bhBus[2]);
    }

    // 맥미니와 화면
    const mac = new THREE.Mesh(track(new RoundedBoxGeometry(1.5, 0.3, 1.5, 4, 0.14)), mat(0xd7dadf, { metalness: 0.55, roughness: 0.3 }));
    mac.position.set(3.9, 0.15, 1.6);
    scene.add(mac);
    pickable(mac, 'mac');
    tag('맥미니', new THREE.Vector3(3.9, 0.45, 1.6), scene, 'mac');
    usbCurve = wire(sag(esp.localToWorld(new THREE.Vector3(0.66, 0.04, 0)), new THREE.Vector3(3.15, 0.15, 1.6), 0.0), C.usb, 0.02);
    screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 300;
    screenTex = track(new THREE.CanvasTexture(screenCanvas));
    screenTex.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(2.4, 1.4)), track(new THREE.MeshBasicMaterial({ map: screenTex })));
    screen.position.set(4.2, 1.45, 0.2);
    screen.rotation.y = -0.35;
    scene.add(screen);
    const frame = box(2.5, 1.5, 0.05, mat(0x202124));
    frame.position.copy(screen.position).add(new THREE.Vector3(0.02, 0, -0.04));
    frame.rotation.y = -0.35;
    scene.add(frame);
  } else if (kind === 'load' && resistorEnds) {
    const a = wire(sag(plus, resistorEnds[0], 0.7), C.red);
    const c = wire(sag(resistorEnds[1], minus, 0.6), C.black);
    addCurve(a);
    addCurve(new THREE.LineCurve3(resistorEnds[0], resistorEnds[1]));
    addCurve(c);
    // 멀티미터는 저항 양 끝에 나란히(병렬) 댄다.
    const meter = scene.children.find((o) => o.userData.slug === 'UNI-T-UT33A+' && (o.userData as { vo?: unknown }).vo) as THREE.Object3D | undefined;
    const md = meter?.userData as { com: THREE.Vector3; vo: THREE.Vector3 } | undefined;
    if (md) {
      wire(sag(md.vo, resistorEnds[0].clone().add(new THREE.Vector3(0.12, 0.05, 0)), 0.1), C.red, 0.012);
      wire(sag(md.com, resistorEnds[1].clone().add(new THREE.Vector3(-0.12, 0.05, 0)), 0.1), C.black, 0.012);
    }
  }

  // 전류 알갱이
  const lengths: number[] = [0];
  for (let i = 1; i < loop.length; i++) lengths.push(lengths[i - 1] + loop[i].distanceTo(loop[i - 1]));
  const total = lengths[lengths.length - 1] || 1;
  const at = (u: number, out: THREE.Vector3) => {
    const d = (((u % 1) + 1) % 1) * total;
    let lo = 0;
    let hi = lengths.length - 1;
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1;
      if (lengths[m] < d) lo = m;
      else hi = m;
    }
    const span = lengths[hi] - lengths[lo] || 1;
    return out.copy(loop[lo]).lerp(loop[hi], (d - lengths[lo]) / span);
  };
  const N = loop.length ? 34 : 0;
  const dotMat = track(new THREE.MeshBasicMaterial({ color: 0xfff27a, transparent: true, opacity: 0.95 }));
  const dots = new THREE.InstancedMesh(track(new THREE.SphereGeometry(0.055, 12, 8)), dotMat, Math.max(N, 1));
  dots.visible = N > 0;
  scene.add(dots);
  let phase = 0;

  // I2C 신호 알갱이와 USB 데이터 알갱이
  const pulseMat = track(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const pulseGeo = track(new THREE.SphereGeometry(0.03, 8, 6));
  const pulses = [...sdaCurves, ...(usbCurve ? [usbCurve] : [])].map((curve) => {
    const m = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(m);
    return { curve, mesh: m, t: Math.random() };
  });

  // 숫자 화면
  const drawMeter = (v: SceneValues) => {
    if (!meterCanvas || !meterTex) return;
    const g = meterCanvas.getContext('2d')!;
    g.fillStyle = '#b9c7a3';
    g.fillRect(0, 0, 256, 128);
    g.fillStyle = '#1d2418';
    g.font = 'bold 64px ui-monospace, Menlo, monospace';
    g.textAlign = 'right';
    g.fillText(v.volts.toFixed(2), 210, 86);
    g.font = 'bold 22px ui-monospace, Menlo, monospace';
    g.fillText('V', 240, 86);
    g.textAlign = 'left';
    g.fillText('DC', 14, 30);
    meterTex.needsUpdate = true;
  };
  const drawScreen = (v: SceneValues) => {
    if (!screenCanvas || !screenTex) return;
    const g = screenCanvas.getContext('2d')!;
    g.fillStyle = '#0f1115';
    g.fillRect(0, 0, 512, 300);
    g.fillStyle = '#8ab4f8';
    g.font = '16px ui-monospace, Menlo, monospace';
    g.fillText(kind === 'logger' ? 'solar-log.csv' : '시리얼 모니터  115200', 18, 28);
    g.fillStyle = '#e8eaed';
    g.font = '18px ui-monospace, Menlo, monospace';
    v.lines.slice(-10).forEach((line, i) => g.fillText(line, 18, 62 + i * 23));
    screenTex.needsUpdate = true;
  };

  const update = (v: SceneValues) => {
    const s = v.sun;
    sunLight.intensity = 0.25 + 2.4 * s;
    sunMat.color.setHSL(0.13, 0.9, 0.25 + 0.5 * s);
    sunMesh.scale.setScalar(0.6 + 0.6 * s);
    cellMat.emissiveIntensity = 0.6 * s;
    if (resistorMat) resistorMat.emissiveIntensity = Math.min(1.2, (v.watts / v.rating) * 3);
    if (resistorTag) resistorTag.textContent = `시멘트 저항 ${v.ohms}Ω · ${v.watts.toFixed(2)}W`;
    drawMeter(v);
    drawScreen(v);
  };

  const select = (slug: string | null) => {
    tags.forEach((divs, key) => divs.forEach((d) => d.classList.toggle('on', key === slug)));
    labels.domElement.classList.toggle('show-pins', !!slug && ['ESP32-DevKitC', 'INA219', 'BH1750', 'breadboard'].includes(slug));
  };

  // 부품 누르기 (끌기와 구분)
  const ray = new THREE.Raycaster();
  let down: { x: number; y: number } | null = null;
  const onDown = (e: PointerEvent) => (down = { x: e.clientX, y: e.clientY });
  const onUp = (e: PointerEvent) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    const r = renderer.domElement.getBoundingClientRect();
    ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
    const hit = ray.intersectObjects(pickables, true)[0];
    if (hit?.object.userData.slug) pick(hit.object.userData.slug);
  };
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);

  const resize = () => {
    const w = el.clientWidth;
    const h = el.clientHeight;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  const m4 = new THREE.Matrix4();
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const v = valuesRef.current;
    if (N) {
      const flowing = v.amps > 0.002;
      dots.visible = flowing;
      phase += dt * (0.03 + (v.amps / 0.61) * 0.45);
      for (let i = 0; i < N; i++) {
        at(phase + i / N, tmp);
        m4.makeTranslation(tmp.x, tmp.y, tmp.z);
        dots.setMatrixAt(i, m4);
      }
      dots.instanceMatrix.needsUpdate = true;
    }
    for (const p of pulses) {
      p.t = (p.t + dt * 0.45) % 1;
      p.mesh.position.copy(p.curve.getPointAt(p.t));
    }
    controls.update();
    renderer.render(scene, camera);
    labels.render(scene, camera);
  };
  tick();

  return {
    update,
    select,
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      controls.dispose();
      disposables.forEach((d) => d.dispose());
      dots.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
      el.removeChild(labels.domElement);
    },
  };
}
