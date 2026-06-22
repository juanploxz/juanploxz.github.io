const projectTranslations = {
  es: {
    flowgate: {
      category: "Aplicación web / Diseño de producto / Sistema universitario",
      type: "Sistema de producto universitario",
      status: "Prototipo de producto",
      orbit: "Motor de disponibilidad",
      summary:
        "Un sistema universitario de estacionamiento que convierte disponibilidad, congestión de accesos y tiempo estimado de espera en una decisión de llegada más clara.",
      problem:
        "Estudiantes y personal suelen llegar sin saber si el estacionamiento está lleno, dónde se concentra la congestión o cuánto puede tardar la fila.",
      approach:
        "Modelé la operación como un flujo de producto: estados de disponibilidad, registros de vehículos, presión en accesos, vistas administrativas y feedback para conductores.",
      solution:
        "Un flujo de estacionamiento con Django donde usuarios, vehículos, entradas, disponibilidad y decisiones administrativas comparten un mismo modelo operativo.",
      outcome:
        "Una narrativa de sistema más clara, donde reglas backend, estructura de datos y estados de interfaz apoyan el mismo objetivo operativo.",
      role: "Lógica de producto, modelado backend, flujo de UI y documentación",
      highlights: [
        "Mapeé recorridos de conductores y administradores alrededor de decisiones reales de estacionamiento.",
        "Diseñé relaciones de datos para vehículos, usuarios, entradas y disponibilidad.",
        "Conecté requisitos, UML, lógica backend y estados de interfaz en una sola historia de producto.",
      ],
      technicalDecisions: [
        "Modelé la disponibilidad como un estado operativo y no como un contador estático.",
        "Mantuve una primera capa de datos ligera con SQLite para validar con rapidez.",
        "Usé UML y documentación de requisitos para mantener explicable el comportamiento backend.",
      ],
      architecture: [
        "Los registros de usuarios y vehículos alimentan eventos de entrada y disponibilidad.",
        "Las vistas administrativas gestionan el estado y las pantallas para conductores comunican decisiones.",
        "La interfaz prioriza orientación de llegada sobre pantallas CRUD genéricas.",
      ],
      challenges: [
        "Traducir un proceso físico de estacionamiento en estados de software claros.",
        "Equilibrar el detalle administrativo con la simplicidad para conductores.",
      ],
      evidenceNote:
        "Solo caso de estudio. El repositorio y la demostración en vivo todavía no son públicos.",
      stages: [
        {
          label: "Descubrir",
          title: "Definir el problema de estacionamiento",
          text: "Convertir la incertidumbre de llegada en estados concretos: cupos, presión de accesos y espera estimada.",
        },
        {
          label: "Modelar",
          title: "Diseñar el núcleo operativo",
          text: "Definir usuarios, vehículos, zonas y eventos de entrada para sostener la experiencia desde el backend.",
        },
        {
          label: "Entregar",
          title: "Convertir lógica en decisiones",
          text: "Presentar una herramienta práctica para conductores y administradores, no una interfaz CRUD genérica.",
        },
      ],
    },
    "workout-tracker": {
      category: "Aplicación móvil / Producto fitness",
      type: "Concepto de producto móvil",
      status: "Concepto móvil",
      orbit: "Inteligencia de rutinas",
      summary:
        "Un concepto mobile-first para registrar rutinas, metas semanales de series, calorías, perfil editable e historial de entrenamientos.",
      problem:
        "El seguimiento fitness se fragmenta cuando rutinas, progreso, calorías y perfil viven en espacios separados.",
      approach:
        "Diseñé acciones móviles rápidas para actualizar rutinas, revisar series semanales, editar datos y consultar entrenamientos anteriores.",
      solution:
        "Un ciclo de seguimiento mobile-first para rutinas, progreso semanal, calorías, perfil e historial.",
      outcome:
        "Un concepto fitness con comportamiento CRUD, necesidades de persistencia y patrones preparados para uso diario repetido.",
      role: "Pensamiento de producto móvil, estructura UX y plan de implementación Android",
      highlights: [
        "Definí el ciclo principal alrededor de rutinas, volumen semanal, calorías e historial.",
        "Integré los datos editables del perfil dentro de la lógica fitness.",
        "Equilibré rapidez móvil con suficiente detalle para observar progreso.",
      ],
      technicalDecisions: [
        "Separé rutinas, perfil, calorías e historial en áreas de producto diferenciadas.",
        "Planeé flujos CRUD alrededor del uso recurrente y no de formularios aislados.",
        "Usé el volumen semanal de series como señal práctica de progreso.",
      ],
      architecture: [
        "Rutinas y perfil sostienen las pantallas de seguimiento diario.",
        "El historial permite consultar días anteriores sin interrumpir el registro.",
        "Los resúmenes conectan metas semanales, calorías y contexto del perfil.",
      ],
      challenges: [
        "Mantener el registro lo bastante rápido para usarlo durante el entrenamiento.",
        "Evitar una interfaz saturada sin perder información útil.",
      ],
      evidenceNote:
        "Solo caso de estudio. El repositorio y la demostración en vivo todavía no son públicos.",
      stages: [
        {
          label: "Ciclo",
          title: "Identificar el comportamiento diario",
          text: "Hacer accesibles en pocos toques el registro, el historial y las metas semanales.",
        },
        {
          label: "Persistir",
          title: "Dar forma al modelo de datos",
          text: "Planear CRUD para rutinas, calorías y perfil pensando en persistencia Android.",
        },
        {
          label: "Pulir",
          title: "Diseñar para la repetición",
          text: "Mantener una interfaz compacta, legible y rápida entre series.",
        },
      ],
    },
    thefinder: {
      category: "Herramienta de IA / MVP de automatización laboral",
      type: "MVP de flujo de IA",
      status: "Arquitectura MVP",
      orbit: "Matching semántico",
      summary:
        "Un MVP para automatizar la búsqueda laboral mediante lectura de CV, extracción con LLM, embeddings, scoring y recomendaciones.",
      problem:
        "La búsqueda laboral es ruidosa: se repiten filtros manuales y las vacantes esconden señales detrás de lenguaje inconsistente.",
      approach:
        "Diseñé un pipeline asistido por IA que extrae señales, las representa semánticamente y puntúa compatibilidad con razones explicables.",
      solution:
        "Una arquitectura MVP para procesar CV, extraer señales, comparar embeddings y devolver recomendaciones ordenadas con razones.",
      outcome:
        "Una arquitectura de producto que conecta LLM, similitud vectorial, relaciones de grafo y lógica backend.",
      role: "Diseño de flujos de IA, arquitectura backend y modelo de scoring",
      highlights: [
        "Conecté lectura de CV y extracción con LLM para estructurar perfiles.",
        "Usé embeddings y búsqueda semántica más allá de palabras clave exactas.",
        "Exploré relaciones de grafo para conectar habilidades, roles y recomendaciones.",
      ],
      technicalDecisions: [
        "Usé matching semántico para comparar significado en lugar de coincidencia literal.",
        "Exploré relaciones de grafo para habilidades, roles y contexto.",
        "Mantuve las explicaciones como salida principal del modelo de scoring.",
      ],
      architecture: [
        "El procesamiento del CV crea un perfil estructurado.",
        "La extracción con LLM y los embeddings normalizan señales de candidato y vacante.",
        "Una capa de scoring ordena oportunidades y explica la compatibilidad.",
      ],
      challenges: [
        "Lograr recomendaciones de IA suficientemente explicables.",
        "Evitar automatizar en exceso antes de validar la calidad del matching.",
      ],
      evidenceNote:
        "Solo caso de estudio. El repositorio y la demostración en vivo todavía no son públicos.",
      stages: [
        {
          label: "Extraer",
          title: "Estructurar la señal del candidato",
          text: "Procesar el CV, normalizar habilidades y usar extracción con LLM en texto libre.",
        },
        {
          label: "Comparar",
          title: "Puntuar compatibilidad semántica",
          text: "Comparar perfiles y vacantes con embeddings, relaciones y reglas de scoring.",
        },
        {
          label: "Recomendar",
          title: "Hacer útil el resultado",
          text: "Mostrar vacantes ordenadas con razones, brechas de habilidades y próximos pasos.",
        },
      ],
    },
    "movie-reviews": {
      category: "Aplicación web con Django",
      type: "Aplicación web full-stack",
      status: "Proyecto integrado",
      orbit: "Sistema de contenido",
      summary:
        "Una aplicación Django para reseñas de películas con vistas, modelos, manejo de archivos, UI y visualización de datos.",
      problem:
        "Una plataforma de reseñas necesita estructura, persistencia, archivos y vistas legibles antes de sentirse como un producto completo.",
      approach:
        "Construí el proyecto alrededor de modelos, vistas, templates, organización de archivos, CRUD y gráficas para datos de reseñas.",
      solution:
        "Una plataforma Django con modelos, vistas, templates, manejo de archivos, flujos CRUD y reportes con gráficas.",
      outcome:
        "Un proyecto full-stack de aprendizaje que demuestra fundamentos de Django e integra presentación y visualización.",
      role: "Implementación Django, templates, modelado de datos y reportes visuales",
      highlights: [
        "Implementé vistas y templates Django para un flujo real de contenido.",
        "Organicé archivos estáticos y multimedia para las reseñas.",
        "Añadí gráficas con Matplotlib para convertir datos en información visual.",
      ],
      technicalDecisions: [
        "Mantuve el renderizado en templates para fortalecer fundamentos de Django.",
        "Organicé archivos estáticos y multimedia como parte de la aplicación.",
        "Usé Matplotlib para añadir valor de reporte a los datos almacenados.",
      ],
      architecture: [
        "Los modelos Django estructuran las reseñas y sus datos relacionados.",
        "Vistas y templates renderizan contenido y flujos CRUD.",
        "Los archivos y las gráficas apoyan presentación y análisis.",
      ],
      challenges: [
        "Mantener claros los fundamentos mientras añadía pulido visual.",
        "Conectar el contenido almacenado con reportes útiles.",
      ],
      evidenceNote:
        "Solo caso de estudio. El repositorio y la demostración en vivo todavía no son públicos.",
      stages: [
        {
          label: "Estructurar",
          title: "Construir el modelo de reseñas",
          text: "Definir entidades, relaciones y rutas principales del contenido.",
        },
        {
          label: "Presentar",
          title: "Dar forma a templates y archivos",
          text: "Organizar vistas y recursos para que el contenido se sienta coherente.",
        },
        {
          label: "Explicar",
          title: "Visualizar los datos",
          text: "Usar gráficas para comprender mejor reseñas y contenido.",
        },
      ],
    },
    "powerbi-crisis": {
      category: "Business Intelligence / Dashboard de datos",
      type: "Dashboard de BI",
      status: "Dashboard ejecutivo",
      orbit: "Inteligencia para decisiones",
      summary:
        "Un dashboard ejecutivo de ventas para un comité de crisis, enfocado en KPI, transacciones, ticket promedio, variación y contribución.",
      problem:
        "Las decisiones de crisis necesitan visibilidad rápida sobre qué cambió, dónde se mueve el ingreso y qué productos o clientes lo explican.",
      approach:
        "Diseñé el dashboard alrededor de jerarquía de KPI, medidas DAX y priorización visual para un contexto ejecutivo.",
      solution:
        "Un dashboard Power BI organizado para escanear KPI, variación de ventas y contribución por producto, cliente y categoría.",
      outcome:
        "Una experiencia BI enfocada en lectura ejecutiva, análisis de variación y priorización rápida.",
      role: "Diseño de dashboard, modelado de KPI, análisis y narrativa ejecutiva",
      highlights: [
        "Diseñé KPI alrededor de las necesidades de decisión del comité.",
        "Usé DAX y análisis con datos de Excel para estructurar señales de ventas.",
        "Prioricé productos, clientes, categorías, transacciones y ticket promedio.",
      ],
      technicalDecisions: [
        "Prioricé la jerarquía de KPI antes que la variedad de gráficas.",
        "Usé medidas DAX para comparar variación y contribución.",
        "Agrupé visuales según su valor para la decisión ejecutiva.",
      ],
      architecture: [
        "Los datos de Excel alimentan medidas y visuales de Power BI.",
        "Los KPI resumen ventas, transacciones, ticket y variación.",
        "Las vistas de apoyo detallan productos, clientes y categorías.",
      ],
      challenges: [
        "Reducir ruido para un contexto de comité de crisis.",
        "Hacer visible el movimiento de ventas sin exploración profunda.",
      ],
      evidenceNote:
        "Solo caso de estudio. El repositorio y la demostración en vivo todavía no son públicos.",
      stages: [
        {
          label: "Medir",
          title: "Definir los KPI de crisis",
          text: "Enfocar el dashboard en las métricas necesarias para actuar rápido.",
        },
        {
          label: "Comparar",
          title: "Exponer la variación de ventas",
          text: "Mostrar cambios en transacciones, ticket, productos y clientes.",
        },
        {
          label: "Decidir",
          title: "Priorizar lo importante",
          text: "Ordenar la jerarquía visual alrededor de lectura ejecutiva y próximos pasos.",
        },
      ],
    },
  },
};

export function localizeProjects(projects, language) {
  if (language === "en") {
    return projects;
  }

  const localizedProjects = projectTranslations[language] ?? {};

  return projects.map((project) => ({
    ...project,
    ...(localizedProjects[project.id] ?? {}),
  }));
}
