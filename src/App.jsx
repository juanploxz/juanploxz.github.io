import { useState } from "react";
import "./index.css";
import { Github, Linkedin, Mail, Globe, Instagram } from "lucide-react";

/* ===========================
   Fondo de triangulitos
   =========================== */

const TRIANGLES = Array.from({ length: 24 });

function BackgroundTriangles() {
    return (
        <div className="triangles-layer">
            {TRIANGLES.map((_, i) => (
                <span
                    key={i}
                    className="triangle-shape"
                    style={{
                        "--x": `${Math.random() * 100}vw`,
                        "--delay": `${Math.random() * -12}s`,
                        "--duration": `${10 + Math.random() * 10}s`,
                        "--scale": `${0.5 + Math.random() * 1.2}`,
                    }}
                />
            ))}
        </div>
    );
}

/* ===========================
   Tarjeta de proyectos con tilt
   =========================== */

function ProjectCard({ title, text, meta }) {
    const [transform, setTransform] = useState(
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    );

    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const ratioX = (x - midX) / midX;
        const ratioY = (y - midY) / midY;

        const rotateX = ratioY * 6;
        const rotateY = -ratioX * 6;

        setTransform(
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(2px)`
        );
    };

    const handleLeave = () => {
        setTransform(
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)"
        );
    };

    return (
        <article
            className="card card-tilt"
            style={{ transform }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{text}</p>
            <p className="card-meta">{meta}</p>
        </article>
    );
}

function App() {
    const [lang, setLang] = useState("en");

    const data =
        {
            en: {
                heroTitle: "Hi, I'm Juan Parra",
                heroSubtitle:
                    "Developer in training with a passion for building functional and well-designed solutions.",
                nav: {
                    projects: "Projects",
                    skills: "Skills",
                    timeline: "Timeline",
                    contact: "Contact",
                },
                overviewLeftTitle: "About me",
                overviewLeftText:
                    "Nice to meet you, and thanks for being interested in knowing more about me. My name is Juan Pablo Parra El-Masri, I’m passionate about computers and software development. I’m a calm person, I try to avoid unnecessary stress in my daily life and I love solving problems. I am currently 20 years old.",
                overviewRightTitle: "How I solve problems",
                overviewRightText:
                    "When I face a problem, I like to think about different ways to reach a solution. If that means researching, discovering or learning something new in order to fix it, I’m willing to do it. I never stop learning, and that’s something I truly enjoy.",
                skillsTitle: "Technical skills",
                softSkillsTitle: "Soft skills",
                stackTitle: "Main stack & focus",
                stackBullets: [
                    "Reinforcing strong foundations in data structures and linear algebra.",
                    "Interested in backend, Android and code optimization.",
                    "Open to small projects to gain experience and generate extra income.",
                ],
                techSkills: [
                    "Java",
                    "Kotlin",
                    "C#",
                    "C++",
                    "Rust",
                    "SQL",
                    "PostgreSQL",
                    "MongoDB",
                    "Gradle",
                    "Spring Boot",
                    "AWS",
                ],
                softSkills: [
                    "Eagerness to learn new things",
                    "Teamwork",
                    "Simple and clear communication",
                    "Code writing and explanation",
                ],
                projectsTitle: "Highlighted projects",
                projectsIntro:
                    "Some projects I’m building or have built recently. Later we can replace these with your real apps and APIs.",
                projects: [
                    {
                        title: "Android – Notes App",
                        text:
                            "Simple Kotlin app using Jetpack Compose to create and organize notes with a clean architecture.",
                        meta: "Kotlin · Android Studio · Room · MVVM",
                    },
                    {
                        title: "API REST – Task Manager",
                        text:
                            "REST API in Java connected to MongoDB for managing tasks, users and basic authentication.",
                        meta: "Java · Spring Boot · MongoDB · Postman",
                    },
                ],
                timelineTitle: "Learning journey",
                timeline: [
                    {
                        period: "2024 - now",
                        text:
                            "Systems Engineering student, focusing on programming fundamentals and mathematics.",
                    },
                    {
                        period: "2024-2",
                        text:
                            "Strengthening Java and Kotlin, exploring Android and backend with databases.",
                    },
                    {
                        period: "2025",
                        text:
                            "Experimenting with Rust and cloud tools like AWS, aiming for real or freelance projects.",
                    },
                    {
                        period: "2025-2",
                        text: "Strengthening MongoDB, SQL and databases in general.",
                    },
                ],
                contactTitle: "Contact",
                contactText:
                    "If you want to collaborate, ask something or just say hi, you can reach me here:",
                contactPrimary: "Send email",
                contactGithub: "View GitHub",
                contactLinkedin: "View LinkedIn",
                footer: "All rights reserved.",
            },
            es: {
                heroTitle: "Hola, soy Juan Parra",
                heroSubtitle:
                    "Desarrollador en formación con pasión por construir soluciones funcionales y bien diseñadas.",
                nav: {
                    projects: "Proyectos",
                    skills: "Habilidades",
                    timeline: "Línea de tiempo",
                    contact: "Contacto",
                },
                overviewLeftTitle: "Sobre mí",
                overviewLeftText:
                    "Me presento, me da gusto que te interese saber sobre mí. Mi nombre es Juan Pablo Parra El-Masri, un apasionado por la computación y el desarrollo de software. Soy una persona calmada, trato de evitar el estrés innecesario en mi vida diaria y me encanta resolver problemas. Actualmente tengo 20 años.",
                overviewRightTitle: "Cómo resuelvo problemas",
                overviewRightText:
                    "Respecto a mi forma de resolver problemas, me gusta pensar en diferentes maneras de buscar una solución. Si eso requiere investigar para descubrir o aprender algo nuevo y así poder resolver el problema, entonces estoy dispuesto a hacerlo. Nunca paro de aprender; es algo que realmente me gusta.",
                skillsTitle: "Habilidades técnicas",
                softSkillsTitle: "Habilidades blandas",
                stackTitle: "Stack principal y enfoque",
                stackBullets: [
                    "Reforzando bases sólidas en estructuras de datos y álgebra lineal.",
                    "Interés en backend, Android y optimización de código.",
                    "Abierto a proyectos pequeños para ganar experiencia e ingresos extra.",
                ],
                techSkills: [
                    "Java",
                    "Kotlin",
                    "C#",
                    "C++",
                    "Rust",
                    "SQL",
                    "PostgreSQL",
                    "MongoDB",
                    "Gradle",
                    "Spring Boot",
                    "AWS",
                ],
                softSkills: [
                    "Ganas de aprender cosas nuevas",
                    "Trabajo en equipo",
                    "Comunicación sencilla y clara",
                    "Redacción y explicación de código",
                ],
                projectsTitle: "Proyectos destacados",
                projectsIntro:
                    "Algunos proyectos que estoy construyendo o he construido. Luego podemos reemplazar estas tarjetas por tus proyectos reales.",
                projects: [
                    {
                        title: "Android – App de notas",
                        text:
                            "App sencilla en Kotlin con Jetpack Compose para crear y organizar notas con arquitectura limpia.",
                        meta: "Kotlin · Android Studio · Room · MVVM",
                    },
                    {
                        title: "API REST – Gestión de tareas",
                        text:
                            "API REST en Java conectada a MongoDB para manejar tareas, usuarios y autenticación básica.",
                        meta: "Java · Spring Boot · MongoDB · Postman",
                    },
                ],
                timelineTitle: "Mi camino de aprendizaje",
                timeline: [
                    {
                        period: "2024 - ahora",
                        text:
                            "Estudiante de Ingeniería de Sistemas, enfocándome en bases de programación y matemáticas.",
                    },
                    {
                        period: "2024-2",
                        text:
                            "Fortaleciendo Java y Kotlin, explorando Android y backend con bases de datos.",
                    },
                    {
                        period: "2025",
                        text:
                            "Probando Rust y herramientas en la nube como AWS, buscando proyectos reales o freelance.",
                    },
                    {
                        period: "2025-2",
                        text:
                            "Fortaleciendo MongoDB, SQL y bases de datos en general.",
                    },
                ],
                contactTitle: "Contacto",
                contactText:
                    "Si quieres colaborar, preguntar algo o simplemente saludar, puedes escribirme o agregarme aquí:",
                contactPrimary: "Enviar correo",
                contactGithub: "Ver GitHub",
                contactLinkedin: "Ver LinkedIn",
                footer: "Todos los derechos reservados.",
            },
        }[lang];

    return (
        <>
            {/* Fondo animado de triangulitos */}
            <BackgroundTriangles />

            <div className="app">
                {/* NAVBAR */}
                <header className="navbar fade-in-down">
                    <div className="navbar-inner">
                        <div className="navbar-left">
                            <a href="#home" className="brand">
                                Juan Parra
                            </a>
                        </div>

                        <nav className="navbar-center">
                            <a href="#projects">{data.nav.projects}</a>
                            <a href="#skills">{data.nav.skills}</a>
                            <a href="#timeline">{data.nav.timeline}</a>
                            <a href="#contact">{data.nav.contact}</a>
                        </nav>

                        <div className="navbar-right">
                            <button
                                className="icon-button"
                                onClick={() => setLang(lang === "en" ? "es" : "en")}
                                title="Change language"
                            >
                                <Globe />
                                <span>{lang === "en" ? "ES" : "EN"}</span>
                            </button>
                            <a
                                className="icon-button"
                                href="https://github.com/juanploxz"
                                target="_blank"
                                rel="noreferrer"
                                title="GitHub"
                            >
                                <Github />
                            </a>
                            <a
                                className="icon-button"
                                href="https://www.linkedin.com/in/juan-pablo-parra-el-masri-031b34122/"
                                target="_blank"
                                rel="noreferrer"
                                title="LinkedIn"
                            >
                                <Linkedin />
                            </a>

                            <a
                                className="icon-button"
                                href="https://www.instagram.com/juanploxz"
                                target="_blank"
                                rel="noreferrer"
                                title="Instagram"
                            >
                                <Instagram />
                            </a>

                            <a
                                className="icon-button"
                                href="mailto:juanploxz@gmail.com"
                                title="Email"
                            >
                                <Mail />
                            </a>
                        </div>
                    </div>
                </header>

                {/* CONTENIDO */}
                <main id="home">
                    {/* HERO */}
                    <section className="hero fade-in-up delay-1">
                        <div className="hero-inner">
                            <h1 className="hero-title">{data.heroTitle}</h1>
                            <p className="hero-subtitle">{data.heroSubtitle}</p>
                        </div>
                    </section>

                    {/* SOBRE MÍ / CÓMO RESUELVO PROBLEMAS */}
                    <section className="section fade-in-up delay-2">
                        <div className="section-cards">
                            <article className="card card-info">
                                <h2 className="card-title">{data.overviewLeftTitle}</h2>
                                <p className="card-text">{data.overviewLeftText}</p>
                            </article>

                            <article className="card card-info">
                                <h2 className="card-title">{data.overviewRightTitle}</h2>
                                <p className="card-text">{data.overviewRightText}</p>
                            </article>
                        </div>
                    </section>

                    {/* SKILLS */}
                    <section className="section fade-in-up delay-3" id="skills">
                        <div className="skills-wrapper">
                            <h2 className="section-title">{data.skillsTitle}</h2>

                            <div className="pill-list">
                                {data.techSkills.map((s) => (
                                    <span className="pill" key={s}>
                    {s}
                  </span>
                                ))}
                            </div>

                            <h3 className="section-subtitle">{data.softSkillsTitle}</h3>
                            <div className="pill-list">
                                {data.softSkills.map((s) => (
                                    <span className="pill" key={s}>
                    {s}
                  </span>
                                ))}
                            </div>
                        </div>

                        <h3 className="section-subtitle stack-title">
                            {data.stackTitle}
                        </h3>
                        <ul className="detail-list">
                            {data.stackBullets.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* PROYECTOS */}
                    <section className="section fade-in-up delay-4" id="projects">
                        <h2 className="section-title">{data.projectsTitle}</h2>
                        <p className="section-intro">{data.projectsIntro}</p>

                        <div className="section-cards">
                            {data.projects.map((p) => (
                                <ProjectCard
                                    key={p.title}
                                    title={p.title}
                                    text={p.text}
                                    meta={p.meta}
                                />
                            ))}
                        </div>
                    </section>

                    {/* TIMELINE */}
                    <section className="section fade-in-up delay-5" id="timeline">
                        <h2 className="section-title">{data.timelineTitle}</h2>

                        <div className="timeline-wrapper">
                            <div className="timeline-list">
                                {data.timeline.map((item) => (
                                    <div className="timeline-item" key={item.period}>
                                        <div className="timeline-period">{item.period}</div>
                                        <div className="timeline-text">{item.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CONTACTO */}
                    <section className="section fade-in-up delay-6" id="contact">
                        <h2 className="section-title">{data.contactTitle}</h2>
                        <p className="section-intro">{data.contactText}</p>

                        <div className="contact-links">
                            <a
                                href="mailto:juanploxz@gmail.com"
                                className="contact-button contact-button-primary"
                            >
                                <Mail />
                                <span>{data.contactPrimary}</span>
                            </a>

                            <a
                                href="https://github.com/juanploxz"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-button"
                            >
                                <Github />
                                <span>{data.contactGithub}</span>
                            </a>

                            <a
                                href="https://www.instagram.com/TU_USUARIO_AQUI"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-button"
                            >
                                <Instagram />
                                <span>Instagram</span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/juan-pablo-parra-el-masri-031b34122/"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-button"
                            >
                                <Linkedin />
                                <span>{data.contactLinkedin}</span>
                            </a>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="footer">
          <span>
            © {new Date().getFullYear()} Juan Parra. {data.footer}
          </span>
                </footer>
            </div>
        </>
    );
}

export default App;
