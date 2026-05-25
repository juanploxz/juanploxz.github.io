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
    roomRotation: [0, 1.08, 0],
    fov: 35,
  },
  {
    progress: 0.9,
    position: [0.18, 0.72, -0.45],
    lookAt: [0, 0.02, -6.55],
    roomRotation: [0, 1.02, 0],
    fov: 36,
  },
  {
    progress: 1,
    position: [0.04, 0.7, -0.72],
    lookAt: [0, 0.02, -6.9],
    roomRotation: [0, 1.04, 0],
    fov: 36,
  },
];

const panelLayout = [
  {
    position: [-2.55, 0.52, -4.15],
    rotation: [0, 0.48, 0],
  },
  {
    position: [2.52, 0.46, -4.55],
    rotation: [0, -0.48, 0],
  },
  {
    position: [-2.08, 0.06, -6.1],
    rotation: [0, 0.32, 0],
  },
  {
    position: [2.05, 0.02, -6.35],
    rotation: [0, -0.32, 0],
  },
  {
    position: [0, -0.62, -7.28],
    rotation: [0, 0, 0],
  },
];

const previewAccentByProject = {
  flowgate: "#4ecdc4",
  "workout-tracker": "#d8b86a",
  thefinder: "#caff3d",
  "movie-reviews": "#d98aa8",
  "powerbi-crisis": "#87bdcc",
};

function getPreviewAccent(project) {
  return previewAccentByProject[project.id] ?? project.accent;
}

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

function MiniPanelGraphic({ project, active = false, reveal = 1 }) {
  const accent = getPreviewAccent(project);
  const visibility = clamp(reveal);
  const opacity = active ? 0.5 : 0.22;

  return (
    <group>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.8, 0.48, 0.025]} />
        <meshBasicMaterial color="#182019" transparent opacity={0.94 * visibility} />
      </mesh>
      <mesh position={[0, 0.24, 0.045]}>
        <boxGeometry args={[0.8, 0.025, 0.025]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={opacity * visibility}
        />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh
          key={item}
          position={[-0.22 + item * 0.22, 0.06 - item * 0.11, 0.05]}
        >
          <boxGeometry args={[0.14 + item * 0.04, 0.035, 0.025]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={(active ? 0.36 : 0.16) * visibility}
          />
        </mesh>
      ))}
    </group>
  );
}

function WorkPreviewPanels({ activeProjectId, focus = 0, reveal = 1 }) {
  const visibility = clamp(reveal);

  if (visibility <= 0.01) {
    return null;
  }

  return projects.map((project, index) => {
    const layout = panelLayout[index];
    const active = project.id === activeProjectId;
    const accent = getPreviewAccent(project);
    const position = [
      layout.position[0],
      layout.position[1] + (active ? 0.08 : 0),
      layout.position[2] + (active ? 0.16 : 0),
    ];

    return (
      <group
        key={project.id}
        position={position}
        rotation={layout.rotation}
        scale={active ? 1.14 : 0.9}
      >
        <mesh position={[0, 0, -0.018]}>
          <boxGeometry args={[0.94, 0.62, 0.02]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={(active ? 0.068 + focus * 0.038 : 0.03) * visibility}
          />
        </mesh>
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[1.08, 0.76, 0.012]} />
          <meshBasicMaterial
            color="#f4f1e8"
            transparent
            opacity={(active ? 0.064 + focus * 0.022 : 0.024) * visibility}
          />
        </mesh>
        <MiniPanelGraphic project={project} active={active} reveal={visibility} />
      </group>
    );
  });
}

function StructuralVitrines({ reveal = 0 }) {
  const visibility = 0.34 + (1 - clamp(reveal)) * 0.42;

  return panelLayout.map((layout, index) => (
    <group
      key={`structure-${index}`}
      position={layout.position}
      rotation={layout.rotation}
      scale={index === 4 ? 0.94 : 0.88}
    >
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[1.04, 0.74, 0.012]} />
        <meshBasicMaterial
          color="#f4f1e8"
          transparent
          opacity={0.035 * visibility}
        />
      </mesh>
      <mesh position={[0, 0.31, 0.012]}>
        <boxGeometry args={[0.9, 0.018, 0.018]} />
        <meshBasicMaterial
            color={index % 2 === 0 ? "#caff3d" : "#4ecdc4"}
          transparent
          opacity={0.08 * visibility}
          toneMapped={false}
        />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh
          key={item}
          position={[-0.24 + item * 0.24, 0.02 - item * 0.1, 0.018]}
        >
          <boxGeometry args={[0.16 + item * 0.05, 0.026, 0.016]} />
          <meshBasicMaterial
            color="#f4f1e8"
            transparent
            opacity={0.07 * visibility}
          />
        </mesh>
      ))}
    </group>
  ));
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
  const progress = clamp(journey?.progress ?? 0);
  const projectReveal = easeInOut((progress - 0.82) / 0.12);
  const focus = clamp((phases.focus ?? 0) + (phases.landing ?? 0) * 0.7);
  const activeAccent = getPreviewAccent(activeProject);
  const intensity =
    0.26 +
    (phases.approach ?? 0) * 0.16 +
    (phases.entry ?? 0) * 0.22 +
    focus * 0.16;

  return (
    <>
      <fog attach="fog" args={["#101510", 10.5, compact ? 18 : 24]} />
      <ambientLight intensity={1.08} />
      <directionalLight position={[2.6, 3.8, 5.4]} intensity={1.22} />
      <pointLight
        position={[-2.8, 1.2, -2.4]}
        color="#f4f1e8"
        intensity={0.58 + intensity * 0.72}
      />
      <pointLight
        position={[2.6, 0.9, -5.2]}
        color="#4ecdc4"
        intensity={0.36 + focus * 0.38}
      />
      <pointLight
        position={[0, 0.62, -7.35]}
        color={activeAccent}
        intensity={(0.34 + focus * 0.48) * projectReveal}
      />
      <pointLight
        position={[0, 1.2, -8.45]}
        color="#f4f1e8"
        intensity={0.46 + (phases.landing ?? 0) * 0.42}
      />

      <group ref={roomRef}>
        <GalleryRoom compact={compact} intensity={intensity} />
        <mesh position={[0, -1.145, -6.75]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.45, 1.48, 96]} />
          <meshBasicMaterial
            color={activeAccent}
            transparent
            opacity={(0.06 + focus * 0.052) * projectReveal}
            toneMapped={false}
          />
        </mesh>
        <GalleryScreen
          project={activeProject}
          focus={focus}
          reveal={projectReveal}
        />
        <StructuralVitrines reveal={projectReveal} />
        <WorkPreviewPanels
          activeProjectId={activeProject.id}
          focus={focus}
          reveal={projectReveal}
        />
      </group>
    </>
  );
}

export default SelectedWorksScene;
