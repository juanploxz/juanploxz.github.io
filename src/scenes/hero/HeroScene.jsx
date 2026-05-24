import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const layers = [
  {
    id: "threshold",
    z: 1.8,
    width: 3.2,
    height: 2.05,
    color: "#72f2c9",
    opacity: 0.34,
    start: 0.04,
    end: 0.22,
  },
  {
    id: "portal",
    z: -1.6,
    width: 4.15,
    height: 2.55,
    color: "#9ef01a",
    opacity: 0.42,
    start: 0.18,
    end: 0.42,
  },
  {
    id: "corridor",
    z: -4.6,
    width: 5.05,
    height: 3.05,
    color: "#ffcc66",
    opacity: 0.38,
    start: 0.36,
    end: 0.68,
  },
  {
    id: "gallery",
    z: -7.3,
    width: 4.55,
    height: 2.8,
    color: "#7bdff2",
    opacity: 0.34,
    start: 0.62,
    end: 0.88,
  },
  {
    id: "landing",
    z: -10.2,
    width: 3.65,
    height: 2.25,
    color: "#ff7aa2",
    opacity: 0.36,
    start: 0.78,
    end: 1,
  },
];

const projectPanels = [
  { id: "flowgate", z: -8.35, x: -2.45, y: 0.62, color: "#72f2c9" },
  { id: "workout", z: -8.8, x: 2.45, y: 0.45, color: "#ffcc66" },
  { id: "finder", z: -9.25, x: -2.05, y: -0.5, color: "#9ef01a" },
  { id: "reviews", z: -9.65, x: 2.05, y: -0.6, color: "#ff7aa2" },
  { id: "bi", z: -10.05, x: 0, y: 0.03, color: "#7bdff2" },
];

