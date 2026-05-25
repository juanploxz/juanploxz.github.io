const fallbackPanels = ["Web", "Mobile", "AI", "Data", "Systems"];

function SelectedWorksFallback({ loading = false }) {
  return (
    <div
      className={[
        "selected-works-fallback",
        loading ? "is-loading" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--active-accent": "var(--accent)" }}
    >
      <div className="selected-works-fallback__room" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="selected-works-fallback__screen" aria-hidden="true">
        <div>
          <span>Work room</span>
          <strong>Web · Mobile · AI · Data</strong>
        </div>
        <i />
        <i />
        <i />
      </div>
      <div className="selected-works-fallback__panels" aria-hidden="true">
        {fallbackPanels.map((panel, index) => (
          <span
            key={panel}
            style={{
              "--panel-index": index,
              "--project-accent": "var(--accent)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedWorksFallback;
