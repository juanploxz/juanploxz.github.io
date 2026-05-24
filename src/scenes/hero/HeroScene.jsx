import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const layers = [
  {
    id: "hero",
    z: 1.8,
    width: 3.2,
    height: 2.05,
    color: "#72f2c9",
    opacity: 0.34,
  },
  {
    id: "gateway",
    z: -1.6,
    width: 4.15,
    height: 2.55,
    color: "#9ef01a",
    opacity: 0.42,
  },
  {
    id: "projects",
    z: -5.0,
    width: 5.05,
    height: 3.05,
    color: "#ffcc66",
    opacity: 0.38,
  },
  {
    id: "skills",
    z: -8.4,
    width: 4.55,
    height: 2.8,
    color: "#7bdff2",
    opacity: 0.34,
  },
  {
    id: "contact",
    z: -11.6,
    width: 3.65,
    height: 2.25,
    color: "#ff7aa2",
    opacity: 0.36,
  },
];

const projectPanels = [
  { id: "flowgate", z: -4.25, x: -2.55, y: 0.65, color: "#72f2c9" },
  { id: "workout", z: -4.95, x: 2.55, y: 0.45, color: "#ffcc66" },
  { id: "finder", z: -5.85, x: -2.2, y: -0.52, color: "#9ef01a" },
  { id: "reviews", z: -6.4, x: 2.15, y: -0.62, color: "#ff7aa2" },
  { id: "bi", z: -7.0, x: 0, y: 0.05, color: "#7bdff2" },
];

function createRectGeometry(width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const points = new Float32Array([
    -halfWidth,
    -halfHeight,
    0,
    halfWidth,
    -halfHeight,
    0,
    halfWidth,
    -halfHeight,
    0,
    halfWidth,
    halfHeight,
    0,
    halfWidth,
    halfHeight,
    0,
    -halfWidth,
    halfHeight,
    0,
    -halfWidth,
    halfHeight,
    0,
    -halfWidth,
    -halfHeight,
    0,
  ]);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
  return geometry;
}

function createRailGeometry(x, y) {
  const points = new Float32Array([x, y, 2.4, x * 1.28, y * 1.28, -13.4]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
  return geometry;
}

function seededNoise(index, channel) {
  const raw = Math.sin(index * 83.9 + channel * 41.1) * 10000;
  return raw - Math.floor(raw);
}

function PortalFrame({ layer, compact, phase = 0 }) {
  const groupRef = useRef(null);
  const geometry = useMemo(
    () => createRectGeometry(layer.width, layer.height),
    [layer.width, layer.height]
  );
  const activeOpacity = layer.opacity * (0.58 + phase * 0.52);

  useFrame(({ clock }) => {
    if (!groupRef.current || compact) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.position.z =
      layer.z + Math.sin(elapsed * 0.35 + layer.z) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, 0, layer.z]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={layer.color}
          transparent
          opacity={compact ? activeOpacity * 0.6 : activeOpacity}
        />
      </lineSegments>
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[layer.width, layer.height]} />
        <meshBasicMaterial
          color={layer.color}
          transparent
          opacity={compact ? 0.012 : 0.018 + phase * 0.022}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[layer.width + 0.08, 0.018, 0.018]} />
        <meshBasicMaterial
          color={layer.color}
          transparent
          opacity={0.22 + phase * 0.24}
        />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.018, layer.height + 0.08, 0.018]} />
        <meshBasicMaterial
          color={layer.color}
          transparent
          opacity={0.14 + phase * 0.18}
        />
      </mesh>
    </group>
  );
}

function Rail({ rail, compact, intensity }) {
  const geometry = useMemo(
    () => createRailGeometry(rail.x, rail.y),
    [rail.x, rail.y]
  );

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={rail.color}
        transparent
        opacity={compact ? 0.075 : 0.08 + intensity * 0.095}
      />
    </line>
  );
}

function TunnelRails({ compact, intensity = 0 }) {
  const railData = useMemo(
    () => [
      { x: -2.25, y: -1.42, color: "#72f2c9" },
      { x: 2.25, y: -1.42, color: "#72f2c9" },
      { x: -2.25, y: 1.42, color: "#9ef01a" },
      { x: 2.25, y: 1.42, color: "#9ef01a" },
    ],
    []
  );

  return railData.map((rail) => (
    <Rail
      key={`${rail.x}-${rail.y}`}
      rail={rail}
      compact={compact}
      intensity={intensity}
    />
  ));
}

function ProjectPanel({ panel, compact, index, intensity = 0 }) {
  const groupRef = useRef(null);
  const panelOpacity = compact ? 0.24 : 0.22 + intensity * 0.54;

  useFrame(({ clock }) => {
    if (!groupRef.current || compact) {
      return;
    }

    groupRef.current.position.y =
      panel.y + Math.sin(clock.getElapsedTime() * 0.45 + index) * 0.035;
  });

  return (
    <group
      ref={groupRef}
      position={[panel.x, panel.y, panel.z]}
      rotation={[0, panel.x > 0 ? -0.18 : 0.18, 0]}
    >
      <mesh>
        <boxGeometry args={[1.24, 0.78, 0.025]} />
        <meshBasicMaterial color="#050505" transparent opacity={panelOpacity} />
      </mesh>
      <mesh position={[0, 0.42, 0.024]}>
        <boxGeometry args={[1.24, 0.035, 0.025]} />
        <meshBasicMaterial
          color={panel.color}
          transparent
          opacity={0.24 + intensity * 0.44}
        />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh
          key={item}
          position={[-0.36 + item * 0.36, 0.16 - item * 0.16, 0.035]}
        >
          <boxGeometry
            args={[0.22 + item * 0.08, 0.035 + item * 0.015, 0.02]}
          />
          <meshBasicMaterial
            color={panel.color}
            transparent
            opacity={0.16 + intensity * 0.34}
          />
        </mesh>
      ))}
      <mesh position={[0.18, -0.27, 0.035]}>
        <boxGeometry args={[0.68, 0.035, 0.02]} />
        <meshBasicMaterial
          color="#f3f4ee"
          transparent
          opacity={0.1 + intensity * 0.2}
        />
      </mesh>
    </group>
  );
}

