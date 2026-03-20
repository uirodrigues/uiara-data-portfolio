import { useState, useEffect, useRef } from "react";

/* ============================================================
DESIGN TOKENS - Premium Dark Theme
============================================================ */
const C = {
  bg: "#0A0C10",
  bgDark: "#05070A",
  bgCard: "#0F1117",
  bgElevated: "#13161E",
  border: "#1E222C",
  borderLight: "#2A2F3C",
  gold: "#C9A646",
  goldLight: "#E2C36A",
  goldDim: "rgba(201, 166, 70, 0.1)",
  white: "#FFFFFF",
  gray1: "#E8EDF2",
  gray2: "#9AA2B0",
  gray3: "#5A6270",
  green: "#2ECC71",
  red: "#E74C3C",
  blue: "#4A9EFF",
  purple: "#A855F7",
};

/* ============================================================
GLOBAL CSS - Premium Animations & Styles
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
  background: ${C.bgDark};
}
::-webkit-scrollbar-thumb {
  background: ${C.gold};
  border-radius: 3px;
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(201, 166, 70, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(201, 166, 70, 0.2);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes borderGlow {
  0%, 100% {
    border-color: ${C.borderLight};
  }
  50% {
    border-color: ${C.gold};
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 32px;
  }
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
  background: ${C.bgDark};
}

.section:last-child {
  border-bottom: none;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${C.gold};
  color: ${C.bgDark};
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
  background: ${C.goldLight};
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(201, 166, 70, 0.25);
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
  border-color: ${C.gold};
  color: ${C.gold};
  transform: translateY(-2px);
}

.eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${C.gold};
  margin-bottom: 24px;
  position: relative;
  padding-left: 24px;
}

.eyebrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 2px;
  background: ${C.gold};
}

h1 {
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 32px;
  color: ${C.white};
}

h2 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -1.5px;
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
  color: ${C.gray2};
  max-width: 560px;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 0;
  }
  .lead {
    font-size: 16px;
  }
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1;
  color: ${C.white};
}

.gradient-text {
  background: linear-gradient(135deg, ${C.gold}, ${C.goldLight});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-hover {
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}
.card-hover:hover {
  transform: translateY(-4px);
  border-color: ${C.gold};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

function useTypewriter(words, active) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;

    const word = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) {
          setCurrentWord(word.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
          setTimeout(() => {}, 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentWord(word.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, active]);

  return currentWord;
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
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 40,
        height: 40,
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 20,
        color: C.bgDark,
      }}>
        L
      </div>
      <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
        Logi<span style={{ color: C.gold }}>Start</span>
      </span>
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
      background: scrolled ? "rgba(10, 12, 16, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s",
    }}>
      <Logo />
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="secondary" style={{ padding: "10px 24px" }}>Sign In</Button>
        <Button variant="primary" style={{ padding: "10px 24px" }}>Request Demo →</Button>
      </div>
    </nav>
  );
}

/* ============================================================
HERO SECTION
============================================================ */
function HeroSection() {
  const [ref, visible] = useInView(0.1);
  const typewriterWords = [
    "existing logistics operations",
    "new logistics projects",
    "supplier sourcing",
    "network scenarios",
    "AI negotiation",
  ];
  const typedText = useTypewriter(typewriterWords, visible);

  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "120px 0 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Premium background effects */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 30%, rgba(201, 166, 70, 0.05) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left Side */}
        <div>
          <div className={`reveal ${visible ? "in" : ""}`}>
            <div className="eyebrow">AUTONOMOUS DECISION ENGINE</div>
          </div>
          <h1 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`}>
            AI that designs, sources, and negotiates<br />
            your logistics strategy
          </h1>
          
          <div className={`reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: C.gray1 }}>for</span>
              <span style={{
                fontSize: 20,
                fontWeight: 600,
                color: C.gold,
                minHeight: 48,
                background: C.goldDim,
                padding: "8px 16px",
                borderRadius: 100,
              }}>
                {typedText || " "}
              </span>
              <span style={{ display: "inline-block", width: 3, height: 28, background: C.gold, animation: "blink 1s infinite", marginLeft: 4 }} />
            </div>
          </div>
          
          <p className={`lead reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ marginBottom: 40 }}>
            LogiStart goes beyond route optimization. It creates scenarios, sources suppliers, 
            simulates outcomes, and delivers the best logistics decision automatically.
          </p>
          
          <div className={`reveal reveal-delay-4 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button variant="primary">See a Real Decision →</Button>
            <Button variant="secondary">Run a Strategic Simulation</Button>
          </div>
        </div>

        {/* Right Side - Dashboard Mockup */}
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          animation: visible ? "glowPulse 3s ease-in-out infinite" : "none",
        }}>
          {/* Mockup Header */}
          <div style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${C.border}`,
            background: C.bgElevated,
          }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[C.red, C.gold, C.green].map((color, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
              ))}
            </div>
          </div>
          
          {/* Mockup Content */}
          <div style={{ padding: "28px" }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: C.gray3, marginBottom: 8 }}>SCENARIO COMPARISON</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {["Scenario A", "Scenario B", "Scenario C"].map((scenario, i) => (
                  <div key={i} style={{
                    padding: "12px",
                    background: C.bgDark,
                    borderRadius: 12,
                    border: i === 1 ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{scenario}</div>
                    <div style={{ fontSize: 10, color: C.gray2 }}>Cost: ${i === 1 ? "1.24M" : i === 0 ? "1.42M" : "1.38M"}</div>
                    <div style={{ fontSize: 10, color: C.gray2 }}>Risk: {i === 1 ? "Low" : "Medium"}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24, padding: "16px", background: C.bgDark, borderRadius: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: C.gray3 }}>COST VS MARKET BENCHMARK</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: C.green }}>-18%</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: "82%", height: "100%", background: C.green, borderRadius: 2 }} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: C.gray3, marginBottom: 8 }}>SUPPLIER RANKING</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["TransLog Brasil", "FastMove Log", "Logística Sul"].map((sup, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: C.bgDark, borderRadius: 10 }}>
                    <span style={{ fontSize: 13 }}>{sup}</span>
                    <span style={{ fontSize: 12, color: i === 0 ? C.gold : C.gray2 }}>{i === 0 ? "✓ Recommended" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: "20px",
              background: C.goldDim,
              borderRadius: 16,
              border: `1px solid ${C.gold}`,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 10, color: C.gold, marginBottom: 4 }}>RECOMMENDED STRATEGY</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Hybrid Network (2 DCs + Cross-dock)</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div><span style={{ fontSize: 11, color: C.gray3 }}>Confidence</span><br /><span style={{ fontSize: 16, fontWeight: 600 }}>94/100</span></div>
                <div><span style={{ fontSize: 11, color: C.gray3 }}>Risk</span><br /><span style={{ fontSize: 16, fontWeight: 600, color: C.green }}>Low</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
SECTION: THIS DOES NOT EXIST TODAY
============================================================ */
function NewCategorySection() {
  const [ref, visible] = useInView();

  const features = [
    "generates logistics scenarios",
    "sources suppliers automatically",
    "simulates cost and service",
    "negotiates prices using AI",
    "predicts issues before they happen",
  ];

  return (
    <section ref={ref} className="section section-alt">
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <div className="eyebrow">A NEW CATEGORY</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 900, margin: "0 auto 32px" }}>
          LogiStart is not a logistics tool.
        </h2>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto 48px", maxWidth: 640 }}>
          It is an autonomous decision engine that:
        </p>
        
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              padding: "12px 24px",
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 100,
              fontSize: 14,
              color: C.gray1,
              transition: "all 0.3s",
            }}>
              ✦ {feature}
            </div>
          ))}
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
    title: "Real-time logistics marketplace",
    description: "Live bidding from 500+ qualified suppliers. No RFQs. Instant quotes.",
    icon: "🏪",
    color: C.gold,
  },
  {
    title: "AI sourcing",
    description: "Autonomous supplier discovery and evaluation. Ranked by performance and fit.",
    icon: "🤖",
    color: C.blue,
  },
  {
    title: "Predictive logistics",
    description: "Detects disruptions before they happen. Volume spikes, capacity crunches, delays.",
    icon: "📊",
    color: C.purple,
  },
  {
    title: "Digital twin simulation",
    description: "Simulate any strategy before execution. See impact on cost, service, and risk.",
    icon: "🔄",
    color: C.green,
  },
  {
    title: "AI negotiation",
    description: "Autonomous price negotiation with suppliers. Achieves market rates without human involvement.",
    icon: "⚡",
    color: C.gold,
  },
];

function CapabilitiesSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section">
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
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.gold;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 20 }}>{cap.icon}</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{cap.title}</h3>
              <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
DECISION OUTPUT
============================================================ */
function DecisionOutputSection() {
  const [ref, visible] = useInView();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 2, 94);
      setProgress(p);
      if (p >= 94) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section ref={ref} className="section section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Decision Output"
          title="One decision. Fully justified."
          subtitle="This is not a dashboard. This is the decision your team was trying to reach for weeks."
          visible={visible}
        />

        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{
          background: C.bgCard,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 32,
          overflow: "hidden",
          animation: visible ? "borderGlow 3s ease-in-out infinite" : "none",
        }}>
          <div style={{ padding: "48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              {/* Left */}
              <div>
                <div className="eyebrow" style={{ marginBottom: 16, paddingLeft: 0 }}>RECOMMENDED STRATEGY</div>
                <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>Hybrid Network</h3>
                <p style={{ color: C.gray2, marginBottom: 32 }}>2 DCs + Cross-dock | FTL + LTL | Southeast Region</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray3, marginBottom: 4 }}>Total Cost</div>
                    <div className="stat-number" style={{ fontSize: 40 }}>$1.24M</div>
                    <div style={{ fontSize: 12, color: C.green }}>↓ 18% below market</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray3, marginBottom: 4 }}>Selected Supplier</div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>TransLog Brasil</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>97.2% on-time rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray3, marginBottom: 4 }}>Risk Level</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: C.green }}>Low</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>Operational profile</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: C.gray3, marginBottom: 4 }}>Decision Time</div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>42 seconds</div>
                    <div style={{ fontSize: 12, color: C.gray2 }}>vs 3-6 weeks manual</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: C.gray3 }}>Confidence Score</span>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{progress}/100</span>
                  </div>
                  <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: C.gold, borderRadius: 2 }} />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <div className="eyebrow" style={{ marginBottom: 16, paddingLeft: 0 }}>WHY THIS DECISION</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "Best cost-to-service ratio across 4 simulated scenarios",
                    "18% below market benchmark - validated by 3 data sources",
                    "Lowest operational risk among all evaluated options",
                    "Supplier with highest composite score (cost + reliability)",
                    "Volume sensitivity controlled within ±15% range",
                  ].map((reason, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: C.gold, fontSize: 14 }}>✓</span>
                      <span style={{ fontSize: 14, color: C.gray1, lineHeight: 1.5 }}>{reason}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 32, padding: "20px", background: C.goldDim, borderRadius: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: C.gold, marginBottom: 8 }}>⚡ DECISION READY</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>This is not a dashboard. This is the decision your team was trying to reach for weeks.</div>
                </div>
              </div>
            </div>

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
HOW IT WORKS
============================================================ */
const STEPS = [
  { number: "01", title: "Describe", desc: "Define origin, destination, volume, and priority. Takes 3 minutes." },
  { number: "02", title: "Generate Scenarios", desc: "LogiStart creates multiple network designs and evaluates each." },
  { number: "03", title: "Source Suppliers", desc: "Automatic supplier discovery and qualification. No RFQs." },
  { number: "04", title: "Simulate Outcomes", desc: "Cost, service, and risk modeled before execution." },
  { number: "05", title: "AI Negotiation", desc: "Autonomous price negotiation for best market rates." },
  { number: "06", title: "Decision Delivered", desc: "Executive-ready recommendation. Ready to present." },
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} ${visible ? "in" : ""}`}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "28px",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: C.goldDim,
                border: `1px solid ${C.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 600,
                color: C.gold,
                marginBottom: 20,
              }}>
                {step.number}
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.5 }}>{step.desc}</p>
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
              <span className="gradient-text">executive outcomes.</span>
            </h2>
            <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`}>
              Every recommendation is backed by real market data. This is what category-defining technology delivers.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 24, padding: "32px", textAlign: "center" }}>
              <div className="stat-number" style={{ fontSize: 56 }}>10x</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Faster decisions</div>
              <div style={{ fontSize: 13, color: C.gray2 }}>From weeks to minutes</div>
            </div>
            <div className={`reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 24, padding: "32px", textAlign: "center" }}>
              <div className="stat-number" style={{ fontSize: 56 }}>8-20%</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Cost reduction</div>
              <div style={{ fontSize: 13, color: C.gray2 }}>vs traditional procurement</div>
            </div>
            <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 24, padding: "32px", textAlign: "center" }}>
              <div className="stat-number" style={{ fontSize: 56 }}>91%</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Confidence score</div>
              <div style={{ fontSize: 13, color: C.gray2 }}>Validated by market data</div>
            </div>
            <div className={`reveal reveal-delay-4 ${visible ? "in" : ""}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 24, padding: "32px", textAlign: "center" }}>
              <div className="stat-number" style={{ fontSize: 56 }}>0</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Spreadsheet errors</div>
              <div style={{ fontSize: 13, color: C.gray2 }}>Automated, validated data</div>
            </div>
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
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 900, margin: "0 auto 32px" }}>
          Not a TMS.<br />
          Not an ERP.<br />
          Not a dashboard.
        </h2>
        <div className={`reveal reveal-delay-2 ${visible ? "in" : ""}`}>
          <div style={{
            display: "inline-block",
            padding: "16px 40px",
            background: C.goldDim,
            border: `1px solid ${C.gold}`,
            borderRadius: 100,
            fontSize: 20,
            fontWeight: 600,
            color: C.gold,
          }}>
            → Autonomous Logistics Decision Engine
          </div>
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
          <div className="eyebrow">The Future of Logistics Decisions</div>
        </div>
        <h2 className={`reveal reveal-delay-1 ${visible ? "in" : ""}`} style={{ maxWidth: 800, margin: "0 auto 24px" }}>
          Stop choosing between existing options.<br />
          <span className="gradient-text">Start designing the best one.</span>
        </h2>
        <p className={`lead reveal reveal-delay-2 ${visible ? "in" : ""}`} style={{ margin: "0 auto 40px", maxWidth: 480 }}>
          See how LogiStart delivers your first decision in under 48 hours.
        </p>
        <div className={`reveal reveal-delay-3 ${visible ? "in" : ""}`} style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button variant="primary">Request Demo →</Button>
          <Button variant="secondary">Contact Sales</Button>
        </div>
        <div className={`reveal reveal-delay-4 ${visible ? "in" : ""}`} style={{ marginTop: 64, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", fontSize: 13, color: C.gray3 }}>
          <span>✓ No long-term contract</span>
          <span>✓ Setup in 1 day</span>
          <span>✓ Value in first decision</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
SECTION HEADER HELPER
============================================================ */
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
FOOTER
============================================================ */
function Footer() {
  return (
    <footer style={{ padding: "64px 48px 48px", borderTop: `1px solid ${C.border}`, background: C.bgDark }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <Logo />
        <div style={{ display: "flex", gap: 48, fontSize: 13, color: C.gray2 }}>
          <span style={{ cursor: "pointer" }}>Platform</span>
          <span style={{ cursor: "pointer" }}>Capabilities</span>
          <span style={{ cursor: "pointer" }}>Security</span>
          <span style={{ cursor: "pointer" }}>Contact</span>
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
