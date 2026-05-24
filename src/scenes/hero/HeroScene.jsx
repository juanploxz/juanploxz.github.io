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
    opacity: 0.5,
  },
  {
    id: "gateway",
    z: -1.6,
    width: 4.15,
    height: 2.55,
    color: "#9ef01a",
    opacity: 0.54,
  },
  {
    id: "projects",
    z: -5.0,
    width: 5.05,
    height: 3.05,
    color: "#ffcc66",
    opacity: 0.48,
  },
  {
    id: "skills",
    z: -8.4,
    width: 4.55,
    height: 2.8,
    color: "#7bdff2",
    opacity: 0.43,
  },
  {
    id: "contact",
    z: -11.6,
    width: 3.65,
    height: 2.25,
    color: "#ff7aa2",
    opacity: 0.45,
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

function PortalFrame({ layer, compact }) {
  const groupRef = useRef(null);
  const geometry = useMemo(
    () => createRectGeometry(layer.width, layer.height),
    [layer.width, layer.height]
  );

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
          opacity={compact ? layer.opacity * 0.68 : layer.opacity}
        />
      </lineSegments>
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[layer.width, layer.height]} />
        <meshBasicMaterial
          color={layer.color}
          transparent
          opacity={compact ? 0.025 : 0.045}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[layer.width + 0.08, 0.018, 0.018]} />
        <meshBasicMaterial color={layer.color} transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.018, layer.height + 0.08, 0.018]} />
        <meshBasicMaterial color={layer.color} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function TunnelRails({ compact }) {
  const railData = useMemo(
    () => [
      { x: -2.25, y: -1.42, color: "#72f2c9" },
      { x: 2.25, y: -1.42, color: "#72f2c9" },
      { x: -2.25, y: 1.42, color: "#9ef01a" },
      { x: 2.25, y: 1.42, color: "#9ef01a" },
      { x: -3.05, y: 0, color: "#7bdff2" },
      { x: 3.05, y: 0, color: "#ff7aa2" },
    ],
    []
  );

  return railData.map((rail) => (
    <line key={`${rail.x}-${rail.y}`} geometry={createRailGeometry(rail.x, rail.y)}>
      <lineBasicMaterial
        color={rail.color}
        transparent
        opacity={compact ? 0.12 : 0.2}
      />
    </line>
  ));
}

function ProjectPanel({ panel, compact, index }) {
  const groupRef = useRef(null);

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
        <meshBasicMaterial color="#050505" transparent opacity={0.76} />
      </mesh>
      <mesh position={[0, 0.42, 0.024]}>
        <boxGeometry args={[1.24, 0.035, 0.025]} />
        <meshBasicMaterial color={panel.color} transparent opacity={0.7} />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh
          key={item}
          position={[-0.36 + item * 0.36, 0.16 - item * 0.16, 0.035]}
        >
          <boxGeometry
            args={[0.22 + item * 0.08, 0.035 + item * 0.015, 0.02]}
          />
          <meshBasicMaterial color={panel.color} transparent opacity={0.48} />
        </mesh>
      ))}
      <mesh position={[0.18, -0.27, 0.035]}>
        <boxGeometry args={[0.68, 0.035, 0.02]} />
        <meshBasicMaterial color="#f3f4ee" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function SkillsMatrix({ compact }) {
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
          <meshBasicMaterial color="#7bdff2" transparent opacity={0.56} />
        </mesh>
      ))}
    </group>
  );
}

function DustField({ compact }) {
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
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

function HeroScene({ progress = 0, compact = false }) {
  const worldRef = useRef(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0.6, 7.2), []);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ camera, pointer }) => {
    const t = THREE.MathUtils.clamp(progress, 0, 1);
    const eased = THREE.MathUtils.smoothstep(t, 0, 1);
    const pointerScale = compact ? 0.06 : 0.18;
    const z = THREE.MathUtils.lerp(7.4, -9.4, eased);
    const y = THREE.MathUtils.lerp(0.58, 0.94, eased);

    cameraTarget.set(pointer.x * pointerScale, y + pointer.y * 0.07, z);
    camera.position.lerp(cameraTarget, 0.045);
    lookTarget.set(pointer.x * 0.08, 0.02, z - 4.1);
    camera.lookAt(lookTarget);

    if (worldRef.current) {
      worldRef.current.rotation.y +=
        (pointer.x * 0.035 - worldRef.current.rotation.y) * 0.035;
      worldRef.current.rotation.x +=
        (-pointer.y * 0.022 - worldRef.current.rotation.x) * 0.035;
    }
  });

  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[2.8, 3.8, 5.2]} intensity={0.9} />
      <pointLight position={[0, 0.2, 2.2]} color="#72f2c9" intensity={1.75} />
      <pointLight position={[1.8, 0.6, -6]} color="#ffcc66" intensity={1.2} />
      <pointLight position={[-1.4, -0.5, -9]} color="#7bdff2" intensity={1.25} />

      <group ref={worldRef}>
        <TunnelRails compact={compact} />
        {layers.map((layer) => (
          <PortalFrame key={layer.id} layer={layer} compact={compact} />
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, -5.4]}>
          <planeGeometry args={[7.4, 16, compact ? 8 : 14, compact ? 14 : 28]} />
          <meshBasicMaterial
            color="#72f2c9"
            wireframe
            transparent
            opacity={compact ? 0.06 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {projectPanels.map((panel, index) => (
          <ProjectPanel
            key={panel.id}
            panel={panel}
            index={index}
            compact={compact}
          />
        ))}

        <SkillsMatrix compact={compact} />
        <DustField compact={compact} />
      </group>
    </>
  );
}

export default HeroScene;
