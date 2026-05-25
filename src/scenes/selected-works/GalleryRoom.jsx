import * as THREE from "three";

function LightStrip({ position, args, color = "#8ee8dc", opacity = 0.42 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

function FloorGrid({ compact = false, intensity = 0 }) {
  const lineOpacity = compact ? 0.062 : 0.074 + intensity * 0.038;
  const lines = [];

  for (let index = -4; index <= 4; index += 1) {
    lines.push(
      <mesh key={`x-${index}`} position={[index * 0.72, -1.16, -4.2]}>
        <boxGeometry args={[0.006, 0.006, 9.4]} />
        <meshBasicMaterial
          color="#8ee8dc"
          transparent
          opacity={lineOpacity}
        />
      </mesh>
    );
  }

  for (let index = 0; index <= 10; index += 1) {
    lines.push(
      <mesh key={`z-${index}`} position={[0, -1.155, 0.4 - index * 0.84]}>
        <boxGeometry args={[6.4, 0.006, 0.006]} />
        <meshBasicMaterial
          color="#80c8d8"
          transparent
          opacity={lineOpacity * 0.72}
        />
      </mesh>
    );
  }

  return <group>{lines}</group>;
}

function GalleryRoom({ compact = false, intensity = 0 }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, -4.1]}>
        <planeGeometry args={[7.2, 10.8]} />
        <meshStandardMaterial
          color="#070706"
          metalness={0.18}
          roughness={0.78}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0.42, -8.45]}>
        <planeGeometry args={[7.2, 3.4]} />
        <meshStandardMaterial
          color="#0a0a08"
          metalness={0.14}
          roughness={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-3.58, 0.26, -4.1]}>
        <planeGeometry args={[10.8, 3.4]} />
        <meshStandardMaterial
          color="#080806"
          metalness={0.16}
          roughness={0.76}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[3.58, 0.26, -4.1]}>
        <planeGeometry args={[10.8, 3.4]} />
        <meshStandardMaterial
          color="#080806"
          metalness={0.16}
          roughness={0.76}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      <FloorGrid compact={compact} intensity={intensity} />

      <LightStrip
        position={[-3.48, 0.22, -4.1]}
        args={[0.018, 2.8, 0.018]}
        opacity={0.1 + intensity * 0.14}
      />
      <LightStrip
        position={[3.48, 0.22, -4.1]}
        args={[0.018, 2.8, 0.018]}
        color="#80c8d8"
        opacity={0.09 + intensity * 0.12}
      />
      <LightStrip
        position={[0, 1.94, -8.34]}
        args={[5.6, 0.018, 0.018]}
        color="#d7ff64"
        opacity={0.075 + intensity * 0.1}
      />

      <mesh position={[-2.55, -0.82, -5.7]}>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshStandardMaterial
          color="#10100d"
          metalness={0.24}
          roughness={0.68}
        />
      </mesh>
      <mesh position={[2.48, -0.93, -3.25]}>
        <boxGeometry args={[0.62, 0.48, 0.62]} />
        <meshStandardMaterial
          color="#0e0f0c"
          metalness={0.22}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

export default GalleryRoom;
