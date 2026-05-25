function Bar({ x, y, width, height, color, opacity = 0.5 }) {
  return (
    <mesh position={[x, y, 0.045]}>
      <boxGeometry args={[width, height, 0.035]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function ParkingPreview({ color }) {
  return (
    <group>
      {Array.from({ length: 18 }, (_, index) => (
        <mesh
          key={index}
          position={[-0.82 + (index % 6) * 0.33, 0.18 - Math.floor(index / 6) * 0.22, 0.045]}
        >
          <boxGeometry args={[0.2, 0.09, 0.035]} />
          <meshBasicMaterial
            color={index % 5 === 0 || index % 7 === 0 ? "#20272a" : color}
            transparent
            opacity={index % 5 === 0 || index % 7 === 0 ? 0.5 : 0.56}
          />
        </mesh>
      ))}
      <Bar x={0.45} y={-0.52} width={0.92} height={0.055} color={color} />
      <Bar x={0.34} y={-0.66} width={0.7} height={0.055} color={color} opacity={0.44} />
    </group>
  );
}

function PhonePreview({ color }) {
  return (
    <group>
      <mesh position={[0, -0.04, 0.045]}>
        <boxGeometry args={[0.72, 1.26, 0.04]} />
        <meshBasicMaterial color="#080806" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.16, 0.07]}>
        <circleGeometry args={[0.24, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} />
      </mesh>
      {[-0.3, -0.5, -0.7].map((y, index) => (
        <Bar key={y} x={0} y={y} width={0.48 - index * 0.08} height={0.055} color={color} opacity={0.44} />
      ))}
    </group>
  );
}

function PipelinePreview({ color }) {
  return (
    <group>
      {Array.from({ length: 5 }, (_, index) => (
        <group key={index} position={[-0.94 + index * 0.47, 0, 0]}>
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.29, 0.29, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.46} />
      </mesh>
          {index < 4 ? (
            <Bar x={0.235} y={0} width={0.2} height={0.025} color={color} opacity={0.42} />
          ) : null}
        </group>
      ))}
      <Bar x={0} y={-0.48} width={1.42} height={0.05} color={color} opacity={0.42} />
    </group>
  );
}

function BrowserPreview({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[1.82, 1.02, 0.04]} />
        <meshBasicMaterial color="#080806" transparent opacity={0.88} />
      </mesh>
      <Bar x={0} y={0.44} width={1.82} height={0.07} color={color} opacity={0.46} />
      <Bar x={-0.45} y={0.16} width={0.62} height={0.08} color={color} opacity={0.34} />
      <Bar x={-0.47} y={-0.02} width={0.58} height={0.06} color={color} opacity={0.24} />
      {Array.from({ length: 4 }, (_, index) => (
        <Bar
          key={index}
          x={0.34 + index * 0.18}
          y={-0.28 + index * 0.065}
          width={0.09}
          height={0.2 + index * 0.08}
          color={color}
          opacity={0.5}
        />
      ))}
    </group>
  );
}

function DashboardPreview({ color }) {
  return (
    <group>
      {[-0.62, 0, 0.62].map((x, index) => (
        <mesh key={x} position={[x, 0.34, 0.045]}>
          <boxGeometry args={[0.46, 0.27, 0.04]} />
          <meshBasicMaterial color={color} transparent opacity={0.38 + index * 0.08} />
        </mesh>
      ))}
      <mesh position={[-0.38, -0.24, 0.045]}>
        <boxGeometry args={[0.76, 0.62, 0.04]} />
        <meshBasicMaterial color="#080806" transparent opacity={0.82} />
      </mesh>
      {[0, 1, 2, 3].map((index) => (
        <Bar
          key={index}
          x={0.33 + index * 0.16}
          y={-0.45 + index * 0.1}
          width={0.08}
          height={0.22 + index * 0.08}
          color={color}
          opacity={0.48}
        />
      ))}
    </group>
  );
}

function ProjectPreview({ project }) {
  const color = project.accent;

  if (project.id === "flowgate") {
    return <ParkingPreview color={color} />;
  }

  if (project.id === "workout-tracker") {
    return <PhonePreview color={color} />;
  }

  if (project.id === "thefinder") {
    return <PipelinePreview color={color} />;
  }

  if (project.id === "movie-reviews") {
    return <BrowserPreview color={color} />;
  }

  return <DashboardPreview color={color} />;
}

function GalleryScreen({ project, focus = 0 }) {
  const accent = project.accent;

  return (
    <group position={[0, 0.34, -7.98]}>
      <mesh>
        <boxGeometry args={[3.45, 2.05, 0.08]} />
        <meshStandardMaterial
          color="#090908"
          metalness={0.16}
          roughness={0.64}
        />
      </mesh>

      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[3.26, 1.86]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.026 + focus * 0.024}
        />
      </mesh>

      <Bar x={0} y={0.98} width={3.45} height={0.035} color={accent} opacity={0.28 + focus * 0.18} />
      <Bar x={-1.72} y={0} width={0.035} height={2.05} color={accent} opacity={0.12 + focus * 0.12} />
      <Bar x={1.72} y={0} width={0.035} height={2.05} color={accent} opacity={0.12 + focus * 0.12} />

      <group position={[0, -0.05, 0.08]} scale={1.1 + focus * 0.04}>
        <ProjectPreview project={project} />
      </group>

      <Bar x={-1.04} y={-0.88} width={0.92} height={0.045} color="#f4f1e8" opacity={0.14} />
      <Bar x={0.24} y={-0.88} width={1.08} height={0.045} color={accent} opacity={0.17 + focus * 0.14} />
    </group>
  );
}

export default GalleryScreen;
