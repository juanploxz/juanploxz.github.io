const rails = Array.from({ length: 7 }, (_, index) => index);
const nodes = Array.from({ length: 18 }, (_, index) => index);

function HeroFallbackScene({ loading = false }) {
  return (
    <div className={`hero-fallback-scene ${loading ? "is-loading" : ""}`}>
      <div className="hero-fallback-scene__plane hero-fallback-scene__plane--back" />
      <div className="hero-fallback-scene__plane hero-fallback-scene__plane--front" />

      <div className="hero-fallback-scene__rails" aria-hidden="true">
        {rails.map((rail) => (
          <span key={rail} style={{ "--rail-index": rail }} />
        ))}
      </div>

      <div className="hero-fallback-scene__nodes" aria-hidden="true">
        {nodes.map((node) => (
          <span key={node} style={{ "--node-index": node }} />
        ))}
      </div>
    </div>
  );
}

export default HeroFallbackScene;
