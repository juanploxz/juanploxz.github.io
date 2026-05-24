export const skillGroups = [
  {
    id: "product",
    title: "Product & UX",
    summary: "Turning ambiguous problems into useful flows, decisions, and interfaces.",
    skills: [
      { id: "product-thinking", label: "Product thinking" },
      { id: "product-design", label: "Product design" },
      { id: "requirements-engineering", label: "Requirements engineering" },
      { id: "figma", label: "Figma" },
      { id: "ui-ux-design", label: "UI/UX design" },
      { id: "ux-design", label: "UX design" },
      { id: "mobile-ui", label: "Mobile UI" },
      { id: "fitness-tracking", label: "Fitness tracking" },
      { id: "profile-editing", label: "Profile editing" },
      { id: "kpi-design", label: "KPI design" },
      { id: "executive-dashboards", label: "Executive dashboards" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    summary: "Designing data models, application logic, and maintainable web flows.",
    skills: [
      { id: "django", label: "Django" },
      { id: "python", label: "Python" },
      { id: "sqlite", label: "SQLite" },
      { id: "backend-logic", label: "Backend logic" },
      { id: "backend-architecture", label: "Backend architecture" },
      { id: "database-modeling", label: "Database modeling" },
      { id: "database-models", label: "Database models" },
      { id: "crud", label: "CRUD" },
      { id: "templates", label: "Templates" },
      { id: "static-media-files", label: "Static/media files" },
      { id: "data-persistence", label: "Data persistence" },
    ],
  },
  {
    id: "mobile-ai",
    title: "Mobile, AI & Automation",
    summary: "Building product loops with Android, semantic matching, and workflow automation.",
    skills: [
      { id: "kotlin", label: "Kotlin" },
      { id: "android", label: "Android" },
      { id: "product-logic", label: "Product logic" },
      { id: "ai-integration", label: "AI integration" },
      { id: "llms", label: "LLMs" },
      { id: "embeddings", label: "Embeddings" },
      { id: "sentence-transformers", label: "Sentence Transformers" },
      { id: "semantic-search", label: "Semantic search" },
      { id: "cv-parsing", label: "CV parsing" },
      { id: "automation-workflows", label: "Automation workflows" },
      { id: "neo4j", label: "Neo4j" },
    ],
  },
  {
    id: "data-tools",
    title: "Data, BI & Delivery",
    summary: "Making data readable and keeping the delivery workflow organized.",
    skills: [
      { id: "power-bi", label: "Power BI" },
      { id: "dax", label: "DAX" },
      { id: "excel", label: "Excel" },
      { id: "data-analysis", label: "Data analysis" },
      { id: "data-visualization", label: "Data visualization" },
      { id: "business-intelligence", label: "Business intelligence" },
      { id: "matplotlib-charts", label: "Matplotlib charts" },
      { id: "uml", label: "UML" },
      { id: "git-github", label: "Git/GitHub" },
      { id: "git-workflow", label: "Git workflow" },
      { id: "bootstrap", label: "Bootstrap" },
      { id: "tailwind-css", label: "Tailwind CSS" },
    ],
  },
];

export const skills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, group: group.id }))
);

export const skillLookup = Object.fromEntries(
  skills.map((skill) => [skill.id, skill])
);
