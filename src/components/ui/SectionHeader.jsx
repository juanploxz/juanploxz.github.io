import { motion as Motion } from "framer-motion";
import { revealItem, viewportOnce } from "../../lib/animations";

function SectionHeader({ kicker, title, text, align = "left", titleId }) {
  return (
    <Motion.div
      className={`section-header section-header--${align}`}
      variants={revealItem}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 id={titleId}>{title}</h2>
      {text ? <p>{text}</p> : null}
    </Motion.div>
  );
}

export default SectionHeader;
