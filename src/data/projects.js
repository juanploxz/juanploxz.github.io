export const projects = [
  {
    id: "flowgate",
    title: "FlowGate",
    category: "Web App / Product Design / University System",
    year: "2025",
    status: "Product prototype",
    orbit: "Availability engine",
    summary:
      "A university parking management system that turns parking availability, entrance congestion, and estimated waiting time into a clearer arrival decision.",
    problem:
      "Students and staff often arrive without knowing if the lot is full, where congestion is forming, or how long the queue may take.",
    approach:
      "Modeled the parking operation as a product flow: availability states, vehicle records, entrance pressure, admin views, and driver-facing feedback.",
    outcome:
      "A clearer system narrative where backend rules, database structure, and UI states support the same operational goal.",
    role: "Product logic, backend modeling, UI flow, documentation",
    accent: "#72f2c9",
    skills: [
      "django",
      "sqlite",
      "python",
      "figma",
      "uml",
      "requirements-engineering",
      "product-thinking",
      "backend-logic",
      "database-modeling",
      "ui-ux-design",
      "git-github",
    ],
    highlights: [
      "Mapped driver and administrator journeys around real parking decisions.",
      "Designed database relationships for vehicles, users, entries, and availability.",
      "Connected requirements, UML, backend logic, and interface states into one product story.",
    ],
    decisions: [
      "Used SQLite to validate the data model quickly before introducing heavier infrastructure.",
      "Kept the UI focused on availability, congestion, and wait time instead of dashboard noise.",
      "Documented flows with UML so the system could be explained beyond the code.",
    ],
    stages: [
      {
        label: "Discover",
        title: "Frame the parking problem",
        text:
          "Translate campus arrival uncertainty into concrete states: available spots, entrance pressure, and estimated wait.",
      },
      {
        label: "Model",
        title: "Design the operational core",
        text:
          "Define users, vehicles, parking zones, and entry events so the backend can support the product experience.",
      },
      {
        label: "Ship",
        title: "Turn logic into decisions",
        text:
          "Present the system as a practical tool for drivers and administrators instead of a generic CRUD interface.",
      },
    ],
  },
  {
    id: "workout-tracker",
    title: "Workout Tracker App",
    category: "Mobile App / Fitness Product",
    year: "2025",
    status: "Mobile concept",
    orbit: "Routine intelligence",
    summary:
      "A mobile-first fitness app concept for tracking routines, weekly set goals, calories, editable profile data, and previous training days.",
    problem:
      "Fitness tracking can become fragmented when routines, goal progress, calories, and profile data live in different mental spaces.",
    approach:
      "Designed around fast mobile actions: update a routine, check weekly set progress, edit body/profile data, and revisit previous training days.",
    outcome:
      "A fitness product concept with practical CRUD behavior, persistence needs, and interface patterns shaped for repeat daily use.",
    role: "Mobile product thinking, UX structure, Android implementation plan",
    accent: "#ffcc66",
    skills: [
      "kotlin",
      "android",
      "mobile-ui",
      "crud",
      "data-persistence",
      "figma",
      "ux-design",
      "product-logic",
      "fitness-tracking",
      "profile-editing",
    ],
    highlights: [
      "Defined the core loop around routines, weekly volume, calories, and history.",
      "Structured editable profile data as part of the fitness logic, not a separate settings page.",
      "Balanced mobile UI speed with enough detail for tracking progress over time.",
    ],
    decisions: [
      "Prioritized mobile-first controls for high-frequency logging moments.",
      "Separated routine data from profile data so future persistence can scale cleanly.",
      "Designed progress states around weekly sets because they map to real training behavior.",
    ],
    stages: [
      {
        label: "Loop",
        title: "Identify the daily behavior",
        text:
          "Make routine logging, previous-day review, and weekly goals reachable in a few taps.",
      },
      {
        label: "Persist",
        title: "Shape the data model",
        text:
          "Plan CRUD flows for routines, calories, and profile updates with Android persistence in mind.",
      },
      {
        label: "Polish",
        title: "Design for repetition",
        text:
          "Keep the interface compact, readable, and fast enough for use between sets.",
      },
    ],
  },
  {
    id: "thefinder",
    title: "TheFinder",
    category: "AI Tool / Job Automation MVP",
    year: "2025",
    status: "MVP architecture",
    orbit: "Semantic matching",
    summary:
      "An MVP concept for automating job search with CV parsing, LLM extraction, semantic embeddings, compatibility scoring, and recommendations.",
    problem:
      "Job search is noisy: candidates repeat manual filtering while job descriptions hide skill signals behind inconsistent language.",
    approach:
      "Designed an AI-assisted pipeline that extracts candidate and job signals, embeds them semantically, and scores compatibility with explainable recommendations.",
    outcome:
      "A product architecture that joins LLM workflows, vector similarity, graph relationships, and backend decision logic.",
    role: "AI workflow design, backend architecture, product scoring model",
    accent: "#9ef01a",
    skills: [
      "ai-integration",
      "llms",
      "embeddings",
      "sentence-transformers",
      "neo4j",
      "semantic-search",
      "cv-parsing",
      "automation-workflows",
      "backend-architecture",
      "product-design",
    ],
    highlights: [
      "Connected CV parsing with LLM extraction to build structured candidate profiles.",
      "Used embeddings and semantic search for compatibility beyond exact keyword matching.",
      "Explored graph modeling with Neo4j to connect skills, roles, and recommendations.",
    ],
    decisions: [
      "Designed the MVP around recommendation quality before automating every application step.",
      "Used semantic embeddings to reduce brittle keyword-only matching.",
      "Kept scoring explainable so users can understand why a role is recommended.",
    ],
    stages: [
      {
        label: "Extract",
        title: "Structure the candidate signal",
        text:
          "Parse CV data, normalize skills, and use LLM extraction where free-form text needs interpretation.",
      },
      {
        label: "Match",
        title: "Score semantic compatibility",
        text:
          "Compare candidate profiles with job descriptions using embeddings, graph relationships, and scoring rules.",
      },
      {
        label: "Recommend",
        title: "Make the result actionable",
        text:
          "Surface ranked jobs with clear reasons, missing skills, and next actions.",
      },
    ],
  },
  {
    id: "movie-reviews",
    title: "Movie Reviews Platform",
    category: "Django Web App",
    year: "2025",
    status: "Integrated project",
    orbit: "Content system",
    summary:
      "A Django web application for movie reviews, views, database models, static/media handling, Bootstrap/Tailwind UI, and data visualization.",
    problem:
      "A review platform needs content structure, persistence, media handling, and readable views before it can feel like a complete web product.",
    approach:
      "Built the project around Django models, views, templates, static/media organization, CRUD flows, and charts for review data.",
    outcome:
      "A full-stack learning project that demonstrates Django fundamentals while treating presentation and data visualization as part of the product.",
    role: "Django implementation, templates, data modeling, visual reporting",
    accent: "#ff7aa2",
    skills: [
      "django",
      "python",
      "templates",
      "database-models",
      "crud",
      "bootstrap",
      "tailwind-css",
      "static-media-files",
      "git-workflow",
      "matplotlib-charts",
    ],
    highlights: [
      "Implemented Django views and templates for a real content flow.",
      "Organized static and media files for review content and presentation.",
      "Added Matplotlib charts to turn stored data into visual insight.",
    ],
    decisions: [
      "Used Django templates to stay close to the framework fundamentals.",
      "Combined Bootstrap/Tailwind patterns where they helped ship practical UI faster.",
      "Added charts because a review system becomes stronger when data can be interpreted.",
    ],
    stages: [
      {
        label: "Structure",
        title: "Build the review model",
        text:
          "Define the core entities, relationships, and routes for review content.",
      },
      {
        label: "Present",
        title: "Shape templates and media",
        text:
          "Organize views, static assets, and media handling so content feels coherent.",
      },
      {
        label: "Explain",
        title: "Visualize the data",
        text:
          "Use charts to make review and content data easier to understand.",
      },
    ],
  },
  {
    id: "powerbi-crisis",
    title: "Power BI Crisis Dashboard",
    category: "Business Intelligence / Data Dashboard",
    year: "2025",
    status: "Executive dashboard",
    orbit: "Decision room",
    summary:
      "An executive sales dashboard for a crisis committee focused on KPIs, transactions, average ticket, sales variation, top products, top clients, and category analysis.",
    problem:
      "Executive crisis decisions need fast visibility into what changed, where revenue is moving, and which products or clients are driving the situation.",
    approach:
      "Designed a dashboard around KPI hierarchy, DAX measures, category analysis, and visual prioritization for a decision-room context.",
    outcome:
      "A business intelligence experience focused on executive scanning, variation analysis, and rapid prioritization.",
    role: "Dashboard design, KPI modeling, data analysis, executive storytelling",
    accent: "#7bdff2",
    skills: [
      "power-bi",
      "dax",
      "excel",
      "data-analysis",
      "kpi-design",
      "data-visualization",
      "executive-dashboards",
      "business-intelligence",
    ],
    highlights: [
      "Designed KPIs around crisis committee decision needs.",
      "Used DAX and Excel-backed data analysis to structure sales signals.",
      "Prioritized top products, clients, categories, transactions, and average ticket.",
    ],
    decisions: [
      "Kept the top-level view executive-first with immediate KPI scanning.",
      "Used variation measures to show movement, not just static totals.",
      "Grouped supporting visuals by decision value instead of chart variety.",
    ],
    stages: [
      {
        label: "Measure",
        title: "Define the crisis KPIs",
        text:
          "Focus the dashboard on the metrics a committee needs to act quickly.",
      },
      {
        label: "Compare",
        title: "Expose sales variation",
        text:
          "Show changes in transactions, ticket size, product performance, and client contribution.",
      },
      {
        label: "Decide",
        title: "Prioritize what matters",
        text:
          "Arrange visual hierarchy around executive scanning and next-step decisions.",
      },
    ],
  },
];

export const featuredProjectIds = projects.map((project) => project.id);
