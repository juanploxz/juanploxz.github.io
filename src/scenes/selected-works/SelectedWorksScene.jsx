import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import GalleryRoom from "./GalleryRoom";
import GalleryScreen from "./GalleryScreen";

const cameraKeyframes = [
  {
    progress: 0,
    position: [0, 1.42, 8.5],
    lookAt: [0, 0.2, 0],
    roomRotation: [0.08, -0.35, 0],
    fov: 42,
  },
  {
    progress: 0.25,
    position: [-0.9, 1.05, 5.4],
    lookAt: [0, 0.1, -1.6],
    roomRotation: [0.05, 0.15, 0],
    fov: 39,
  },
  {
    progress: 0.5,
    position: [1.15, 0.82, 2.6],
    lookAt: [0.15, 0, -3.7],
    roomRotation: [0.02, 0.75, 0],
    fov: 36,
  },
  {
    progress: 0.75,
    position: [0.45, 0.72, 0.2],
    lookAt: [0, 0, -5.8],
    roomRotation: [0, 1.18, 0],
    fov: 35,
  },
  {
    progress: 1,
    position: [0, 0.68, -1.4],
    lookAt: [0, 0, -7.2],
    roomRotation: [0, 1.32, 0],
    fov: 37,
  },
];

const panelLayout = [
  {
    position: [-3.26, 0.46, -3.2],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    position: [3.26, 0.44, -3.7],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    position: [-3.24, 0.12, -5.3],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    position: [3.24, 0.06, -5.8],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    position: [0, -0.78, -8.26],
    rotation: [0, 0, 0],
  },
];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeInOut(value) {
  const t = clamp(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateArray(from, to, amount) {
  return from.map((value, index) =>
    THREE.MathUtils.lerp(value, to[index], amount)
  );
}

function getGalleryCameraState(progress) {
  const clamped = clamp(progress);

  for (let index = 1; index < cameraKeyframes.length; index += 1) {
    const current = cameraKeyframes[index];
    const previous = cameraKeyframes[index - 1];

    if (clamped <= current.progress) {
      const localProgress = easeInOut(
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
        roomRotation: interpolateArray(
          previous.roomRotation,
          current.roomRotation,
          localProgress
        ),
        fov: THREE.MathUtils.lerp(previous.fov, current.fov, localProgress),
      };
    }
  }

  return cameraKeyframes[cameraKeyframes.length - 1];
}

function MiniPanelGraphic({ project, active = false }) {
  const opacity = active ? 0.52 : 0.2;

  return (
    <group>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.8, 0.48, 0.025]} />
        <meshBasicMaterial color="#080806" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.24, 0.045]}>
        <boxGeometry args={[0.8, 0.025, 0.025]} />
        <meshBasicMaterial
          color={project.accent}
          transparent
          opacity={opacity}
        />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh
          key={item}
          position={[-0.22 + item * 0.22, 0.06 - item * 0.11, 0.05]}
        >
          <boxGeometry args={[0.14 + item * 0.04, 0.035, 0.025]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={active ? 0.38 : 0.16}
          />
        </mesh>
      ))}
    </group>
  );
}

function WorkPreviewPanels({ activeProjectId, focus = 0 }) {
  return projects.map((project, index) => {
    const layout = panelLayout[index];
    const active = project.id === activeProjectId;

    return (
      <group
        key={project.id}
        position={layout.position}
        rotation={layout.rotation}
        scale={active ? 1.08 : 0.96}
      >
        <mesh position={[0, 0, -0.018]}>
          <boxGeometry args={[0.94, 0.62, 0.02]} />
        <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={active ? 0.075 + focus * 0.045 : 0.028}
          />
        </mesh>
        <MiniPanelGraphic project={project} active={active} />
      </group>
    );
  });
}

function SelectedWorksScene({ journey, activeProject = projects[0], compact = false }) {
  const roomRef = useRef(null);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const rotationTarget = useMemo(() => new THREE.Euler(), []);

  useFrame(({ camera, pointer }, delta) => {
    const progress = clamp(journey?.progress ?? 0);
    const state = getGalleryCameraState(progress);
    const pointerScale = compact ? 0.025 : 0.075;
    const damping = 1 - Math.exp(-(compact ? 4 : 5.2) * delta);

    cameraTarget.set(
      state.position[0] + pointer.x * pointerScale,
      state.position[1] + pointer.y * pointerScale * 0.42,
      state.position[2]
    );
    camera.position.lerp(cameraTarget, damping);

    lookTarget.set(
      state.lookAt[0] + pointer.x * pointerScale * 0.32,
      state.lookAt[1] + pointer.y * pointerScale * 0.12,
      state.lookAt[2]
    );
    camera.lookAt(lookTarget);

    camera.fov = THREE.MathUtils.lerp(camera.fov, state.fov, damping * 0.72);
    camera.updateProjectionMatrix();

    if (roomRef.current) {
      rotationTarget.set(
        state.roomRotation[0],
        state.roomRotation[1] + pointer.x * 0.018,
        state.roomRotation[2]
      );
      roomRef.current.rotation.x = THREE.MathUtils.lerp(
        roomRef.current.rotation.x,
        rotationTarget.x,
        damping
      );
      roomRef.current.rotation.y = THREE.MathUtils.lerp(
        roomRef.current.rotation.y,
        rotationTarget.y,
        damping
      );
      roomRef.current.rotation.z = THREE.MathUtils.lerp(
        roomRef.current.rotation.z,
        rotationTarget.z,
        damping
      );
    }
  });

  const phases = journey?.phases ?? {};
  const focus = clamp((phases.focus ?? 0) + (phases.landing ?? 0) * 0.7);
  const intensity =
    0.26 +
    (phases.approach ?? 0) * 0.16 +
    (phases.entry ?? 0) * 0.22 +
    focus * 0.16;

  return (
    <>
      <fog attach="fog" args={["#050505", 6.4, compact ? 14 : 17.5]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[2.6, 3.8, 5.4]} intensity={1.05} />
      <pointLight
        position={[-2.8, 1.2, -2.4]}
        color="#8ee8dc"
        intensity={0.42 + intensity * 0.72}
      />
      <pointLight
        position={[2.6, 0.9, -5.2]}
        color="#80c8d8"
        intensity={0.34 + focus * 0.52}
      />
      <pointLight
        position={[0, 0.6, -7.2]}
        color={activeProject.accent}
        intensity={0.38 + focus * 0.54}
      />

      <group ref={roomRef}>
        <GalleryRoom compact={compact} intensity={intensity} />
        <GalleryScreen project={activeProject} focus={focus} />
        <WorkPreviewPanels
          activeProjectId={activeProject.id}
          focus={focus}
        />
      </group>
    </>
  );
}

export default SelectedWorksScene;
