import { motion as Motion } from "framer-motion";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";

const principles = [
  {
    title: "Product first",
    text:
      "I try to understand the decision a user needs to make before choosing the interface or the technology.",
  },
  {
    title: "Systems thinking",
    text:
      "I connect requirements, data models, backend behavior, and UI states so projects feel coherent.",
  },
  {
    title: "Clear communication",
    text:
      "I like explaining code, documenting tradeoffs, and making technical work understandable to other people.",
  },
];

function AboutSection() {
  return (
    <section className="section section--about" id="about" data-cinematic>
      <SectionHeader
        kicker="About"
        title="A calm builder with a bias for learning, clarity, and useful software."
        text="I am developing my craft through university projects, product experiments, and practical systems that combine backend logic, mobile interfaces, data, and AI."
      />

      <Motion.div
        className="about-grid"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {principles.map((principle) => (
          <Motion.article className="about-card" key={principle.title} variants={revealItem}>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </Motion.article>
        ))}
      </Motion.div>
    </section>
  );
}

export default AboutSection;
