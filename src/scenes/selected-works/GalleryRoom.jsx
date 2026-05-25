import * as THREE from "three";

function LightStrip({ position, args, color = "#f4f1e8", opacity = 0.32 }) {
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
  const lineOpacity = compact ? 0.086 : 0.105 + intensity * 0.042;
  const lines = [];

  for (let index = -4; index <= 4; index += 1) {
    lines.push(
      <mesh key={`x-${index}`} position={[index * 0.78, -1.16, -4.55]}>
        <boxGeometry args={[0.006, 0.006, 11.4]} />
        <meshBasicMaterial
          color="#f4f1e8"
          transparent
          opacity={lineOpacity}
        />
      </mesh>
    );
  }

  for (let index = 0; index <= 13; index += 1) {
    lines.push(
      <mesh key={`z-${index}`} position={[0, -1.155, 0.6 - index * 0.82]}>
        <boxGeometry args={[7.35, 0.006, 0.006]} />
        <meshBasicMaterial
          color="#4ecdc4"
          transparent
          opacity={lineOpacity * 0.5}
        />
      </mesh>
    );
  }

  return <group>{lines}</group>;
}

function ReliefBlock({
  position,
  rotation = [0, 0, 0],
  args,
  color = "#22221d",
  opacity = 0.34,
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        metalness={0.12}
        roughness={0.78}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function WallRelief({ intensity = 0 }) {
  const panelOpacity = 0.24 + intensity * 0.08;
  const edgeOpacity = 0.055 + intensity * 0.07;

  return (
    <group>
      {[-2.45, -4.55, -6.65].map((zPosition, index) => (
        <group key={`right-relief-${zPosition}`}>
          <ReliefBlock
            position={[4.02, 0.22, zPosition]}
            args={[0.045, 2.15 - index * 0.18, 1.18]}
            color="#223025"
            opacity={panelOpacity}
          />
          <LightStrip
            position={[3.975, 1.28, zPosition]}
            args={[0.018, 0.018, 1.02]}
            color={index === 1 ? "#4ecdc4" : "#f4f1e8"}
            opacity={edgeOpacity}
          />
        </group>
      ))}

      {[-2.95, -5.05, -7.05].map((zPosition, index) => (
        <group key={`left-relief-${zPosition}`}>
          <ReliefBlock
            position={[-4.02, 0.18, zPosition]}
            args={[0.045, 1.9 - index * 0.12, 1.08]}
            color="#1f1f1a"
            opacity={panelOpacity * 0.92}
          />
          <LightStrip
            position={[-3.975, -0.72, zPosition]}
            args={[0.018, 0.018, 0.92]}
            color="#f4f1e8"
            opacity={edgeOpacity * 0.85}
          />
        </group>
      ))}

      {[-2.35, 0, 2.35].map((xPosition, index) => (
        <group key={`back-relief-${xPosition}`}>
          <ReliefBlock
            position={[xPosition, 0.44, -8.78]}
            args={[1.42, 1.34, 0.055]}
            color="#23231e"
            opacity={panelOpacity * (index === 1 ? 1.16 : 0.94)}
          />
          <LightStrip
            position={[xPosition, 1.12, -8.72]}
            args={[1.18, 0.018, 0.018]}
            color={index === 1 ? "#caff3d" : "#f4f1e8"}
            opacity={edgeOpacity}
          />
        </group>
      ))}
    </group>
  );
}

function GalleryRoom({ compact = false, intensity = 0 }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, -4.75]}>
        <planeGeometry args={[8.3, 12.4]} />
        <meshStandardMaterial
          color="#1a211b"
          metalness={0.1}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0.42, -8.85]}>
        <planeGeometry args={[8.3, 3.75]} />
        <meshStandardMaterial
          color="#20291f"
          metalness={0.1}
          roughness={0.76}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.82, -8.7]}>
        <planeGeometry args={[6.9, 0.42]} />
        <meshStandardMaterial
          color="#273023"
          metalness={0.08}
          roughness={0.82}
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4.08, 0.26, -4.75]}>
        <planeGeometry args={[12.4, 3.75]} />
        <meshStandardMaterial
          color="#1b231d"
          metalness={0.1}
          roughness={0.78}
          transparent
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[4.08, 0.26, -4.75]}>
        <planeGeometry args={[12.4, 3.75]} />
        <meshStandardMaterial
          color="#1b231d"
          metalness={0.1}
          roughness={0.78}
          transparent
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </mesh>

      <FloorGrid compact={compact} intensity={intensity} />
      <WallRelief intensity={intensity} />

      {[-2.2, -4.25, -6.3].map((zPosition) => (
        <group key={zPosition}>
          <LightStrip
            position={[-3.92, 0.4, zPosition]}
            args={[0.022, 2.78, 0.022]}
            opacity={0.074 + intensity * 0.075}
          />
          <LightStrip
            position={[3.92, 0.4, zPosition]}
            args={[0.022, 2.78, 0.022]}
            opacity={0.074 + intensity * 0.075}
          />
          <LightStrip
            position={[0, 1.66, zPosition]}
            args={[6.7, 0.018, 0.018]}
            color="#f4f1e8"
            opacity={0.046 + intensity * 0.052}
          />
        </group>
      ))}

      <LightStrip
        position={[-3.92, 0.22, -4.75]}
        args={[0.018, 3.05, 0.018]}
        opacity={0.13 + intensity * 0.13}
      />
      <LightStrip
        position={[3.92, 0.22, -4.75]}
        args={[0.018, 3.05, 0.018]}
        color="#4ecdc4"
        opacity={0.11 + intensity * 0.11}
      />
      <LightStrip
        position={[0, 2.08, -8.72]}
        args={[6.4, 0.018, 0.018]}
        color="#caff3d"
        opacity={0.08 + intensity * 0.08}
      />
      <LightStrip
        position={[0, -0.58, -8.68]}
        args={[6.2, 0.012, 0.018]}
        color="#f4f1e8"
        opacity={0.075 + intensity * 0.065}
      />
      <LightStrip
        position={[-3.55, 0.42, -8.72]}
        args={[0.016, 2.65, 0.018]}
        color="#f4f1e8"
        opacity={0.06 + intensity * 0.07}
      />
      <LightStrip
        position={[3.55, 0.42, -8.72]}
        args={[0.016, 2.65, 0.018]}
        color="#f4f1e8"
        opacity={0.06 + intensity * 0.07}
      />

      <mesh position={[-2.55, -0.82, -5.7]}>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshStandardMaterial
          color="#20281f"
          metalness={0.18}
          roughness={0.74}
        />
      </mesh>
      <mesh position={[2.48, -0.93, -3.25]}>
        <boxGeometry args={[0.62, 0.48, 0.62]} />
        <meshStandardMaterial
          color="#1d251f"
          metalness={0.16}
          roughness={0.76}
        />
      </mesh>
    </group>
  );
}

export default GalleryRoom;
