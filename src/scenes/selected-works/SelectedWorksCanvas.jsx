import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei/core/AdaptiveDpr";
import { useMemo } from "react";
import { shouldUseCompactVisuals, supportsWebGL } from "../../lib/browserCapabilities";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import SelectedWorksFallback from "./SelectedWorksFallback";
import SelectedWorksScene from "./SelectedWorksScene";

function SelectedWorksCanvas({ journey, activeProject }) {
  const reducedMotion = useReducedMotionSafe();
  const webGLAvailable = useMemo(() => supportsWebGL(), []);
  const compact = useMemo(() => shouldUseCompactVisuals(), []);

  if (reducedMotion || !webGLAvailable) {
    return <SelectedWorksFallback activeProject={activeProject} />;
  }

  return (
    <div className="selected-works-canvas-shell">
      <Canvas
        className="selected-works-canvas"
        camera={{
          position: [0, 1.4, 8.5],
          fov: compact ? 44 : 42,
          near: 0.1,
          far: 32,
        }}
        dpr={compact ? [1, 1.15] : [1, 1.6]}
        gl={{
          alpha: true,
          antialias: !compact,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.55 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AdaptiveDpr pixelated />
        <SelectedWorksScene
          journey={journey}
          activeProject={activeProject}
          compact={compact}
        />
      </Canvas>
    </div>
  );
}

export default SelectedWorksCanvas;
