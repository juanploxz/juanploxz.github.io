import { motion as Motion } from "framer-motion";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";
import { useLanguage } from "../hooks/useLanguage";

function TimelineSection({ timeline }) {
  const { t } = useLanguage();
  const translatedItems = t("timeline.items");

  return (
    <section className="section section--timeline" id="timeline" aria-labelledby="timeline-title">
      <SectionHeader
        titleId="timeline-title"
        kicker={t("timeline.kicker")}
        title={t("timeline.title")}
        text={t("timeline.intro")}
      />

      <Motion.ol
        className="timeline"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {timeline.map((item, index) => (
          <Motion.li
            className="timeline-item"
            key={`${item.period}-${item.title}`}
            variants={revealItem}
          >
            <div className="timeline-item__period">
              <span>{item.period}</span>
              <small>{translatedItems[index]?.signal ?? item.signal}</small>
            </div>
            <div className="timeline-item__body">
              <h3>{translatedItems[index]?.title ?? item.title}</h3>
              <p>{translatedItems[index]?.text ?? item.text}</p>
            </div>
          </Motion.li>
        ))}
      </Motion.ol>
    </section>
  );
}

export default TimelineSection;
