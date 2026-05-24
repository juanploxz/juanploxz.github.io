import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const projectNodes = [
  { position: [-1.9, 0.1, -0.1], color: "#72f2c9", scale: 0.54 },
  { position: [-0.95, 0.76, -0.65], color: "#ffcc66", scale: 0.44 },
  { position: [0.55, 0.92, -0.35], color: "#9ef01a", scale: 0.48 },
  { position: [1.72, 0.2, -0.72], color: "#ff7aa2", scale: 0.45 },
  { position: [1.15, -0.62, 0.18], color: "#7bdff2", scale: 0.52 },
  { position: [-0.48, -0.86, 0.24], color: "#f3f4ee", scale: 0.38 },
  { position: [-1.55, -0.48, 0.42], color: "#72f2c9", scale: 0.34 },
];

function seededNoise(index, channel) {
  const raw = Math.sin(index * 91.7 + channel * 37.3) * 10000;
  return raw - Math.floor(raw);
}

function ProductNode({ node, index, compact }) {
  const groupRef = useRef(null);
  const basePosition = useMemo(() => new THREE.Vector3(...node.position), [node]);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const speed = compact ? 0.45 : 0.7;
    groupRef.current.position.y =
      basePosition.y + Math.sin(elapsed * speed + index * 0.85) * 0.055;
    groupRef.current.rotation.z =
      (index % 2 === 0 ? 0.08 : -0.08) +
      Math.sin(elapsed * 0.24 + index) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      position={basePosition}
      scale={node.scale}
      rotation={[0.1, index % 2 === 0 ? 0.18 : -0.16, 0]}
    >
      <mesh>
        <boxGeometry args={[1.4, 0.08, 0.84]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.22}
          metalness={0.42}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <boxGeometry args={[0.54, 0.035, 0.3]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.78} />
      </mesh>
      <mesh position={[0.46, 0.12, -0.22]}>
        <boxGeometry args={[0.18, 0.04, 0.18]} />
        <meshBasicMaterial color="#f3f4ee" transparent opacity={0.86} />
      </mesh>
    </group>
  );
}

function ConnectionLine({ points, color, compact }) {
  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setFromPoints(points);
    return lineGeometry;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={compact ? 0.24 : 0.36}
      />
    </line>
  );
}

function SparkField({ compact }) {
  const pointsRef = useRef(null);
  const count = compact ? 0 : 40;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seededNoise(index, 1) - 0.5) * 5.4;
      positions[index * 3 + 1] = (seededNoise(index, 2) - 0.5) * 2.3;
      positions[index * 3 + 2] = (seededNoise(index, 3) - 0.5) * 2.6;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return pointsGeometry;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025;
    }
  });

  if (compact) {
    return null;
  }

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#f3f4ee"
        size={0.018}
        transparent
        opacity={0.52}
        depthWrite={false}
      />
    </points>
  );
}

function HeroScene({ progress = 0, compact = false }) {
  const rigRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0.62, 5.25), []);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0.02, -0.2), []);
  const visibleNodes = compact ? projectNodes.slice(0, 5) : projectNodes;
  const connectionLines = useMemo(() => {
    const center = new THREE.Vector3(0, 0.05, 0);

    return visibleNodes.map((node) => [
      center,
      new THREE.Vector3(...node.position),
    ]);
  }, [visibleNodes]);

  useFrame(({ camera, clock, pointer }) => {
    const scroll = THREE.MathUtils.clamp(progress, 0, 1);
    const elapsed = clock.getElapsedTime();
    const pointerStrength = compact ? 0.16 : 0.32;

    cameraTarget.set(
      pointer.x * pointerStrength + scroll * 0.12,
      0.58 + pointer.y * 0.14 + scroll * 0.28,
      5.24 - scroll * 0.78
    );
    camera.position.lerp(cameraTarget, compact ? 0.055 : 0.04);
    camera.lookAt(lookTarget);

    if (rigRef.current) {
      rigRef.current.rotation.y +=
        (pointer.x * 0.12 + scroll * 0.32 - rigRef.current.rotation.y) * 0.045;
      rigRef.current.rotation.x +=
        (-pointer.y * 0.08 - scroll * 0.08 - rigRef.current.rotation.x) * 0.045;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = elapsed * 0.12 + scroll * 0.7;
      coreRef.current.rotation.y = elapsed * 0.18;
      coreRef.current.scale.setScalar(1 + Math.sin(elapsed * 0.75) * 0.018);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -elapsed * 0.08 - scroll * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[3.5, 4, 4.5]} intensity={1.15} />
      <pointLight position={[-2.6, 1.5, 2.4]} color="#72f2c9" intensity={2.2} />
      <pointLight position={[2.8, -0.8, 1.8]} color="#ff7aa2" intensity={1.5} />

      <group ref={rigRef} position={[0.18, -0.02, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
          <planeGeometry args={[7.8, 4.8, compact ? 8 : 13, compact ? 5 : 8]} />
          <meshBasicMaterial
            color="#72f2c9"
            wireframe
            transparent
            opacity={compact ? 0.1 : 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group>
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.76, 2]} />
            <meshStandardMaterial
              color="#f3f4ee"
              emissive="#72f2c9"
              emissiveIntensity={0.13}
              metalness={0.34}
              roughness={0.28}
            />
          </mesh>
          <mesh ref={ringRef} rotation={[Math.PI / 2.35, 0.1, 0]}>
            <torusGeometry args={[1.13, 0.01, 16, 96]} />
            <meshBasicMaterial
              color="#9ef01a"
              transparent
              opacity={compact ? 0.28 : 0.38}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.05, 0.2, 0.55]}>
            <torusGeometry args={[1.54, 0.008, 12, 96]} />
            <meshBasicMaterial color="#72f2c9" transparent opacity={0.24} />
          </mesh>
        </group>

        {connectionLines.map((points, index) => (
          <ConnectionLine
            key={projectNodes[index].color + index}
            points={points}
            color={projectNodes[index].color}
            compact={compact}
          />
        ))}

        {visibleNodes.map((node, index) => (
          <ProductNode
            key={node.color + node.position.join("-")}
            node={node}
            index={index}
            compact={compact}
          />
        ))}

        <SparkField compact={compact} />
      </group>
    </>
  );
}

export default HeroScene;
