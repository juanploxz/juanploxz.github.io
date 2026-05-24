const frames = Array.from({ length: 5 }, (_, index) => index);
const panels = Array.from({ length: 5 }, (_, index) => index);

function HeroFallbackScene({ loading = false }) {
  return (
    <div className={`hero-fallback-scene ${loading ? "is-loading" : ""}`}>
      <div className="hero-fallback-scene__tunnel" aria-hidden="true">
        {frames.map((frame) => (
          <span key={frame} style={{ "--frame-index": frame }} />
        ))}
      </div>

      <div className="hero-fallback-scene__rails" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="hero-fallback-scene__panels" aria-hidden="true">
        {panels.map((panel) => (
          <span key={panel} style={{ "--panel-index": panel }} />
        ))}
      </div>
    </div>
  );
}

export default HeroFallbackScene;