const cameraKeyframes = [
  {
    progress: 0,
    position: [0, 0.56, 8.4],
    lookAt: [0, 0.08, 0.6],
    fov: 41,
  },
  {
    progress: 0.2,
    position: [0, 0.54, 5.35],
    lookAt: [0, 0.06, -1.25],
    fov: 39,
  },
  {
    progress: 0.45,
    position: [0.03, 0.62, 1.25],
    lookAt: [0, 0, -3.35],
    fov: 37,
  },
  {
    progress: 0.75,
    position: [0.18, 0.72, -3.8],
    lookAt: [0.05, -0.02, -7.4],
    fov: 36,
  },
  {
    progress: 1,
    position: [0, 0.66, -6.35],
    lookAt: [0, 0, -9.8],
    fov: 38,
  },
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

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function phaseFromProgress(progress, start, end) {
  return smooth((progress - start) / (end - start));
}

function interpolateArray(from, to, amount) {
  return from.map((value, index) =>
    THREE.MathUtils.lerp(value, to[index], amount)
  );
}

function getJourneyCamera(progress) {
  const clamped = clamp(progress);

  for (let index = 1; index < cameraKeyframes.length; index += 1) {
    const current = cameraKeyframes[index];
    const previous = cameraKeyframes[index - 1];

    if (clamped <= current.progress) {
      const localProgress = smooth(
        (clamped - previous.progress) /
          (current.progress - previous.progress || 1)
      );

      return {
        position: interpolateArray(
          previous.position,
          current.position,
          localProgress
        ),
        lookAt: interpolateArray(previous.lookAt, current.lookAt, localProgress),
        fov: THREE.MathUtils.lerp(previous.fov, current.fov, localProgress),
      };
    }
  }

  return cameraKeyframes[cameraKeyframes.length - 1];
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

function RoomShell({ compact, intensity = 0 }) {
  const opacity = compact ? 0.035 : 0.038 + intensity * 0.045;

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, -4.7]}>
        <planeGeometry args={[7.4, 16, compact ? 8 : 12, compact ? 12 : 24]} />
        <meshBasicMaterial
          color="#72f2c9"
          wireframe
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-3.34, 0, -5.2]}>
        <planeGeometry args={[16, 4.1, compact ? 10 : 18, compact ? 4 : 8]} />
        <meshBasicMaterial
          color="#7bdff2"
          wireframe
          transparent
          opacity={opacity * 0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[3.34, 0, -5.2]}>
        <planeGeometry args={[16, 4.1, compact ? 10 : 18, compact ? 4 : 8]} />
        <meshBasicMaterial
          color="#9ef01a"
          wireframe
          transparent
          opacity={opacity * 0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
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

function ProductWall({ compact, intensity = 0 }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: compact ? 8 : 15 }, (_, index) => ({
        x: -1.55 + (index % 5) * 0.78,
        y: -0.58 + Math.floor(index / 5) * 0.5,
        z: -10.55,
        width: 0.2 + seededNoise(index, 1) * 0.24,
        height: 0.04 + seededNoise(index, 2) * 0.08,
      })),
    [compact]
  );

  return (
    <group position={[0, 0, 0]}>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <boxGeometry args={[node.width, node.height, 0.025]} />
          <meshBasicMaterial
            color="#7bdff2"
            transparent
            opacity={compact ? 0.12 : 0.12 + intensity * 0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

function DustField({ compact, intensity = 0 }) {
  const pointsRef = useRef(null);
  const count = compact ? 0 : 18;
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
    outside: 0,
    approach: 0,
    passage: 0,
    arrival: 0,
  },
};

function HeroScene({ journey = defaultJourney, compact = false }) {
  const worldRef = useRef(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0.6, 7.2), []);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ camera, pointer }) => {
    const progress = clamp(journey.progress ?? 0);
    const cameraState = getJourneyCamera(progress);
    const pointerScale = compact ? 0.06 : 0.18;

    cameraTarget.set(
      cameraState.position[0] + pointer.x * pointerScale,
      cameraState.position[1] + pointer.y * 0.05,
      cameraState.position[2]
    );
    camera.position.lerp(cameraTarget, compact ? 0.07 : 0.052);
    lookTarget.set(
      cameraState.lookAt[0] + pointer.x * 0.045,
      cameraState.lookAt[1],
      cameraState.lookAt[2]
    );
    camera.lookAt(lookTarget);
    camera.fov += (cameraState.fov - camera.fov) * 0.045;
    camera.updateProjectionMatrix();

    if (worldRef.current) {
      worldRef.current.rotation.y +=
        (pointer.x * 0.025 - worldRef.current.rotation.y) * 0.035;
      worldRef.current.rotation.x +=
        (-pointer.y * 0.016 - worldRef.current.rotation.x) * 0.035;
    }
  });

  const { phases = defaultJourney.phases } = journey;
  const progress = clamp(journey.progress ?? 0);
  const sceneIntensity =
    0.22 +
    (phases.approach ?? 0) * 0.24 +
    (phases.passage ?? 0) * 0.22 +
    (phases.arrival ?? 0) * 0.14;

  return (
    <>
      <fog attach="fog" args={["#050505", 6.8, compact ? 16 : 19]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[2.8, 3.8, 5.2]} intensity={0.9} />
      <pointLight position={[0, 0.2, 2.2]} color="#72f2c9" intensity={0.95 + sceneIntensity} />
      <pointLight position={[1.8, 0.6, -6]} color="#ffcc66" intensity={0.45 + (phases.passage ?? 0) * 0.72} />
      <pointLight position={[-1.4, -0.5, -9]} color="#7bdff2" intensity={0.45 + (phases.arrival ?? 0) * 0.72} />

      <group ref={worldRef}>
        <TunnelRails compact={compact} intensity={sceneIntensity} />
        {layers.map((layer) => (
          <PortalFrame
            key={layer.id}
            layer={layer}
            compact={compact}
            phase={phaseFromProgress(progress, layer.start, layer.end)}
          />
        ))}

        <RoomShell compact={compact} intensity={sceneIntensity} />

        {projectPanels.map((panel, index) => (
          <ProjectPanel
            key={panel.id}
            panel={panel}
            index={index}
            compact={compact}
            intensity={phases.arrival ?? 0}
          />
        ))}

        <ProductWall compact={compact} intensity={phases.arrival ?? 0} />
        <DustField compact={compact} intensity={sceneIntensity} />
      </group>
    </>
  );
}

export default HeroScene;
