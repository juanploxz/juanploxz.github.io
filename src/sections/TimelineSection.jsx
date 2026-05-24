import { motion as Motion } from "framer-motion";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";

function TimelineSection({ timeline }) {
  return (
    <section className="section section--timeline" id="timeline" data-cinematic>
      <SectionHeader
        kicker="Technical timeline"
        title="A learning path moving from syntax to systems to product thinking."
        text="The timeline connects foundations, implementation, product decisions, and the current portfolio direction."
      />

      <Motion.ol
        className="timeline"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {timeline.map((item) => (
          <Motion.li className="timeline-item" key={item.period} variants={revealItem}>
            <div className="timeline-item__period">
              <span>{item.period}</span>
              <small>{item.signal}</small>
            </div>
            <div className="timeline-item__body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </Motion.li>
        ))}
      </Motion.ol>
    </section>
  );
}

export default TimelineSection;
