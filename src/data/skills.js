const skillCatalogGroups = [
  {
    id: "frontend-ui",
    title: "Frontend UI",
    summary:
      "Building clear interfaces, product flows, and visual systems applied across the portfolio projects.",
    skills: [
      { id: "product-thinking", label: "Product thinking" },
      { id: "product-design", label: "Product design" },
      { id: "figma", label: "Figma" },
      { id: "ui-ux-design", label: "UI/UX design" },
      { id: "ux-design", label: "UX design" },
      { id: "tailwind-css", label: "Tailwind CSS" },
      { id: "bootstrap", label: "Bootstrap" },
    ],
  },
  {
    id: "backend-systems",
    title: "Backend / Systems",
    summary:
      "Working with application logic, data models, requirements, and maintainable system structure.",
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
      { id: "requirements-engineering", label: "Requirements engineering" },
      { id: "uml", label: "UML" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    summary:
      "Designing and planning mobile product loops for repeat use, editable data, and compact interaction.",
    skills: [
      { id: "kotlin", label: "Kotlin" },
      { id: "android", label: "Android" },
      { id: "mobile-ui", label: "Mobile UI" },
      { id: "product-logic", label: "Product logic" },
      { id: "data-persistence", label: "Data persistence" },
      { id: "fitness-tracking", label: "Fitness tracking" },
      { id: "profile-editing", label: "Profile editing" },
    ],
  },
  {
    id: "data-bi",
    title: "Data / BI",
    summary:
      "Turning operational data into readable dashboards, KPIs, and decision-oriented views.",
    skills: [
      { id: "power-bi", label: "Power BI" },
      { id: "dax", label: "DAX" },
      { id: "excel", label: "Excel" },
      { id: "data-analysis", label: "Data analysis" },
      { id: "data-visualization", label: "Data visualization" },
      { id: "kpi-design", label: "KPI design" },
      { id: "executive-dashboards", label: "Executive dashboards" },
      { id: "business-intelligence", label: "Business intelligence" },
      { id: "matplotlib-charts", label: "Matplotlib charts" },
    ],
  },
  {
    id: "interactive-3d",
    title: "3D / Interactive",
    summary:
      "Exploring motion, WebGL, and interactive presentation patterns through the portfolio experience itself.",
    skills: [
      { id: "three-js", label: "Three.js" },
      { id: "react-three-fiber", label: "React Three Fiber" },
      { id: "framer-motion", label: "Framer Motion" },
      { id: "gsap", label: "GSAP" },
      { id: "o3de", label: "O3DE" },
      { id: "cocos2d", label: "Cocos2d" },
      { id: "interactive-systems", label: "Interactive systems" },
    ],
  },
  {
    id: "ai-workflows",
    title: "AI Workflows",
    summary:
      "Exploring AI-assisted product flows with extraction, embeddings, semantic search, and explainable recommendations.",
    skills: [
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
    id: "tools-devops",
    title: "Tools / DevOps",
    summary:
      "Keeping project delivery organized with version control, documentation, and practical tooling.",
    skills: [
      { id: "git-github", label: "Git/GitHub" },
      { id: "git-workflow", label: "Git workflow" },
    ],
  },
];

const primarySkillIds = new Set([
  "product-thinking",
  "ui-ux-design",
  "tailwind-css",
  "django",
  "python",
  "database-modeling",
  "kotlin",
  "android",
  "power-bi",
  "dax",
  "data-visualization",
  "framer-motion",
  "interactive-systems",
  "llms",
  "embeddings",
  "semantic-search",
  "git-github",
]);

const portfolioEvidenceIds = new Set(["framer-motion", "interactive-systems"]);
const exploringSkillIds = ["three-js", "react-three-fiber", "gsap", "o3de", "cocos2d"];

export const skills = skillCatalogGroups.flatMap((group) =>
  group.skills.map((skill) => ({
    ...skill,
    group: group.id,
    primary: primarySkillIds.has(skill.id),
    portfolioEvidence: portfolioEvidenceIds.has(skill.id),
  }))
);

const catalogLookup = Object.fromEntries(skills.map((skill) => [skill.id, skill]));

export const skillGroups = skillCatalogGroups.map((group) => ({
  ...group,
  skills: group.skills.map((skill) => catalogLookup[skill.id]).filter((skill) => skill.primary),
}));

export const exploringSkills = exploringSkillIds.map((skillId) => catalogLookup[skillId]);

export const skillLookup = Object.fromEntries(
  skills.map((skill) => [skill.id, skill])
);
