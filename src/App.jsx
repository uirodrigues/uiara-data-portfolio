import { useState, useEffect, useRef } from "react";

/* ============================================================
DESIGN TOKENS - Premium Dark Theme
============================================================ */
const C = {
  bg:       "#000000",
  bgElevated: "#0A0A0A",
  bgCard:   "#0F0F0F",
  border:   "#1A1A1A",
  borderLight: "#2A2A2A",
  accent:   "#FFFFFF",
  accentMuted: "#E0E0E0",
  gold:     "#F5A623",
  goldDim:  "rgba(245,166,35,0.08)",
  white:    "#FFFFFF",
  gray1:    "#CCCCCC",
  gray2:    "#888888",
  gray3:    "#444444",
  green:    "#00C48C",
  red:      "#FF5A5A",
  blue:     "#3B82F6",
  purple:   "#A855F7",
};

/* ============================================================
GLOBAL CSS
============================================================ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${C.bg};
  color: ${C.white};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: ${C.bg};
}
::-webkit-scrollbar-thumb {
  background: ${C.gray3};
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${C.gray2};
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes borderGlow {
  0%, 100% {
    border-color: ${C.borderLight};
    box-shadow: 0 0 0 0 rgba(255,255,255,0);
  }
  50% {
    border-color: rgba(255,255,255,0.3);
    box-shadow: 0 0 30px 0 rgba(255,255,255,0.05);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1.in { transition-delay: 0.1s; }
.reveal-delay-2.in { transition-delay: 0.2s; }
.reveal-delay-3.in { transition-delay: 0.3s; }
.reveal-delay-4.in { transition-delay: 0.4s; }
.reveal-delay-5.in { transition-delay: 0.5s; }

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

.section {
  padding: 120px 0;
  border-bottom: 1px solid ${C.border};
}

.section-alt {
  background: ${C.bgElevated};
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${C.white};
  color: ${C.bg};
  border: none;
  border-radius: 40px;
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255,255,255,0.15);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: transparent;
  color: ${C.white};
  border: 1px solid ${C.borderLight};
  border-radius: 40px;
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-secondary:hover {
  border-color: ${C.white};
  background: rgba(255,255,255,0.03);
}

.btn-outline-light {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${C.gray1};
  border: 1px solid ${C.borderLight};
  border-radius: 40px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-outline-light:hover {
  border-color: ${C.white};
  color: ${C.white};
}

.eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${C.gray2};
  margin-bottom: 24px;
}

h1 {
  font-size: clamp(48px, 8vw, 88px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.05;
  margin-bottom: 32px;
  color: ${C.white};
}

h2 {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-bottom: 20px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.3px;
  margin-bottom: 12px;
}

.lead {
  font-size: 18px;
  line-height: 1.6;
  color: ${C.gray1};
  max-width: 560px;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 0;
  }
  h2 {
    letter-spacing: -1px;
  }
  .lead {
    font-size: 16px;
  }
}
`;

/* ============================================================
HOOKS
============================================================ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ============================================================
COMPONENTS
============================================================ */
function Button({ variant = "primary", children, style, href, onClick }) {
  const cls = variant === "primary" ? "btn-primary" : "btn-secondary";
  if (href) return <a className={cls} href={href} style={style}>{children}</a>;
  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 32,
        height: 32,
        background: C.white,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 16,
        color: C.bg,
      }}>
        L
      </div>
      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.5 }}>
        Logi<span style={{ color: C.white }}>Start</span>
      </span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, visible }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 80 }}>
      <div className={`reveal ${visible ? "in" : ""}`}>
        <div className="eyebrow">{eyebrow}</div>
      </div>
      <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
NAVIGATION
============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 48px",
      height: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s",
    }}>
      <Logo />
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="secondary" style={{ padding: "10px 24px" }}>Sign In</Button>
        <Button variant="primary" style={{ padding: "10px 24px" }}>Request Demo</Button>
      </div>
    </nav>
  );
}

/* ============================================================
HERO
============================================================ */
function HeroSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 48px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "80%",
        background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 1 }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">LOGISTICS DECISION INTELLIGENCE</div>
        </div>
        <h1 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
          AI that designs, sources, and negotiates<br />
          your logistics strategy
        </h1>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto 48px", maxWidth: 640 }}>
          Not a dashboard. Not a tool. An autonomous engine that replaces RFQs,
          consulting analysis, and spreadsheet decisions.
        </p>
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button variant="primary">See the Decision Engine →</Button>
          <Button variant="secondary">Watch Demo</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
