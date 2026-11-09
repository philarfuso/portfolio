const configurationInputs = [
  {
    title: "Database configuration",
    detail: "Entities + feature flags",
  },
  {
    title: "Market-specific classes",
    detail: "Rules that cannot be shared",
  },
] as const;

export function MemxConfigurationDiagram() {
  return (
    <figure
      className="sc-diagram"
      data-reveal="scale"
      id="configuration-diagram"
    >
      <figcaption>
        <span>Configuration flow</span>
        <strong>From active market to a valid request</strong>
      </figcaption>
      <p className="sr-only">
        The active market selects database configuration and market-specific
        classes. Both feed shared platform context, then a reusable frontend,
        and finally a sanitized request.
      </p>

      <div className="sc-diagram-flow" aria-hidden="true">
        <div className="sc-diagram-node sc-diagram-active">
          <span>Selection</span>
          <strong>Active market</strong>
        </div>

        <div className="sc-diagram-branch" role="presentation">
          {configurationInputs.map((input) => (
            <div className="sc-diagram-node" key={input.title}>
              <span>Input</span>
              <strong>{input.title}</strong>
              <small>{input.detail}</small>
            </div>
          ))}
        </div>

        <div className="sc-diagram-node sc-diagram-context">
          <i className="sc-diagram-input-wire" />
          <span>Shared context</span>
          <strong>Shared platform context</strong>
          <small>One description of the current market</small>
        </div>

        <div className="sc-diagram-output">
          <div className="sc-diagram-node">
            <span>Frontend</span>
            <strong>Reusable UI</strong>
            <small>Fields + visibility + validation</small>
          </div>
          <div className="sc-diagram-node sc-diagram-request">
            <span>Output</span>
            <strong>Sanitized request</strong>
          </div>
        </div>
      </div>
    </figure>
  );
}
