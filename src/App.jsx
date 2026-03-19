export default function App() {
  const sectionStyle = {
    padding: "96px 20px",
  };

  const containerStyle = {
    width: "min(1160px, calc(100% - 40px))",
    margin: "0 auto",
  };

  const cardStyle = {
    background: "#0d1529",
    border: "1px solid rgba(201,166,70,0.18)",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  };

  const eyebrowStyle = {
    display: "inline-block",
    color: "#c9a646",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "18px",
  };

  const h2Style = {
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: 1.05,
    color: "#f5f7fb",
    margin: 0,
  };

  const paragraphStyle = {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#cfd6e4",
  };

  const primaryButton = {
    background: "#c9a646",
    color: "#08101f",
    border: "none",
    padding: "15px 24px",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "16px",
    cursor: "pointer",
  };

  const secondaryButton = {
    background: "transparent",
    color: "#c9a646",
    border: "1px solid #c9a646",
    padding: "15px 24px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  };

  const metricCards = [
    { value: "10x", label: "faster decisions" },
    { value: "18%", label: "avg. cost reduction" },
    { value: "91%", label: "confidence score" },
  ];

  const capabilityCards = [
    {
      title: "Analyze current flows",
      text: "Evaluate existing lanes, providers, contracts, and warehouse setups to identify cost, service, and risk gaps.",
    },
    {
      title: "Design new route strategies",
      text: "Recommend new logistics paths, network alternatives, and sourcing structures - not just optimize what already exists.",
    },
    {
      title: "Benchmark prices in real time",
      text: "Compare market rates, operator competitiveness, and structural cost drivers before negotiation starts.",
    },
    {
      title: "Optimize warehousing + transport together",
      text: "Find the best synergies between storage footprint, transportation mode, lead time, service level, and total landed cost.",
    },
    {
      title: "Decide global vs local sourcing",
      text: "Assess whether global providers, local operators, or hybrid models generate better economics and resilience.",
    },
    {
      title: "Recommend the best path forward",
      text: "Turn scenarios into an executive recommendation with rationale, trade-offs, and next-step clarity.",
    },
  ];

  const useCases = [
    "Redesigning distribution routes for new markets",
    "Selecting the best mix of warehouse and transport suppliers",
    "Comparing global vs local logistics provider strategies",
    "Testing network scenarios before RFQ launch",
    "Improving cost-to-service performance across LATAM operations",
    "Creating executive-ready sourcing and logistics recommendations",
  ];

  const processSteps = [
    {
      step: "01",
      title: "Input the logistics challenge",
      text: "Share origins, destinations, volumes, service targets, current constraints, and sourcing context.",
    },
    {
      step: "02",
      title: "Simulate, compare, and benchmark",
      text: "LogiStart models alternative routes, provider structures, storage strategies, and cost scenarios.",
    },
    {
      step: "03",
      title: "Receive a strategic recommendation",
      text: "The platform returns the strongest option with decision logic, price intelligence, and implementation direction.",
    },
  ];

  return (
    <div style={{ background: "#08101f", color: "#f5f7fb" }}>
      <section
        style={{
          padding: "96px 20px 84px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background:
            "radial-gradient(circle at top left, rgba(201,166,70,0.12), transparent 28%), #08101f",
        }}
      >
        <div style={containerStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "42px",
              alignItems: "center",
            }}
          >
            <div>
              <div style={eyebrowStyle}>Logistics Decision Intelligence</div>

              <h1
                style={{
                  fontSize: "clamp(52px, 9vw, 104px)",
                  lineHeight: 0.94,
                  margin: 0,
                  color: "#c9a646",
                  letterSpacing: "-1.5px",
                }}
              >
                AI that designs
                <br />
                and optimizes
                <br />
                your logistics
                <br />
                strategy.
              </h1>

              <p
                style={{
                  ...paragraphStyle,
                  fontSize: "24px",
                  maxWidth: "860px",
                  marginTop: "28px",
                  marginBottom: "34px",
                }}
              >
                LogiStart goes beyond existing routes. It analyzes scenarios,
                benchmarks the market, evaluates suppliers, designs new network
                options, and recommends the best logistics strategy instantly.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginBottom: "42px",
                }}
              >
                <button style={primaryButton}>▶ See Decision Demo</button>
                <button style={secondaryButton}>Access Dashboard</button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
                  gap: "18px",
                  maxWidth: "760px",
                }}
              >
                {metricCards.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      borderTop: "1px solid rgba(201,166,70,0.2)",
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "#c9a646",
                        fontSize: "56px",
                        fontWeight: 800,
                        lineHeight: 1,
                        marginBottom: "12px",
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        color: "#f5f7fb",
                        fontSize: "18px",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={eyebrowStyle}>What the platform actually does</div>
              <h3
                style={{
                  fontSize: "30px",
                  lineHeight: 1.2,
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                From routes to strategy
              </h3>

              <p style={{ ...paragraphStyle, marginTop: 0 }}>
                LogiStart is not limited to optimizing existing transport lanes.
                It acts as a logistics strategist.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginTop: "24px",
                }}
              >
                {[
                  "Evaluates current routes and logistics spend",
                  "Designs new route and network alternatives",
                  "Tests warehouse and transport synergies",
                  "Compares global, local, and hybrid provider models",
                  "Benchmarks market prices before supplier decisions",
                  "Produces an executive recommendation, not just a dashboard",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "#c9a646",
                        fontWeight: 800,
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ ...paragraphStyle, margin: 0, fontSize: "16px" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={{ maxWidth: "920px", marginBottom: "44px" }}>
            <div style={eyebrowStyle}>The problem</div>
            <h2 style={h2Style}>Most logistics decisions are still broken</h2>
            <p style={{ ...paragraphStyle, marginTop: "24px" }}>
              Companies still rely on fragmented spreadsheets, manual analysis,
              disconnected RFQs, and static routing assumptions. That makes
              decisions slow, reactive, and often suboptimal - especially when
              warehousing, transportation, supplier strategy, and regional
              expansion need to be evaluated together.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                title: "Too tactical",
                text: "Teams optimize isolated lanes without redesigning the broader network.",
              },
              {
                title: "Too manual",
                text: "Decision cycles depend on human analysis, disconnected quotes, and scattered market knowledge.",
              },
              {
                title: "Too narrow",
                text: "Most tools don’t connect route design, warehousing logic, pricing, and sourcing strategy in one view.",
              },
            ].map((item) => (
              <div key={item.title} style={cardStyle}>
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>{item.title}</h3>
                <p style={{ ...paragraphStyle, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          ...sectionStyle,
          background: "#0b1220",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={containerStyle}>
          <div style={{ maxWidth: "980px", marginBottom: "42px" }}>
            <div style={eyebrowStyle}>Platform capabilities</div>
            <h2 style={h2Style}>
              LogiStart acts as a strategist, not just an optimizer
            </h2>
            <p style={{ ...paragraphStyle, marginTop: "24px" }}>
              The platform supports existing operations, future-state route
              design, supplier strategy, and network scenario planning - so the
              output is not just a lower freight rate, but a stronger logistics
              decision.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {capabilityCards.map((item) => (
              <div key={item.title} style={cardStyle}>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "12px",
                    fontSize: "24px",
                    color: "#f5f7fb",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ ...paragraphStyle, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.95fr 1.05fr",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <div>
              <div style={eyebrowStyle}>Strategic value</div>
              <h2 style={h2Style}>Built for complex logistics decisions</h2>
              <p style={{ ...paragraphStyle, marginTop: "24px" }}>
                Whether you are managing procurement, warehousing, transportation,
                supply chain strategy, or regional expansion, LogiStart helps you
                evaluate multiple pathways before you commit.
              </p>

              <div style={{ marginTop: "28px" }}>
                <button style={primaryButton}>Book a Strategic Demo</button>
              </div>
            </div>

            <div style={cardStyle}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {useCases.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,166,70,0.12)",
                      color: "#e5ebf5",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          ...sectionStyle,
          background: "#0b1220",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={containerStyle}>
          <div style={{ maxWidth: "900px", marginBottom: "42px" }}>
            <div style={eyebrowStyle}>How it works</div>
            <h2 style={h2Style}>A decision engine for logistics strategy</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {processSteps.map((item) => (
              <div key={item.step} style={cardStyle}>
                <div
                  style={{
                    color: "#c9a646",
                    fontSize: "14px",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    marginBottom: "18px",
                  }}
                >
                  STEP {item.step}
                </div>
                <h3 style={{ marginTop: 0, fontSize: "26px", lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p style={{ ...paragraphStyle, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div
            style={{
              ...cardStyle,
              padding: "40px",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(201,166,70,0.08), rgba(13,21,41,1))",
            }}
          >
            <div style={eyebrowStyle}>Final message</div>
            <h2 style={{ ...h2Style, maxWidth: "900px", margin: "0 auto" }}>
              Stop choosing between existing options. Start designing the best one.
            </h2>
            <p
              style={{
                ...paragraphStyle,
                maxWidth: "820px",
                margin: "22px auto 30px",
              }}
            >
              LogiStart helps you move from fragmented logistics analysis to a
              structured, strategic recommendation that integrates routes,
              warehousing, pricing, sourcing, and execution logic.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button style={primaryButton}>Start Your First Strategic Assessment</button>
              <button style={secondaryButton}>See the Executive Output</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}