import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./i18n-context";

const STORAGE_KEY = "portfolio-language";

const translations = {
  en: {
    common: {
      skipToContent: "Skip to content",
      github: "GitHub",
      email: "Email",
      contact: "Contact",
      project: "project",
      projects: "projects",
    },
    nav: {
      projects: "Projects",
      skills: "Skills",
      timeline: "Timeline",
      about: "About",
      contact: "Contact",
    },
    header: {
      backToTop: "Back to top",
      primaryNavigation: "Primary navigation",
      socialLinks: "Social links",
      mobileContact: "Contact",
    },
    hero: {
      kicker: "Juan Parra / Product-minded software developer",
      role: "Software Developer & Systems Engineering Student",
      statement: "I build polished software experiences from product logic to interface.",
      lede: "I connect backend behavior, mobile UX, AI workflows, data dashboards, and frontend craft into clear, useful systems.",
      galleryCta: "Enter the gallery",
      scrollCue: "Scroll to selected work",
      focusLabel: "Selected focus",
      focus: "Backend logic / Product UI / Mobile UX / AI workflows / BI systems",
    },
    selectedWork: {
      kicker: "Capabilities in motion",
      title: "Selected Work",
      intro: "A transition-led view of the capabilities behind the project work.",
      galleryLabel: "Selected capability gallery",
      capability: "Capability",
      appliedIn: "Applied in {project}",
      capabilityList: "{capability} capabilities",
      fallback: {
        kicker: "Selected projects",
        title: "Project transition gallery",
        text: "Product systems presented through focused visual narratives.",
        signals: ["Web", "Mobile", "AI", "Data"],
      },
      capabilities: {
        flowgate: {
          label: "Systems",
          title: "Logic behind the surface",
          statement:
            "I translate requirements into data models, backend states, and operational flows that stay explainable.",
          skills: ["Django", "Python", "Database modeling", "Requirements", "UML"],
        },
        "workout-tracker": {
          label: "Mobile",
          title: "Product loops for repeat use",
          statement:
            "I design compact mobile experiences around fast actions, editable data, persistence, and clear feedback.",
          skills: ["Kotlin", "Android", "Mobile UI", "CRUD", "Persistence"],
        },
        thefinder: {
          label: "AI workflows",
          title: "AI with reasons, not magic",
          statement:
            "I connect extraction, embeddings, semantic search, and scoring into workflows users can understand.",
          skills: ["LLMs", "Embeddings", "Semantic search", "Neo4j", "Automation"],
        },
        "movie-reviews": {
          label: "Interfaces",
          title: "Frontend built as a system",
          statement:
            "I shape responsive interfaces where hierarchy, content flow, interaction, and implementation support the same product.",
          skills: ["UI/UX", "Figma", "Tailwind CSS", "Templates", "Motion"],
        },
        "powerbi-crisis": {
          label: "Data / BI",
          title: "Data shaped for decisions",
          statement:
            "I turn operational data into KPI hierarchies, readable dashboards, and focused decision views.",
          skills: ["Power BI", "DAX", "Excel", "Data analysis", "KPI design"],
        },
      },
    },
    projectVisuals: {
      flowgate: {
        label: "Parking intelligence",
        metric: "18 min wait",
        kpis: ["Available 42%", "Gate A high"],
      },
      "workout-tracker": {
        label: "Routine loop",
        metric: "24 sets",
        session: "Push day",
        calories: "740 kcal",
      },
      thefinder: {
        label: "AI matching pipeline",
        metric: "0.92 fit",
        pipeline: ["CV", "Parse", "Vector", "Score", "Recommend"],
        match: "Match",
        fit: "Skills + role fit",
      },
      "movie-reviews": {
        label: "Review system",
        metric: "Charts + CRUD",
      },
      "powerbi-crisis": {
        label: "Executive dashboard",
        metric: "+12.4%",
        kpis: ["Sales", "Ticket", "Tx"],
      },
    },
    projectSection: {
      kicker: "Recent systems",
      title: "Selected work, presented as product systems.",
      intro:
        "A curated index of projects where backend logic, interface decisions, and product thinking are treated as one system.",
      metadata: "Selected project metadata",
      fullIndex: "Full work index",
      filteredBy: "Filtered by {skill}",
      selectedStack: "Selected project stack",
      selector: "Project case study selector",
      index: "Case study index",
      indexHelp: "Choose a system to inspect its problem, architecture, decisions, and skills.",
      openCaseStudy: "Open case study",
      openProject: "Open {project} case study",
      selectedCaseStudy: "Selected case study",
      viewSkillMap: "View skill map",
      skillsUsed: "Skills used",
      exploreCaseStudy: "Explore the full case study",
      talkAbout: "Talk about this kind of project",
      caseStudy: {
        metadata: "Project metadata",
        problem: "Problem",
        problemTitle: "What needed to be clarified",
        solution: "Solution",
        solutionTitle: "How the system responds",
        outcome: "Outcome",
        outcomeTitle: "What the work proves",
        stack: "Stack",
        decisions: "Technical decisions",
        architecture: "Architecture",
        challenges: "Challenges",
        links: "Links",
        repository: "Repository",
        demo: "Live demo",
        available: "Case study available",
        unavailable: "Evidence unavailable",
      },
    },
    skillLabels: {
      "product-thinking": "Product thinking",
      "ui-ux-design": "UI/UX design",
      "database-modeling": "Database modeling",
      "mobile-ui": "Mobile UI",
      "data-persistence": "Data persistence",
      "ai-integration": "AI integration",
      templates: "Templates",
      "database-models": "Database models",
      "data-analysis": "Data analysis",
      "kpi-design": "KPI design",
      "data-visualization": "Data visualization",
      "interactive-systems": "Interactive systems",
      "semantic-search": "Semantic search",
    },
    skills: {
      allSkillsLabel: "all skills",
      kicker: "Capability map",
      title: "Capabilities behind the work.",
      intro:
        "Explore how product UI, backend logic, mobile, data, AI, and interactive tools connect across the selected projects.",
      allSkills: "All skills",
      projectGlow: "{project} is defining the current skill glow.",
      oneMatch: "1 project match selected.",
      manyMatches: "{count} project matches selected.",
      projectSignal: "Project signal",
      skillCount: "{count} skills",
      chipLabel: "{skill}, used in {count} {projectWord}",
      portfolioChipLabel: "{skill}, applied in this portfolio",
      portfolioEvidence: "Portfolio",
      exploringTitle: "Currently exploring",
      exploringText:
        "Tools under focused evaluation, kept separate from my production-ready stack.",
    },
    skillGroups: {
      "frontend-ui": {
        title: "Frontend UI",
        summary:
          "Building clear interfaces, product flows, and visual systems applied across the portfolio projects.",
      },
      "backend-systems": {
        title: "Backend / Systems",
        summary:
          "Working with application logic, data models, requirements, and maintainable system structure.",
      },
      mobile: {
        title: "Mobile",
        summary:
          "Designing and planning mobile product loops for repeat use, editable data, and compact interaction.",
      },
      "data-bi": {
        title: "Data / BI",
        summary:
          "Turning operational data into readable dashboards, KPIs, and decision-oriented views.",
      },
      "interactive-3d": {
        title: "Interactive / 3D",
        summary:
          "Applying motion and interactive presentation patterns in this portfolio while exploring deeper 3D work.",
      },
      "ai-workflows": {
        title: "AI Workflows",
        summary:
          "Exploring AI-assisted product flows with extraction, embeddings, semantic search, and explainable recommendations.",
      },
      "tools-devops": {
        title: "Tools",
        summary:
          "Keeping project delivery organized with version control, documentation, and practical tooling.",
      },
    },
    timeline: {
      kicker: "Technical timeline",
      title: "A growth path from engineering foundations to product-shaped systems.",
      intro:
        "The timeline connects university learning, practical builds, data, AI workflows, and interactive experimentation without pretending to be a job history.",
      items: [
        {
          signal: "Foundation",
          title: "Systems engineering foundation",
          text: "Built fundamentals in programming, problem solving, databases, Java, Kotlin, and the engineering habits needed to explain technical work clearly.",
        },
        {
          signal: "Build",
          title: "Web, backend, and mobile practice",
          text: "Moved from isolated exercises into Django flows, Android interfaces, CRUD behavior, persistence, and project-based implementation.",
        },
        {
          signal: "Product",
          title: "Projects shaped as product systems",
          text: "Started connecting requirements, UML, data models, backend behavior, and UI states so university projects could be read as coherent systems.",
        },
        {
          signal: "Expand",
          title: "Data dashboards and AI workflows",
          text: "Explored Power BI dashboards, KPI design, LLM workflows, semantic search, embeddings, and recommendation logic as practical product tools.",
        },
        {
          signal: "Explore",
          title: "Interactive systems and 3D experimentation",
          text: "Started treating motion, WebGL, React Three Fiber, and O3DE experimentation as ways to explain systems without replacing useful 2D interfaces.",
        },
        {
          signal: "Present",
          title: "Portfolio as a product surface",
          text: "Turning the portfolio into a case-study experience that shows project reasoning, capability mapping, and interactive presentation together.",
        },
      ],
    },
    about: {
      kicker: "About",
      title: "I build by connecting product thinking, architecture, and user experience.",
      intro:
        "I am a software developer and systems engineering student focused on useful systems, polished interfaces, mobile experiences, data tools, AI workflows, and interactive experiments.",
      principles: [
        {
          title: "Useful before flashy",
          text: "I try to understand the decision a user needs to make before choosing the interface, stack, or visual treatment.",
        },
        {
          title: "Systems over fragments",
          text: "I like connecting requirements, data models, backend behavior, and UI states so a project feels coherent.",
        },
        {
          title: "Learning in public",
          text: "I am actively building, documenting tradeoffs, and turning university projects into clearer software stories.",
        },
        {
          title: "Polished interaction",
          text: "I am interested in interfaces, mobile UX, dashboards, AI workflows, and interactive 3D when they help explain the system.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let’s build something useful.",
      intro:
        "Open to internships, junior developer roles, and collaborations where product logic, software systems, and polished interfaces matter.",
      note: "Available for practical software work, portfolio feedback, and project conversations.",
    },
    command: {
      trigger: "Open command palette",
      label: "Command",
      title: "Command palette",
      filter: "Filter commands",
      placeholder: "Jump to...",
      available: "Available commands",
      noResults: "No command found.",
      top: "Top",
      selectedWork: "Selected Work",
    },
    footer: {
      copyright: "© {year} {name}.",
    },
  },
  es: {
    common: {
      skipToContent: "Saltar al contenido",
      github: "GitHub",
      email: "Correo",
      contact: "Contacto",
      project: "proyecto",
      projects: "proyectos",
    },
    nav: {
      projects: "Proyectos",
      skills: "Habilidades",
      timeline: "Trayectoria",
      about: "Acerca de",
      contact: "Contacto",
    },
    header: {
      backToTop: "Volver al inicio",
      primaryNavigation: "Navegación principal",
      socialLinks: "Enlaces sociales",
      mobileContact: "Contacto",
    },
    hero: {
      kicker: "Juan Parra / Desarrollador de software con enfoque de producto",
      role: "Desarrollador de software y estudiante de Ingeniería de Sistemas",
      statement:
        "Creo experiencias de software pulidas, desde la lógica de producto hasta la interfaz.",
      lede: "Conecto comportamiento backend, UX móvil, flujos de IA, dashboards de datos y frontend en sistemas claros y útiles.",
      galleryCta: "Explorar capacidades",
      scrollCue: "Ir al trabajo seleccionado",
      focusLabel: "Enfoque principal",
      focus: "Lógica backend / UI de producto / UX móvil / flujos de IA / sistemas BI",
    },
    selectedWork: {
      kicker: "Capacidades en movimiento",
      title: "Trabajo seleccionado",
      intro: "Una secuencia de transiciones sobre las capacidades que sostienen los proyectos.",
      galleryLabel: "Galería de capacidades seleccionadas",
      capability: "Capacidad",
      appliedIn: "Aplicada en {project}",
      capabilityList: "Capacidades de {capability}",
      fallback: {
        kicker: "Proyectos seleccionados",
        title: "Galería de transiciones de proyectos",
        text: "Sistemas de producto presentados mediante narrativas visuales enfocadas.",
        signals: ["Web", "Móvil", "IA", "Datos"],
      },
      capabilities: {
        flowgate: {
          label: "Sistemas",
          title: "La lógica detrás de la interfaz",
          statement:
            "Traduzco requisitos en modelos de datos, estados backend y flujos operativos que se puedan explicar.",
          skills: ["Django", "Python", "Modelado de datos", "Requisitos", "UML"],
        },
        "workout-tracker": {
          label: "Móvil",
          title: "Flujos para uso recurrente",
          statement:
            "Diseño experiencias móviles compactas alrededor de acciones rápidas, datos editables, persistencia y feedback claro.",
          skills: ["Kotlin", "Android", "UI móvil", "CRUD", "Persistencia"],
        },
        thefinder: {
          label: "Flujos de IA",
          title: "IA con razones, no con magia",
          statement:
            "Conecto extracción, embeddings, búsqueda semántica y scoring en flujos que el usuario pueda comprender.",
          skills: ["LLMs", "Embeddings", "Búsqueda semántica", "Neo4j", "Automatización"],
        },
        "movie-reviews": {
          label: "Interfaces",
          title: "Frontend como sistema",
          statement:
            "Diseño interfaces responsivas donde jerarquía, contenido, interacción e implementación sostienen el mismo producto.",
          skills: ["UI/UX", "Figma", "Tailwind CSS", "Templates", "Motion"],
        },
        "powerbi-crisis": {
          label: "Datos / BI",
          title: "Datos convertidos en decisiones",
          statement:
            "Convierto datos operativos en jerarquías de KPI, dashboards legibles y vistas enfocadas en decidir.",
          skills: ["Power BI", "DAX", "Excel", "Análisis de datos", "Diseño de KPI"],
        },
      },
    },
    projectVisuals: {
      flowgate: {
        label: "Inteligencia de estacionamiento",
        metric: "18 min de espera",
        kpis: ["Disponibilidad 42%", "Acceso A alto"],
      },
      "workout-tracker": {
        label: "Ciclo de rutina",
        metric: "24 series",
        session: "Día de empuje",
        calories: "740 kcal",
      },
      thefinder: {
        label: "Pipeline de matching con IA",
        metric: "0,92 ajuste",
        pipeline: ["CV", "Analizar", "Vector", "Puntuar", "Recomendar"],
        match: "Coincidencia",
        fit: "Ajuste de habilidades y rol",
      },
      "movie-reviews": {
        label: "Sistema de reseñas",
        metric: "Gráficas + CRUD",
      },
      "powerbi-crisis": {
        label: "Dashboard ejecutivo",
        metric: "+12,4%",
        kpis: ["Ventas", "Ticket", "Tx"],
      },
    },
    projectSection: {
      kicker: "Sistemas recientes",
      title: "Trabajo seleccionado, presentado como sistemas de producto.",
      intro:
        "Una selección de proyectos donde lógica backend, decisiones de interfaz y pensamiento de producto funcionan como un solo sistema.",
      metadata: "Metadatos del proyecto seleccionado",
      fullIndex: "Índice completo",
      filteredBy: "Filtrado por {skill}",
      selectedStack: "Stack del proyecto seleccionado",
      selector: "Selector de casos de estudio",
      index: "Índice de casos de estudio",
      indexHelp:
        "Elige un sistema para revisar su problema, arquitectura, decisiones y habilidades.",
      openCaseStudy: "Abrir caso de estudio",
      openProject: "Abrir el caso de estudio de {project}",
      selectedCaseStudy: "Caso de estudio seleccionado",
      viewSkillMap: "Ver mapa de habilidades",
      skillsUsed: "Habilidades utilizadas",
      exploreCaseStudy: "Explorar el caso de estudio completo",
      talkAbout: "Hablemos de este tipo de proyecto",
      caseStudy: {
        metadata: "Metadatos del proyecto",
        problem: "Problema",
        problemTitle: "Qué necesitaba aclararse",
        solution: "Solución",
        solutionTitle: "Cómo responde el sistema",
        outcome: "Resultado",
        outcomeTitle: "Qué demuestra el trabajo",
        stack: "Stack",
        decisions: "Decisiones técnicas",
        architecture: "Arquitectura",
        challenges: "Retos",
        links: "Enlaces",
        repository: "Repositorio",
        demo: "Demostración en vivo",
        available: "Caso de estudio disponible",
        unavailable: "Evidencia no disponible",
      },
    },
    skillLabels: {
      "product-thinking": "Pensamiento de producto",
      "ui-ux-design": "Diseño UI/UX",
      "database-modeling": "Modelado de datos",
      "mobile-ui": "UI móvil",
      "data-persistence": "Persistencia de datos",
      "ai-integration": "Integración de IA",
      templates: "Plantillas",
      "database-models": "Modelos de datos",
      "data-analysis": "Análisis de datos",
      "kpi-design": "Diseño de KPI",
      "data-visualization": "Visualización de datos",
      "interactive-systems": "Sistemas interactivos",
      "semantic-search": "Búsqueda semántica",
    },
    skills: {
      allSkillsLabel: "todas las habilidades",
      kicker: "Mapa de capacidades",
      title: "Capacidades detrás del trabajo.",
      intro:
        "Explora cómo UI de producto, lógica backend, móvil, datos, IA y herramientas interactivas se conectan en los proyectos.",
      allSkills: "Todas las habilidades",
      projectGlow: "{project} define las relaciones de habilidades actuales.",
      oneMatch: "1 proyecto coincide con la selección.",
      manyMatches: "{count} proyectos coinciden con la selección.",
      projectSignal: "Relación con proyectos",
      skillCount: "{count} habilidades",
      chipLabel: "{skill}, utilizada en {count} {projectWord}",
      portfolioChipLabel: "{skill}, aplicada en este portafolio",
      portfolioEvidence: "Portafolio",
      exploringTitle: "Explorando actualmente",
      exploringText:
        "Herramientas en evaluación mediante experimentos, separadas de mi stack listo para producción.",
    },
    skillGroups: {
      "frontend-ui": {
        title: "Frontend UI",
        summary:
          "Construcción de interfaces claras, flujos de producto y sistemas visuales aplicados en el portafolio.",
      },
      "backend-systems": {
        title: "Backend / Sistemas",
        summary:
          "Trabajo con lógica de aplicación, modelos de datos, requisitos y estructuras mantenibles.",
      },
      mobile: {
        title: "Móvil",
        summary:
          "Diseño de flujos móviles para uso recurrente, datos editables e interacción compacta.",
      },
      "data-bi": {
        title: "Datos / BI",
        summary:
          "Transformación de datos operativos en dashboards, KPI y vistas orientadas a decisiones.",
      },
      "interactive-3d": {
        title: "Interactivo / 3D",
        summary:
          "Aplicación de motion y patrones interactivos en este portafolio mientras exploro trabajo 3D más profundo.",
      },
      "ai-workflows": {
        title: "Flujos de IA",
        summary:
          "Exploración de extracción, embeddings, búsqueda semántica y recomendaciones explicables.",
      },
      "tools-devops": {
        title: "Herramientas",
        summary:
          "Organización de entregas con control de versiones, documentación y herramientas prácticas.",
      },
    },
    timeline: {
      kicker: "Trayectoria técnica",
      title: "Un recorrido desde fundamentos de ingeniería hasta sistemas con enfoque de producto.",
      intro:
        "La trayectoria conecta aprendizaje universitario, proyectos prácticos, datos, IA y experimentación interactiva sin presentarse como historial laboral.",
      items: [
        {
          signal: "Fundamentos",
          title: "Fundamentos de ingeniería de sistemas",
          text: "Construí bases en programación, resolución de problemas, bases de datos, Java, Kotlin y hábitos de ingeniería para explicar el trabajo técnico.",
        },
        {
          signal: "Construcción",
          title: "Práctica web, backend y móvil",
          text: "Pasé de ejercicios aislados a flujos con Django, interfaces Android, comportamiento CRUD, persistencia e implementación por proyectos.",
        },
        {
          signal: "Producto",
          title: "Proyectos tratados como sistemas de producto",
          text: "Comencé a conectar requisitos, UML, modelos de datos, comportamiento backend y estados de UI en sistemas coherentes.",
        },
        {
          signal: "Expansión",
          title: "Dashboards de datos y flujos de IA",
          text: "Exploré Power BI, diseño de KPI, flujos con LLM, búsqueda semántica, embeddings y lógica de recomendación.",
        },
        {
          signal: "Exploración",
          title: "Sistemas interactivos y experimentación 3D",
          text: "Empecé a usar motion, WebGL, React Three Fiber y O3DE para explicar sistemas sin reemplazar interfaces 2D útiles.",
        },
        {
          signal: "Presentación",
          title: "El portafolio como superficie de producto",
          text: "Convierto el portafolio en una experiencia de casos de estudio que une razonamiento, capacidades y presentación interactiva.",
        },
      ],
    },
    about: {
      kicker: "Acerca de",
      title: "Construyo conectando pensamiento de producto, arquitectura y experiencia de usuario.",
      intro:
        "Soy desarrollador de software y estudiante de Ingeniería de Sistemas enfocado en sistemas útiles, interfaces pulidas, experiencias móviles, datos, IA y experimentación interactiva.",
      principles: [
        {
          title: "Útil antes que llamativo",
          text: "Intento entender la decisión que necesita tomar el usuario antes de elegir interfaz, stack o tratamiento visual.",
        },
        {
          title: "Sistemas antes que fragmentos",
          text: "Me gusta conectar requisitos, modelos de datos, comportamiento backend y estados de UI para lograr proyectos coherentes.",
        },
        {
          title: "Aprender en público",
          text: "Construyo activamente, documento decisiones y convierto proyectos universitarios en historias de software más claras.",
        },
        {
          title: "Interacción pulida",
          text: "Me interesan las interfaces, UX móvil, dashboards, flujos de IA y 3D interactivo cuando ayudan a explicar el sistema.",
        },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "Construyamos algo útil.",
      intro:
        "Disponible para prácticas, roles junior y colaboraciones donde importen la lógica de producto, los sistemas y las interfaces pulidas.",
      note: "Disponible para trabajo práctico de software, feedback del portafolio y conversaciones sobre proyectos.",
    },
    command: {
      trigger: "Abrir paleta de comandos",
      label: "Comandos",
      title: "Paleta de comandos",
      filter: "Filtrar comandos",
      placeholder: "Ir a...",
      available: "Comandos disponibles",
      noResults: "No se encontraron comandos.",
      top: "Inicio",
      selectedWork: "Trabajo seleccionado",
    },
    footer: {
      copyright: "© {year} {name}.",
    },
  },
};

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

function getTranslation(language, path) {
  return path.split(".").reduce((value, key) => value?.[key], translations[language]);
}

function interpolate(value, variables) {
  if (typeof value !== "string") {
    return value;
  }

  return Object.entries(variables).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value
  );
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language still works when storage is unavailable.
    }
  }, [language]);

  const t = useCallback(
    (path, variables = {}) => {
      const value = getTranslation(language, path) ?? getTranslation("en", path) ?? path;
      return interpolate(value, variables);
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "en" ? "es" : "en"));
  }, []);

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, toggleLanguage }),
    [language, t, toggleLanguage]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}