NEW CATEGORY SECTION
============================================================ */
function NewCategorySection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section section-alt">
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">A NEW CATEGORY</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 800, margin: "0 auto 24px" }}>
          This does not exist today.
        </h2>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto", maxWidth: 640 }}>
          Until now, logistics decisions required weeks of manual analysis,
          multiple RFQs, and expensive consultants. LogiStart replaces all of it
          with a single autonomous engine.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
DECISION OUTPUT CARD
============================================================ */
function DecisionOutputSection() {
  const [ref, visible] = useInView();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(p + 2, 94);
      setProgress(p);
      if (p >= 94) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <section ref={ref} className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Decision Output"
          title="One decision. Fully justified."
          subtitle="No dashboards. No reports. Just the answer your team needs to execute."
          visible={visible}
        />

        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 32,
          padding: "48px",
          transition: "all 0.3s",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: 32 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>RECOMMENDED STRATEGY</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Hybrid Network</h3>
                <p style={{ color: C.gray1 }}>2 Distribution Centers + Cross-dock | FTL + LTL</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Total Cost</div>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>$1.24M</div>
                  <div style={{ fontSize: 12, color: C.green }}>↓ 18% below market</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Selected Supplier</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>TransLog Brasil</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>97.2% on-time rate</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Risk Level</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: C.green }}>Low</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>Operational profile</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Decision Time</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>47 seconds</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>vs 3-6 weeks manual</div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: C.gray2 }}>Confidence Score</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: C.white }}>{progress}/100</span>
                </div>
                <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: C.white, borderRadius: 2 }} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>WHY THIS DECISION</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Best cost-to-service ratio across 4 simulated scenarios",
                    "18% below market benchmark - validated by 3 data sources",
                    "Lowest operational risk among evaluated options",
                    "Supplier with highest composite score (cost + reliability)",
                  ].map((reason, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: C.white }}>✓</span>
                      <span style={{ fontSize: 14, color: C.gray1 }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Button variant="secondary" style={{ flex: 1, padding: "12px" }}>Export PDF</Button>
                  <Button variant="primary" style={{ flex: 1, padding: "12px" }}>Approve Decision</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
CAPABILITIES
============================================================ */
const CAPABILITIES = [
  {
    title: "Real-time Marketplace",
    description: "Live bidding from 500+ qualified suppliers. No RFQs. No emails. Instant quotes.",
    icon: "🏪",
  },
  {
    title: "AI Sourcing",
    description: "Autonomous supplier discovery and evaluation. Ranked by performance, cost, and fit.",
    icon: "🤖",
  },
  {
    title: "Predictive Logistics",
    description: "Detects disruptions before they happen. Volume spikes, capacity crunches, delays.",
    icon: "📊",
  },
  {
    title: "Digital Twin",
    description: "Simulate any strategy before execution. See impact on cost, service, and risk.",
    icon: "🔄",
  },
  {
    title: "AI Negotiation",
    description: "Autonomous price negotiation with suppliers. Achieves market rates without human involvement.",
    icon: "⚡",
  },
  {
    title: "Scenario Generation",
    description: "Network design, new routes, hybrid models. Simulated and compared in minutes.",
    icon: "🎯",
  },
];

function CapabilitiesSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything you need. Nothing you don't."
          visible={visible}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} ${visible ? "in" : ""}`}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                padding: "32px",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.borderLight}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{ fontSize: 36, marginBottom: 20 }}>{cap.icon}</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{cap.title}</h3>
              <p style={{ fontSize: 14, color: C.gray1, lineHeight: 1.6 }}>{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
HOW IT WORKS
============================================================ */
const STEPS = [
  { step: "01", title: "Describe your objective", desc: "Define origin, destination, volume, and strategic priority. Takes 3 minutes." },
  { step: "02", title: "Engine runs simulations", desc: "4-6 scenarios simulated. Suppliers evaluated. Market benchmarks applied." },
  { step: "03", title: "AI negotiates pricing", desc: "Autonomous negotiation with shortlisted suppliers. Best rates secured." },
  { step: "04", title: "Decision delivered", desc: "Executive-ready recommendation with full justification. 47 seconds total." },
];

function HowItWorksSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How It Works"
          title="From problem to decision. In minutes."
          visible={visible}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} ${visible ? "in" : ""}`}
              style={{ textAlign: "center" }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: C.bgCard,
                border: `1px solid ${C.borderLight}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 600,
                margin: "0 auto 20px",
              }}>
                {step.step}
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div style={{
                  display: "none",
                  "@media (minWidth: 768px)": { display: "block" }
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
IMPACT
============================================================ */
const IMPACTS = [
  { metric: "94%", label: "Faster decisions", desc: "From weeks to minutes" },
  { metric: "18%", label: "Cost reduction", desc: "vs traditional procurement" },
  { metric: "100%", label: "RFQ elimination", desc: "No manual sourcing needed" },
  { metric: "0", label: "Spreadsheet errors", desc: "Automated, validated data" },
];

function ImpactSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section section-alt">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className={`reveal ${visible ? "in" : ""}`}>
              <div className="eyebrow">Measurable Impact</div>
            </div>
            <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
              Built for<br />
              <span style={{ color: C.white }}>executive outcomes.</span>
            </h2>
            <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`}>
              Every recommendation is backed by real market data, not assumptions.
              This is what category-defining technology delivers.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {IMPACTS.map((impact, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} ${visible ? "in" : ""}`}
                style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 24,
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 700, color: C.white, marginBottom: 8 }}>{impact.metric}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{impact.label}</div>
                <div style={{ fontSize: 12, color: C.gray2 }}>{impact.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
POSITIONING
============================================================ */
function PositioningSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">Category Definition</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 800, margin: "0 auto 32px" }}>
          Not a TMS. Not an ERP.<br />
          <span style={{ color: C.white }}>An autonomous decision engine.</span>
        </h2>
        <div className={`reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {["Not a dashboard", "Not a report", "Not a consulting project", "A decision engine"].map((label, i) => (
            <span key={i} style={{
              padding: "8px 20px",
              borderRadius: 40,
              background: i === 3 ? C.white : "transparent",
              color: i === 3 ? C.bg : C.gray1,
              border: i === 3 ? "none" : `1px solid ${C.borderLight}`,
              fontSize: 13,
              fontWeight: i === 3 ? 600 : 400,
            }}>
              {label}
            </span>
          ))}
        </div>

        {/* Competitor Comparison */}
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          overflow: "hidden",
          textAlign: "left",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: `1px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.gray2 }}>
            <span>Capability</span>
            <span>TMS</span>
            <span>ERP</span>
            <span>Consultants</span>
            <span>LogiStart</span>
          </div>
          {[
            { cap: "Network simulation", vals: ["❌", "❌", "✓", "✓"] },
            { cap: "Market benchmarks", vals: ["❌", "❌", "✓", "✓"] },
            { cap: "AI sourcing", vals: ["❌", "⚠️", "❌", "✓"] },
            { cap: "AI negotiation", vals: ["❌", "❌", "❌", "✓"] },
            { cap: "Digital twin", vals: ["❌", "❌", "⚠️", "✓"] },
            { cap: "Time to decision", vals: ["Weeks", "Weeks", "Weeks", "Minutes"] },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 24px", borderBottom: i < 5 ? `1px solid ${C.border}` : "none", fontSize: 13 }}>
              <span style={{ color: C.gray1 }}>{row.cap}</span>
              {row.vals.map((val, j) => (
                <span key={j} style={{ color: j === 4 ? C.white : (val === "✓" ? C.green : (val === "⚠️" ? C.gold : C.gray3)) }}>
                  {val}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
FINAL CTA
============================================================ */
function FinalCTASection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section section-alt" style={{ borderBottom: "none" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">Ready to decide differently</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 720, margin: "0 auto 24px" }}>
          Stop analyzing. Start deciding.
        </h2>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto 40px", maxWidth: 480 }}>
          See how LogiStart delivers your first decision in under 48 hours.
        </p>
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button variant="primary">Request Demo →</Button>
          <Button variant="secondary">Contact Sales</Button>
        </div>
        <div className={`reveal reveal-delay-4 ${visible ? "in" : ""}`} style={{ marginTop: 48, display: "flex", gap: 24, justifyContent: "center", fontSize: 12, color: C.gray3 }}>
          <span>✓ No long-term contract</span>
          <span>✓ Setup in 1 day</span>
          <span>✓ Value in first decision</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
FOOTER
============================================================ */
function Footer() {
  return (
    <footer style={{ padding: "48px 48px 32px", borderTop: `1px solid ${C.border}`, background: C.bg }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <Logo />
        <div style={{ display: "flex", gap: 32, fontSize: 13, color: C.gray2 }}>
          <span>Platform</span>
          <span>Capabilities</span>
          <span>Security</span>
          <span>Contact</span>
        </div>
        <div style={{ fontSize: 12, color: C.gray3 }}>
          © 2026 LogiStart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
ROOT
============================================================ */
export default function App() {
  return (
    <div style={{ background: C.bg, color: C.white, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav />
      <main>
        <HeroSection />
        <NewCategorySection />
        <DecisionOutputSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <ImpactSection />
        <PositioningSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
