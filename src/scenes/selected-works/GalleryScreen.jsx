function Bar({ x, y, width, height, color, opacity = 0.5 }) {
  return (
    <mesh position={[x, y, 0.045]}>
      <boxGeometry args={[width, height, 0.035]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

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

function ParkingPreview({ color, opacity = 1 }) {
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
            opacity={(index % 5 === 0 || index % 7 === 0 ? 0.56 : 0.64) * opacity}
          />
        </mesh>
      ))}
      <Bar x={0.45} y={-0.52} width={0.92} height={0.055} color={color} opacity={0.62 * opacity} />
      <Bar x={0.34} y={-0.66} width={0.7} height={0.055} color={color} opacity={0.5 * opacity} />
    </group>
  );
}

function PhonePreview({ color, opacity = 1 }) {
  return (
    <group>
      <mesh position={[0, -0.04, 0.045]}>
        <boxGeometry args={[0.72, 1.26, 0.04]} />
        <meshBasicMaterial color="#151b16" transparent opacity={0.94 * opacity} />
      </mesh>
      <mesh position={[0, 0.16, 0.07]}>
        <circleGeometry args={[0.24, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.5 * opacity} />
      </mesh>
      {[-0.3, -0.5, -0.7].map((y, index) => (
        <Bar key={y} x={0} y={y} width={0.48 - index * 0.08} height={0.055} color={color} opacity={0.5 * opacity} />
      ))}
    </group>
  );
}

function PipelinePreview({ color, opacity = 1 }) {
  return (
    <group>
      {Array.from({ length: 5 }, (_, index) => (
        <group key={index} position={[-0.94 + index * 0.47, 0, 0]}>
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.29, 0.29, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.54 * opacity} />
      </mesh>
          {index < 4 ? (
            <Bar x={0.235} y={0} width={0.2} height={0.025} color={color} opacity={0.5 * opacity} />
          ) : null}
        </group>
      ))}
      <Bar x={0} y={-0.48} width={1.42} height={0.05} color={color} opacity={0.5 * opacity} />
    </group>
  );
}

function BrowserPreview({ color, opacity = 1 }) {
  return (
    <group>
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[1.82, 1.02, 0.04]} />
        <meshBasicMaterial color="#151b16" transparent opacity={0.94 * opacity} />
      </mesh>
      <Bar x={0} y={0.44} width={1.82} height={0.07} color={color} opacity={0.54 * opacity} />
      <Bar x={-0.45} y={0.16} width={0.62} height={0.08} color={color} opacity={0.42 * opacity} />
      <Bar x={-0.47} y={-0.02} width={0.58} height={0.06} color={color} opacity={0.32 * opacity} />
      {Array.from({ length: 4 }, (_, index) => (
        <Bar
          key={index}
          x={0.34 + index * 0.18}
          y={-0.28 + index * 0.065}
          width={0.09}
          height={0.2 + index * 0.08}
          color={color}
          opacity={0.58 * opacity}
        />
      ))}
    </group>
  );
}

function DashboardPreview({ color, opacity = 1 }) {
  return (
    <group>
      {[-0.62, 0, 0.62].map((x, index) => (
        <mesh key={x} position={[x, 0.34, 0.045]}>
          <boxGeometry args={[0.46, 0.27, 0.04]} />
          <meshBasicMaterial color={color} transparent opacity={(0.44 + index * 0.08) * opacity} />
        </mesh>
      ))}
      <mesh position={[-0.38, -0.24, 0.045]}>
        <boxGeometry args={[0.76, 0.62, 0.04]} />
        <meshBasicMaterial color="#151b16" transparent opacity={0.9 * opacity} />
      </mesh>
      {[0, 1, 2, 3].map((index) => (
        <Bar
          key={index}
          x={0.33 + index * 0.16}
          y={-0.45 + index * 0.1}
          width={0.08}
          height={0.22 + index * 0.08}
          color={color}
          opacity={0.56 * opacity}
        />
      ))}
    </group>
  );
}

function ProjectPreview({ project, opacity = 1 }) {
  const color = getPreviewAccent(project);

  if (project.id === "flowgate") {
    return <ParkingPreview color={color} opacity={opacity} />;
  }

  if (project.id === "workout-tracker") {
    return <PhonePreview color={color} opacity={opacity} />;
  }

  if (project.id === "thefinder") {
    return <PipelinePreview color={color} opacity={opacity} />;
  }

  if (project.id === "movie-reviews") {
    return <BrowserPreview color={color} opacity={opacity} />;
  }

  return <DashboardPreview color={color} opacity={opacity} />;
}

function ConceptualDisplay({ opacity = 1 }) {
  return (
    <group>
      <Bar x={-0.72} y={0.36} width={0.92} height={0.04} color="#f4f1e8" opacity={0.18 * opacity} />
      <Bar x={0.62} y={0.36} width={0.7} height={0.04} color="#caff3d" opacity={0.18 * opacity} />
      {[-0.52, -0.26, 0, 0.26, 0.52].map((x, index) => (
        <mesh key={x} position={[x, -0.05 + Math.sin(index) * 0.06, 0.055]}>
          <boxGeometry args={[0.18, 0.18, 0.035]} />
          <meshBasicMaterial
            color={index === 2 ? "#caff3d" : "#f4f1e8"}
            transparent
            opacity={(index === 2 ? 0.22 : 0.11) * opacity}
          />
        </mesh>
      ))}
      <Bar x={0} y={-0.48} width={1.72} height={0.035} color="#4ecdc4" opacity={0.12 * opacity} />
      <Bar x={0} y={-0.62} width={1.16} height={0.035} color="#f4f1e8" opacity={0.12 * opacity} />
    </group>
  );
}

function GalleryScreen({ project, focus = 0, reveal = 1 }) {
  const accent = getPreviewAccent(project);
  const visibility = Math.min(1, Math.max(0, reveal));
  const structureOpacity = 0.52 + visibility * 0.48;
  const conceptOpacity = 1 - visibility;

  return (
    <group
      position={[0, 0.34 - (1 - visibility) * 0.035, -7.98]}
      scale={0.96 + visibility * 0.04}
    >
      <mesh>
        <boxGeometry args={[3.45, 2.05, 0.08]} />
        <meshStandardMaterial
          color="#182019"
          metalness={0.1}
          roughness={0.68}
          transparent
          opacity={0.58 * structureOpacity}
        />
      </mesh>

      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[3.26, 1.86]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={(0.012 + focus * 0.024) * visibility}
        />
      </mesh>

      <Bar x={0} y={0.98} width={3.45} height={0.035} color="#f4f1e8" opacity={0.14 * structureOpacity} />
      <Bar x={-1.72} y={0} width={0.035} height={2.05} color="#f4f1e8" opacity={0.1 * structureOpacity} />
      <Bar x={1.72} y={0} width={0.035} height={2.05} color="#f4f1e8" opacity={0.1 * structureOpacity} />

      <group position={[0, -0.05, 0.08]} visible={conceptOpacity > 0.02}>
        <ConceptualDisplay opacity={conceptOpacity} />
      </group>

      <group position={[0, -0.05, 0.08]} scale={1.1 + focus * 0.04} visible={visibility > 0.02}>
        <ProjectPreview project={project} opacity={visibility} />
      </group>

      <Bar x={-1.04} y={-0.88} width={0.92} height={0.045} color="#f4f1e8" opacity={0.12 * structureOpacity} />
      <Bar x={0.24} y={-0.88} width={1.08} height={0.045} color={accent} opacity={(0.16 + focus * 0.11) * visibility} />
    </group>
  );
}

export default GalleryScreen;
