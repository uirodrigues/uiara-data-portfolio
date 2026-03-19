export default function App() {
  const page = {
    background: "#08101f",
    color: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const container = {
    width: "min(1160px, calc(100% - 40px))",
    margin: "0 auto",
  };

  const section = {
    padding: "88px 0",
  };

  const eyebrow = {
    display: "inline-block",
    color: "#c9a646",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "18px",
  };

  const h2 = {
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: 1.05,
    margin: 0,
  };

  const p = {
    color: "#cfd6e4",
    fontSize: "18px",
    lineHeight: 1.7,
  };

  const card = {
    background: "#0d1529",
    border: "1px solid rgba(201,166,70,0.16)",
    borderRadius: "18px",
    padding: "28px",
  };

  const goldButton = {
    background: "#c9a646",
    color: "#08101f",
    border: "none",
    padding: "15px 24px",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "16px",
    cursor: "pointer",
  };

  const ghostButton = {
    background: "transparent",
    color: "#c9a646",
    border: "1px solid #c9a646",
    padding: "15px 24px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  };

  const metrics = [
    { value: "10x", label: "faster decisions" },
    { value: "18%", label: "avg. cost reduction" },
    { value: "91%", label: "confidence score" },
  ];

  const capabilities = [
    {
      title: "Analyze current logistics flows",
      text: "Evaluate existing lanes, warehouses, providers, and service trade-offs to identify cost, risk, and performance gaps.",
    },
    {
      title: "Design new route strategies",
      text: "Go beyond current lanes and model better future-state route and network configurations.",
    },
    {
      title: "Benchmark market prices",
      text: "Compare rates, provider competitiveness, and structural cost drivers before negotiation begins.",
    },
    {
      title: "Optimize transport and warehousing together",
      text: "Assess storage footprint, service level, transport mode, and total landed cost in one decision flow.",
    },
    {
      title: "Compare global versus local providers",
      text: "Decide whether global, local, or hybrid sourcing models create the strongest economics and resilience.",
    },
    {
      title: "Recommend the best strategic option",
      text: "Return a clear executive recommendation with logic, trade-offs, and implementation direction.",
    },
  ];

  const useCases = [
    "Network redesign for new markets",
    "Warehouse plus transport strategy decisions",
    "Supplier selection across local and global operators",
    "Scenario planning before RFQ launch",
    "Route redesign across LATAM operations",
    "Executive-ready logistics recommendations",
  ];

  const steps = [
    {
      step: "01",
      title: "Input the logistics challenge",
      text: "Add origins, destinations, volumes, service targets, supplier context, and operating constraints.",
    },
    {
      step: "02",
      title: "Simulate and benchmark options",
      text: "LogiStart compares network alternatives, provider structures, prices, and sourcing scenarios.",
    },
    {
      step: "03",
      title: "Receive the best recommendation",
      text: "The platform returns the strongest option with rationale, cost view, and next-step clarity.",
    },
  ];

  return (
    <div style={page}>
<section
  style={{
    padding: "110px 0 100px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background:
      "radial-gradient(circle at top, rgba(201,166,70,0.12), transparent 35%), #08101f",
  }}
>
  <div style={container}>
    <div style={{ maxWidth: "1000px" }}>
      
      <div style={eyebrow}>
        Logistics Decision Intelligence Platform
      </div>

      <h1
        style={{
          fontSize: "clamp(60px, 10vw, 120px)",
          lineHeight: 0.92,
          margin: 0,
          letterSpacing: "-1.5px",
        }}
      >
        AI THAT MAKES
        <br />
        <span style={{ color: "#c9a646" }}>
          LOGISTICS DECISIONS
        </span>
        <br />
        FOR YOU.
      </h1>

      <p
        style={{
          ...p,
          fontSize: "22px",
          maxWidth: "720px",
          marginTop: "28px",
          marginBottom: "42px",
        }}
      >
        LogiStart simulates scenarios, benchmarks the market,
        evaluates suppliers, and recommends the best logistics
        strategy instantly.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "50px",
        }}
      >
        <button style={goldButton}>
          ▶ See Decision Demo
        </button>

        <button style={ghostButton}>
          Access Dashboard
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "60px",
          flexWrap: "wrap",
        }}
      >
        {metrics.map((item) => (
          <div key={item.label}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#c9a646",
              }}
            >
              {item.value}
            </div>
            <div style={{ color: "#cfd6e4", fontSize: "16px" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

      <section style={section}>
        <div style={container}>
          <div style={{ maxWidth: "920px", marginBottom: "44px" }}>
            <div style={eyebrow}>The problem</div>
            <h2 style={h2}>Most logistics decisions are still broken</h2>
            <p style={{ ...p, marginTop: "24px" }}>
              Companies still rely on fragmented spreadsheets, manual analysis,
              disconnected RFQs, and static routing assumptions. That makes
              decisions slow, reactive, and often suboptimal, especially when
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
                text: "Decision cycles still depend on human analysis, scattered quotes, and disconnected market knowledge.",
              },
              {
                title: "Too narrow",
                text: "Most tools do not connect route design, warehousing logic, pricing, and sourcing strategy in one view.",
              },
            ].map((item) => (
              <div key={item.title} style={card}>
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>{item.title}</h3>
                <p style={{ ...p, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          ...section,
          background: "#0b1220",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={container}>
          <div style={{ maxWidth: "980px", marginBottom: "42px" }}>
            <div style={eyebrow}>Platform capabilities</div>
            <h2 style={h2}>LogiStart acts as a strategist, not just an optimizer</h2>
            <p style={{ ...p, marginTop: "24px" }}>
              The platform supports existing operations, future-state route
              design, supplier strategy, and network scenario planning, so the
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
            {capabilities.map((item) => (
              <div key={item.title} style={card}>
                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "24px" }}>
                  {item.title}
                </h3>
                <p style={{ ...p, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.95fr 1.05fr",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <div>
              <div style={eyebrow}>Strategic value</div>
              <h2 style={h2}>Built for complex logistics decisions</h2>
              <p style={{ ...p, marginTop: "24px" }}>
                Whether you are managing procurement, warehousing,
                transportation, supply chain strategy, or regional expansion,
                LogiStart helps you evaluate multiple pathways before you commit.
              </p>

              <div style={{ marginTop: "28px" }}>
                <button style={goldButton}>Book a Strategic Demo</button>
              </div>
            </div>

            <div style={card}>
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
          ...section,
          background: "#0b1220",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={container}>
          <div style={{ maxWidth: "900px", marginBottom: "42px" }}>
            <div style={eyebrow}>How it works</div>
            <h2 style={h2}>A decision engine for logistics strategy</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {steps.map((item) => (
              <div key={item.step} style={card}>
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
                <p style={{ ...p, marginBottom: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <div
            style={{
              ...card,
              padding: "40px",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(201,166,70,0.08), rgba(13,21,41,1))",
            }}
          >
            <div style={eyebrow}>Final message</div>
            <h2 style={{ ...h2, maxWidth: "900px", margin: "0 auto" }}>
              Stop choosing between existing options. Start designing the best one.
            </h2>
            <p style={{ ...p, maxWidth: "820px", margin: "22px auto 30px" }}>
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
          
              <button style={goldButton}>Start Your First Strategic Assessment</button>
              <button style={ghostButton}>See the Executive Output</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}