function SkillsMatrix({ compact, intensity = 0 }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: compact ? 10 : 18 }, (_, index) => ({
        x: -1.35 + (index % 6) * 0.54,
        y: -0.55 + Math.floor(index / 6) * 0.46,
        z: -8.4 + seededNoise(index, 1) * 0.32,
        scale: 0.035 + seededNoise(index, 2) * 0.025,
      })),
    [compact]
  );

  return (
    <group position={[0, 0, 0]}>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <boxGeometry args={[node.scale, node.scale, node.scale]} />
          <meshBasicMaterial
            color="#7bdff2"
            transparent
            opacity={compact ? 0.18 : 0.18 + intensity * 0.38}
          />
        </mesh>
      ))}
    </group>
  );
}

function DustField({ compact, intensity = 0 }) {
  const pointsRef = useRef(null);
  const count = compact ? 0 : 32;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seededNoise(index, 1) - 0.5) * 4.6;
      positions[index * 3 + 1] = (seededNoise(index, 2) - 0.5) * 2.5;
      positions[index * 3 + 2] = 1.5 - seededNoise(index, 3) * 12.5;
    }

    const geometryInstance = new THREE.BufferGeometry();
    geometryInstance.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    return geometryInstance;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.position.z =
        (Math.sin(clock.getElapsedTime() * 0.18) + 1) * 0.05;
    }
  });

  if (compact) {
    return null;
  }

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#f3f4ee"
        size={0.014}
        transparent
        opacity={0.1 + intensity * 0.14}
        depthWrite={false}
      />
    </points>
  );
}

const defaultJourney = {
  progress: 0,
  phases: {
    hero: 0,
    gateway: 0,
    projects: 0,
    skills: 0,
    timeline: 0,
    contact: 0,
  },
};

function HeroScene({ journey = defaultJourney, compact = false }) {
  const worldRef = useRef(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0.6, 7.2), []);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ camera, pointer }) => {
    const { phases = defaultJourney.phases } = journey;
    const pointerScale = compact ? 0.06 : 0.18;
    const gateway = phases.gateway ?? 0;
    const projects = phases.projects ?? 0;
    const skills = phases.skills ?? 0;
    const contact = phases.contact ?? 0;
    const z =
      7.35 -
      gateway * 4.75 -
      projects * 6.25 -
      skills * 3.05 -
      contact * 2.0;
    const y = 0.58 + gateway * 0.14 + projects * 0.18 - skills * 0.08;
    const x = projects * 0.1 - skills * 0.08 + contact * 0.03;

    cameraTarget.set(
      x + pointer.x * pointerScale,
      y + pointer.y * 0.055,
      z
    );
    camera.position.lerp(cameraTarget, compact ? 0.07 : 0.052);
    lookTarget.set(pointer.x * 0.05, 0.02 - skills * 0.08, z - 4.2);
    camera.lookAt(lookTarget);

    if (worldRef.current) {
      worldRef.current.rotation.y +=
        (pointer.x * 0.025 - worldRef.current.rotation.y) * 0.035;
      worldRef.current.rotation.x +=
        (-pointer.y * 0.016 - worldRef.current.rotation.x) * 0.035;
    }
  });

  const { phases = defaultJourney.phases } = journey;
  const sceneIntensity =
    0.32 +
    (phases.gateway ?? 0) * 0.38 +
    (phases.projects ?? 0) * 0.22 +
    (phases.skills ?? 0) * 0.18;

  return (
    <>
      <fog attach="fog" args={["#050505", 6.8, compact ? 16 : 19]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[2.8, 3.8, 5.2]} intensity={0.9} />
      <pointLight position={[0, 0.2, 2.2]} color="#72f2c9" intensity={1.05 + sceneIntensity} />
      <pointLight position={[1.8, 0.6, -6]} color="#ffcc66" intensity={0.55 + (phases.projects ?? 0) * 0.75} />
      <pointLight position={[-1.4, -0.5, -9]} color="#7bdff2" intensity={0.55 + (phases.skills ?? 0) * 0.75} />

      <group ref={worldRef}>
        <TunnelRails compact={compact} intensity={sceneIntensity} />
        {layers.map((layer) => (
          <PortalFrame
            key={layer.id}
            layer={layer}
            compact={compact}
            phase={phases[layer.id] ?? 0}
          />
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, -5.4]}>
          <planeGeometry args={[7.4, 16, compact ? 8 : 14, compact ? 14 : 28]} />
          <meshBasicMaterial
            color="#72f2c9"
            wireframe
            transparent
            opacity={compact ? 0.035 : 0.045 + sceneIntensity * 0.045}
            side={THREE.DoubleSide}
          />
        </mesh>

        {projectPanels.map((panel, index) => (
          <ProjectPanel
            key={panel.id}
            panel={panel}
            index={index}
            compact={compact}
            intensity={phases.projects ?? 0}
          />
        ))}

        <SkillsMatrix compact={compact} intensity={phases.skills ?? 0} />
        <DustField compact={compact} intensity={sceneIntensity} />
      </group>
    </>
  );
}

export default HeroScene;
