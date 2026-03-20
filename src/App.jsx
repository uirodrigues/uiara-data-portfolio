import { useState, useEffect, useRef } from "react";

/* ============================================================
DESIGN TOKENS - Ultra Premium Dark Theme
============================================================ */
const C = {
  bg:       "#000000",
  bgElevated: "#050505",
  bgCard:   "#0A0A0A",
  border:   "#141414",
  borderLight: "#1F1F1F",
  accent:   "#FFFFFF",
  accentMuted: "#E5E5E5",
  gold:     "#F5A623",
  goldDim:  "rgba(245,166,35,0.08)",
  white:    "#FFFFFF",
  gray1:    "#D4D4D4",
  gray2:    "#737373",
  gray3:    "#404040",
  green:    "#10B981",
  red:      "#EF4444",
  blue:     "#3B82F6",
  purple:   "#8B5CF6",
};

/* ============================================================
GLOBAL CSS - Premium Animations
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
  width: 4px;
}
::-webkit-scrollbar-track {
  background: ${C.bg};
}
::-webkit-scrollbar-thumb {
  background: ${C.gray3};
  border-radius: 4px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
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
  padding: 140px 0;
  border-bottom: 1px solid ${C.border};
}

.section-alt {
  background: ${C.bgElevated};
}

.section:last-child {
  border-bottom: none;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${C.white};
  color: ${C.bg};
  border: none;
  border-radius: 100px;
  padding: 16px 36px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(255,255,255,0.15);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: transparent;
  color: ${C.white};
  border: 1px solid ${C.borderLight};
  border-radius: 100px;
  padding: 16px 36px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  text-decoration: none;
}

.btn-secondary:hover {
  border-color: ${C.white};
  background: rgba(255,255,255,0.03);
  transform: translateY(-2px);
}

.eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${C.gray2};
  margin-bottom: 24px;
}

h1 {
  font-size: clamp(56px, 9vw, 96px);
  font-weight: 700;
  letter-spacing: -3px;
  line-height: 1.05;
  margin-bottom: 32px;
  color: ${C.white};
}

h2 {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 24px;
}

h3 {
  font-size: 22px;
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
    padding: 100px 0;
  }
  h1 {
    letter-spacing: -2px;
  }
  h2 {
    letter-spacing: -1.5px;
  }
  .lead {
    font-size: 16px;
  }
}

.stat-number {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1;
  color: ${C.white};
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${C.borderLight}, transparent);
  margin: 80px 0;
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
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 36,
        height: 36,
        background: C.white,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 18,
        color: C.bg,
      }}>
        L
      </div>
      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.5 }}>
        Logi<span style={{ fontWeight: 700 }}>Start</span>
      </span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, visible, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: center ? 80 : 48 }}>
      <div className={`reveal ${visible ? "in" : ""}`}>
        <div className="eyebrow">{eyebrow}</div>
      </div>
      <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: center ? "0 auto" : 0, maxWidth: center ? 640 : "none" }}>
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
      height: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    }}>
      <Logo />
      <div style={{ display: "flex", gap: 16 }}>
        <Button variant="secondary" style={{ padding: "12px 28px" }}>Sign In</Button>
        <Button variant="primary" style={{ padding: "12px 28px" }}>Request Demo →</Button>
      </div>
    </nav>
  );
}

/* ============================================================
HERO - Bold Statement
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
      {/* Premium background effects */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      
      <div style={{ textAlign: "center", maxWidth: 1000, position: "relative", zIndex: 1 }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">AUTONOMOUS LOGISTICS DECISION ENGINE</div>
        </div>
        <h1 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
          Replace weeks of analysis<br />
          with <span style={{ color: C.white }}>47 seconds</span> of intelligence.
        </h1>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto 48px", maxWidth: 640 }}>
          No RFQs. No consultants. No spreadsheets. Just the decision your team needs to execute.
        </p>
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <Button variant="primary">See the Decision Engine →</Button>
          <Button variant="secondary">Watch Demo</Button>
        </div>
        
        {/* Social proof */}
        <div className={`reveal reveal-delay-4 ${visible ? "in" : ""}`} style={{ marginTop: 80, display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { value: "94%", label: "faster decisions" },
            { value: "18%", label: "cost reduction" },
            { value: "0", label: "manual RFQs" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: C.gray2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
NEW CATEGORY - Bold Statement
============================================================ */
function NewCategorySection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section section-alt">
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">THE CATEGORY DIDN'T EXIST</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 900, margin: "0 auto 32px" }}>
          Until now, logistics decisions required<br />
          <span style={{ color: C.white }}>weeks, consultants, and spreadsheets.</span>
        </h2>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto", maxWidth: 640 }}>
          LogiStart is the first autonomous decision engine built specifically for logistics strategy.
          Not a tool. Not a dashboard. An AI that thinks, sources, and negotiates.
        </p>
        
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ marginTop: 64, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {["Manual RFQs", "Consulting Analysis", "Spreadsheet Decisions"].map((old, i) => (
            <div key={i} style={{ 
              padding: "12px 24px", 
              background: C.bgCard, 
              border: `1px solid ${C.border}`,
              borderRadius: 100,
              fontSize: 13,
              color: C.gray2,
              textDecoration: "line-through",
            }}>
              {old}
            </div>
          ))}
          <div style={{ 
            padding: "12px 24px", 
            background: C.white, 
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            color: C.bg,
          }}>
            Autonomous Decision
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
DECISION OUTPUT - Visual Card
============================================================ */
function DecisionOutputSection() {
  const [ref, visible] = useInView();
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let p = 0;
    let t = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 2, 94);
      t = Math.min(t + 2, 47);
      setProgress(p);
      setTime(t);
      if (p >= 94 && t >= 47) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section ref={ref} className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Decision Output"
          title="One decision. Fully justified."
          subtitle="This is what LogiStart delivers. Not a dashboard. Not a report. The answer."
          visible={visible}
        />

        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 32,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "24px 32px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "glowPulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: C.gray2 }}>Generated in real-time</span>
            </div>
            <div style={{ fontSize: 12, color: C.gray2 }}>
              {time} seconds • 4 scenarios • 3 quotes
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              {/* Left */}
              <div>
                <div className="eyebrow" style={{ marginBottom: 16 }}>RECOMMENDED STRATEGY</div>
                <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>Hybrid Network</h3>
                <p style={{ color: C.gray1, marginBottom: 32 }}>2 DCs + Cross-dock | FTL + LTL | Southeast Region</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Total Cost</div>
                    <div className="stat-number" style={{ fontSize: 40 }}>$1.24M</div>
                    <div style={{ fontSize: 12, color: C.green }}>↓ 18% vs market</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Selected Supplier</div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>TransLog Brasil</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>97.2% on-time</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Risk Level</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: C.green }}>Low</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>Operational profile</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray2, marginBottom: 4 }}>Decision Time</div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>{time} seconds</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>vs 3-6 weeks manual</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: C.gray2 }}>Confidence Score</span>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{progress}/100</span>
                  </div>
                  <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: C.white, borderRadius: 2 }} />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <div className="eyebrow" style={{ marginBottom: 16 }}>WHY THIS DECISION</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "Best cost-to-service ratio across 4 simulated scenarios",
                    "18% below market benchmark - validated by 3 data sources",
                    "Lowest operational risk among all evaluated options",
                    "Supplier with highest composite score (cost + reliability + capacity)",
                    "Volume sensitivity controlled within ±15% range",
                  ].map((reason, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: C.white, fontSize: 14 }}>✓</span>
                      <span style={{ fontSize: 14, color: C.gray1, lineHeight: 1.5 }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}`, display: "flex", gap: 16, justifyContent: "flex-end" }}>
              <Button variant="secondary" style={{ padding: "12px 28px" }}>Export PDF</Button>
              <Button variant="primary" style={{ padding: "12px 28px" }}>Approve Decision →</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
CAPABILITIES - Premium Grid
============================================================ */
const CAPABILITIES = [
  {
    title: "Real-time Marketplace",
    description: "500+ qualified suppliers bidding live. No RFQs. No emails. Instant quotes.",
    icon: "⚡",
  },
  {
    title: "AI Sourcing",
    description: "Autonomous supplier discovery. Ranked by performance, cost, and strategic fit.",
    icon: "🎯",
  },
  {
    title: "Predictive Logistics",
    description: "Detects disruptions before they happen. Volume spikes, capacity crunches, delays.",
    icon: "📈",
  },
  {
    title: "Digital Twin",
    description: "Simulate any strategy before execution. See impact on cost, service, and risk.",
    icon: "🔄",
  },
  {
    title: "AI Negotiation",
    description: "Autonomous price negotiation. Achieves market rates without human involvement.",
    icon: "🤖",
  },
  {
    title: "Scenario Engine",
    description: "Network design, new routes, hybrid models. Simulated and compared in minutes.",
    icon: "🎲",
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} ${visible ? "in" : ""}`}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                padding: "36px",
                transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.borderLight;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 24 }}>{cap.icon}</div>
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
HOW IT WORKS - Flow
============================================================ */
const STEPS = [
  { number: "01", title: "Describe", desc: "Define origin, destination, volume, and priority. Takes 3 minutes." },
  { number: "02", title: "Simulate", desc: "4-6 scenarios simulated. Suppliers evaluated. Market benchmarks applied." },
  { number: "03", title: "Negotiate", desc: "AI autonomously negotiates with shortlisted suppliers for best rates." },
  { number: "04", title: "Decide", desc: "Executive-ready recommendation delivered. Ready to present to board." },
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} ${visible ? "in" : ""}`}
              style={{ textAlign: "center" }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: C.bgCard,
                border: `1px solid ${C.borderLight}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 600,
                margin: "0 auto 24px",
                color: C.white,
              }}>
                {step.number}
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div style={{
                  display: "none",
                  "@media (min-width: 768px)": { display: "block" }
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
IMPACT - Numbers
============================================================ */
const IMPACTS = [
  { metric: "94%", label: "Faster Decisions", desc: "From 3-6 weeks to minutes" },
  { metric: "18%", label: "Cost Reduction", desc: "vs traditional procurement" },
  { metric: "100%", label: "RFQ Elimination", desc: "No manual sourcing needed" },
  { metric: "0", label: "Spreadsheet Errors", desc: "Automated, validated data" },
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
              Every recommendation is backed by real market data. This is what category-defining technology delivers.
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
                  padding: "32px",
                }}
              >
                <div className="stat-number" style={{ fontSize: 48, marginBottom: 12 }}>{impact.metric}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{impact.label}</div>
                <div style={{ fontSize: 13, color: C.gray2 }}>{impact.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
POSITIONING - Category Definition
============================================================ */
function PositioningSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">Category Definition</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 900, margin: "0 auto 32px" }}>
          Not a TMS. Not an ERP.<br />
          <span style={{ color: C.white }}>An autonomous decision engine.</span>
        </h2>
        
        <div className={`reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          {["Not a dashboard", "Not a report", "Not a consulting project", "A decision engine"].map((label, i) => (
            <span key={i} style={{
              padding: "10px 24px",
              borderRadius: 100,
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

        {/* Premium Comparison Table */}
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          overflow: "hidden",
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", 
            padding: "20px 28px", 
            borderBottom: `1px solid ${C.border}`,
            fontSize: 12,
            fontWeight: 600,
            color: C.gray2,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            <span>Capability</span>
            <span>TMS</span>
            <span>ERP</span>
            <span>Consultants</span>
            <span style={{ color: C.white }}>LogiStart</span>
          </div>
          {[
            { cap: "Network simulation", vals: ["✗", "✗", "✓", "✓"] },
            { cap: "Market benchmarks", vals: ["✗", "✗", "✓", "✓"] },
            { cap: "AI sourcing", vals: ["✗", "⚠", "✗", "✓"] },
            { cap: "AI negotiation", vals: ["✗", "✗", "✗", "✓"] },
            { cap: "Digital twin", vals: ["✗", "✗", "⚠", "✓"] },
            { cap: "Time to decision", vals: ["Weeks", "Weeks", "Weeks", "Minutes"] },
          ].map((row, i) => (
            <div key={i} style={{ 
              display: "grid", 
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", 
              padding: "16px 28px", 
              borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
              fontSize: 13,
            }}>
              <span style={{ color: C.gray1 }}>{row.cap}</span>
              {row.vals.map((val, j) => (
                <span key={j} style={{ 
                  color: j === 4 ? C.white : (val === "✓" ? C.green : (val === "⚠" ? C.gold : C.gray3)),
                  fontWeight: j === 4 ? 600 : 400,
                }}>
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
          <div className="eyebrow">
