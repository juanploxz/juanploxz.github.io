import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import HeroFallbackScene from "./HeroFallbackScene";
import HeroScene from "./HeroScene";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import { shouldUseCompactVisuals, supportsWebGL } from "../../lib/browserCapabilities";

function HeroCanvas({ progress = 0 }) {
  const reducedMotion = useReducedMotionSafe();
  const webGLAvailable = useMemo(() => supportsWebGL(), []);
  const compact = useMemo(() => shouldUseCompactVisuals(), []);

  if (reducedMotion || !webGLAvailable) {
    return <HeroFallbackScene />;
  }

  return (
    <div className="hero-canvas-shell">
      <Canvas
        className="hero-canvas"
        camera={{
          position: [0, 0.58, 5.24],
          fov: compact ? 43 : 38,
          near: 0.1,
          far: 40,
        }}
        dpr={compact ? [1, 1.15] : [1, 1.65]}
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
        <HeroScene progress={progress} compact={compact} />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
