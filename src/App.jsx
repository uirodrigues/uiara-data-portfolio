import { useMemo, useState, useEffect, useRef } from "react";

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
GLOBAL CSS INJECTION
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
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 166, 70, 0.4); }
  50% { box-shadow: 0 0 20px 5px rgba(201, 166, 70, 0.2); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
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

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 1024px) {
  .container { padding: 0 32px; }
}
@media (max-width: 768px) {
  .container { padding: 0 24px; }
}

.section {
  padding: 100px 0;
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
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-primary:hover {
  background: ${C.goldLight};
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(201, 166, 70, 0.25);
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
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
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
  margin-bottom: 24px;
}
h2 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-bottom: 24px;
}
h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.lead {
  font-size: 18px;
  line-height: 1.6;
  color: ${C.gray2};
  max-width: 560px;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  color: ${C.white};
}

.gradient-text {
  background: linear-gradient(135deg, ${C.gold}, ${C.goldLight});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-premium {
  background: ${C.bgCard};
  border: 1px solid ${C.border};
  border-radius: 24px;
  transition: all 0.3s ease;
}
.card-premium:hover {
  border-color: ${C.gold};
  transform: translateY(-4px);
}

.input-premium {
  width: 100%;
  background: ${C.bgDark};
  color: ${C.white};
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  outline: none;
}
.input-premium:focus {
  border-color: ${C.gold};
  box-shadow: 0 0 0 2px ${C.goldDim};
}

.select-premium {
  width: 100%;
  background: ${C.bgDark};
  color: ${C.white};
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  outline: none;
}
.select-premium:focus {
  border-color: ${C.gold};
}

.label-premium {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: ${C.gray2};
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: ${C.bgCard};
  border: 1px solid ${C.borderLight};
  border-radius: 32px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: fadeUp 0.4s ease;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: ${C.gray2};
  font-size: 28px;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: ${C.white};
}

/* Loading steps */
.loading-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0;
}
.loading-step {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${C.gray2};
  transition: color 0.3s;
}
.loading-step.active {
  color: ${C.gold};
}
.loading-step.completed {
  color: ${C.green};
}
.loading-step .step-icon {
  width: 20px;
  text-align: center;
}
.progress-bar {
  height: 4px;
  background: ${C.border};
  border-radius: 2px;
  overflow: hidden;
  margin: 24px 0;
}
.progress-fill {
  height: 100%;
  background: ${C.gold};
  transition: width 0.3s linear;
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

function Nav({ onNavigate }) {
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
        <button className="btn-secondary" style={{ padding: "10px 24px" }}>Sign In</button>
        <button className="btn-primary" style={{ padding: "10px 24px" }} onClick={() => onNavigate("assessment")}>
          Request Demo →
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
MAIN APP
============================================================ */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [form, setForm] = useState({
    projectType: "new_project",
    origin: "",
    destination: "",
    volume: "",
    duration: "",
    mode: "hybrid",
    priority: "cost",
    serviceLevel: "standard",
    notes: "",
  });
  const [showInteractiveFlow, setShowInteractiveFlow] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const decision = useMemo(() => generateDecision(form), [form]);

  const metrics = [
    { value: "10x", label: "faster decisions" },
    { value: "18%", label: "avg. cost reduction" },
    { value: "91%", label: "confidence score" },
  ];

  // Telas
  if (screen === "assessment") {
    return <AssessmentScreen form={form} updateField={updateField} setScreen={setScreen} />;
  }

  if (screen === "result") {
    return <ResultScreen decision={decision} form={form} setScreen={setScreen} />;
  }

  return (
    <>
      <HomeScreen
        setScreen={setScreen}
        metrics={metrics}
        openInteractiveFlow={() => setShowInteractiveFlow(true)}
      />
      {showInteractiveFlow && (
        <InteractiveFlowModal onClose={() => setShowInteractiveFlow(false)} />
      )}
    </>
  );
}

/* ============================================================
HOME SCREEN (Premium)
============================================================ */
function HomeScreen({ setScreen, metrics, openInteractiveFlow }) {
  const [heroRef, heroVisible] = useInView(0.1);
  const [categoryRef, categoryVisible] = useInView();
  const [capabilitiesRef, capabilitiesVisible] = useInView();
  const [positioningRef, positioningVisible] = useInView();

  const typewriterWords = [
    "existing logistics operations",
    "new logistics projects",
    "supplier sourcing",
    "network scenarios",
    "AI negotiation",
  ];
  const typedText = useTypewriter(typewriterWords, heroVisible);

  const capabilities = [
    { title: "Real-time logistics marketplace", desc: "Live bidding from 500+ qualified suppliers. No RFQs.", icon: "🏪" },
    { title: "AI sourcing", desc: "Autonomous supplier discovery and evaluation. Ranked by performance.", icon: "🤖" },
    { title: "Predictive logistics", desc: "Detects disruptions before they happen. Volume spikes, delays.", icon: "📊" },
    { title: "Digital twin simulation", desc: "Simulate any strategy before execution. Cost, service, risk.", icon: "🔄" },
    { title: "AI negotiation", desc: "Autonomous price negotiation. Achieves market rates without humans.", icon: "⚡" },
  ];

  return (
    <div style={{ background: C.bg, color: C.white, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav onNavigate={setScreen} />

      {/* HERO SECTION */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(circle at 20% 30%, rgba(201, 166, 70, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left Side */}
          <div>
            <div className={`reveal ${heroVisible ? "in" : ""}`}>
              <div className="eyebrow">AUTONOMOUS DECISION ENGINE</div>
            </div>
            <h1 className={`reveal reveal-delay-1 ${heroVisible ? "in" : ""}`}>
              AI that designs, sources, and negotiates<br />
              your logistics strategy
            </h1>
            
            <div className={`reveal reveal-delay-2 ${heroVisible ? "in" : ""}`} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, color: C.gray1 }}>for</span>
                <span style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: C.gold,
                  background: C.goldDim,
                  padding: "8px 20px",
                  borderRadius: 100,
                }}>
                  {typedText || " "}
                </span>
                <span style={{ display: "inline-block", width: 3, height: 28, background: C.gold, animation: "blink 1s infinite" }} />
              </div>
            </div>
            
            <p className={`lead reveal reveal-delay-3 ${heroVisible ? "in" : ""}`} style={{ marginBottom: 40 }}>
              LogiStart goes beyond route optimization. It creates scenarios, sources suppliers, 
              simulates outcomes, and delivers the best logistics decision automatically.
            </p>
            
            <div className={`reveal reveal-delay-4 ${heroVisible ? "in" : ""}`} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={openInteractiveFlow}>
                See a Real Decision →
              </button>
              <button className="btn-secondary" onClick={() => setScreen("assessment")}>
                Run a Strategic Assessment
              </button>
            </div>

            <div className={`reveal reveal-delay-4 ${heroVisible ? "in" : ""}`} style={{ marginTop: 48, display: "flex", gap: 48, flexWrap: "wrap" }}>
              {metrics.map((item) => (
                <div key={item.label}>
                  <div className="stat-number" style={{ fontSize: 36 }}>{item.value}</div>
                  <div style={{ color: C.gray2, fontSize: 13 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Dashboard Mockup */}
          <div className={`reveal reveal-delay-3 ${heroVisible ? "in" : ""}`} style={{
            background: C.bgCard,
            border: `1px solid ${C.borderLight}`,
            borderRadius: 32,
            overflow: "hidden",
            animation: heroVisible ? "glowPulse 3s ease-in-out infinite" : "none",
          }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, background: C.bgElevated }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.red }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.gold }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.green }} />
              </div>
            </div>
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
                <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
                  <div style={{ width: "82%", height: "100%", background: C.green, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{
                padding: "20px",
                background: C.goldDim,
                borderRadius: 16,
                border: `1px solid ${C.gold}`,
              }}>
                <div style={{ fontSize: 10, color: C.gold, marginBottom: 4 }}>RECOMMENDED STRATEGY</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Hybrid Network (2 DCs + Cross-dock)</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div><span style={{ fontSize: 11, color: C.gray3 }}>Confidence</span><br /><span style={{ fontWeight: 600 }}>94/100</span></div>
                  <div><span style={{ fontSize: 11, color: C.gray3 }}>Risk</span><br /><span style={{ fontWeight: 600, color: C.green }}>Low</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THIS DOES NOT EXIST TODAY */}
      <section ref={categoryRef} className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <div className={`reveal ${categoryVisible ? "in" : ""}`}>
            <div className="eyebrow">A NEW CATEGORY</div>
          </div>
          <h2 className={`reveal reveal-delay-1 ${categoryVisible ? "in" : ""}`} style={{ maxWidth: 800, margin: "0 auto 24px" }}>
            LogiStart is not a logistics tool.
          </h2>
          <p className={`lead reveal reveal-delay-2 ${categoryVisible ? "in" : ""}`} style={{ margin: "0 auto 48px" }}>
            It is an autonomous decision engine that:
          </p>
          <div className={`reveal reveal-delay-3 ${categoryVisible ? "in" : ""}`} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {[
              "generates logistics scenarios",
              "sources suppliers automatically",
              "simulates cost and service",
              "negotiates prices using AI",
              "predicts issues before they happen",
            ].map((item, i) => (
              <div key={i} style={{
                padding: "10px 20px",
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 100,
                fontSize: 13,
                color: C.gray1,
              }}>
                ✦ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section ref={capabilitiesRef} className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className={`reveal ${capabilitiesVisible ? "in" : ""}`}>
              <div className="eyebrow">Capabilities</div>
            </div>
            <h2 className={`reveal reveal-delay-1 ${capabilitiesVisible ? "in" : ""}`}>
              Everything you need. Nothing you don't.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {capabilities.map((cap, i) => (
              <div key={i} className={`card-premium reveal reveal-delay-${(i % 3) + 1} ${capabilitiesVisible ? "in" : ""}`} style={{ padding: "32px" }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{cap.icon}</div>
                <h3>{cap.title}</h3>
                <p style={{ fontSize: 14, color: C.gray2, lineHeight: 1.6 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING SECTION */}
      <section ref={positioningRef} className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <div className={`reveal ${positioningVisible ? "in" : ""}`}>
            <div className="eyebrow">Category Definition</div>
          </div>
          <h2 className={`reveal reveal-delay-1 ${positioningVisible ? "in" : ""}`}>
            Not a TMS.<br />
            Not an ERP.<br />
            Not a dashboard.
          </h2>
          <div className={`reveal reveal-delay-2 ${positioningVisible ? "in" : ""}`} style={{ marginTop: 32 }}>
            <div style={{
              display: "inline-block",
              padding: "16px 40px",
              background: C.goldDim,
              border: `1px solid ${C.gold}`,
              borderRadius: 100,
              fontSize: 18,
              fontWeight: 600,
              color: C.gold,
            }}>
              → Autonomous Logistics Decision Engine
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ borderBottom: "none" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="eyebrow">The Future of Logistics Decisions</div>
          <h2 style={{ maxWidth: 800, margin: "0 auto 24px" }}>
            Stop choosing between existing options.<br />
            <span className="gradient-text">Start designing the best one.</span>
          </h2>
          <p className="lead" style={{ margin: "0 auto 40px" }}>
            See how LogiStart delivers your first decision in under 48 hours.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button className="btn-primary" onClick={openInteractiveFlow}>See a Real Decision →</button>
            <button className="btn-secondary" onClick={() => setScreen("assessment")}>Run a Strategic Assessment</button>
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", fontSize: 13, color: C.gray3 }}>
            <span>✓ No long-term contract</span>
            <span>✓ Setup in 1 day</span>
            <span>✓ Value in first decision</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px", borderTop: `1px solid ${C.border}`, background: C.bgDark }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <Logo />
          <div style={{ display: "flex", gap: 40, fontSize: 13, color: C.gray2 }}>
            <span>Platform</span>
            <span>Capabilities</span>
            <span>Security</span>
            <span>Contact</span>
          </div>
          <div style={{ fontSize: 12, color: C.gray3 }}>© 2026 LogiStart. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
INTERACTIVE FLOW MODAL
============================================================ */
function InteractiveFlowModal({ onClose }) {
  const [step, setStep] = useState("form"); // form, loading, result, email
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    volume: "",
    transportType: "FTL",
    objective: "cost",
  });
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const loadingSteps = [
    "Analyzing logistics problem...",
    "Generating network scenarios...",
    "Benchmarking market rates...",
    "Evaluating suppliers...",
    "Running simulations...",
    "Generating recommendation...",
  ];

  // Mock decision data based on form inputs
  const decision = {
    strategy: "Hybrid Network: 2 DCs + Crossdock",
    costReduction: "-18%",
    leadTime: "-1.4 days",
    serviceLevel: "+7%",
    confidenceScore: 91,
    supplier: {
      name: "XYZ Logistics",
      score: 92,
    },
    reasons: [
      "Best cost vs service balance",
      "Below market benchmark",
      "Lower operational risk",
      "High on-time delivery (97.2%)",
    ],
    scenarios: [
      { name: "Scenario A", desc: "Single DC model", cost: "$1.42M", risk: "Medium", recommended: false },
      { name: "Scenario B", desc: "Hybrid network", cost: "$1.24M", risk: "Low", recommended: true },
      { name: "Scenario C", desc: "Fully distributed", cost: "$1.38M", risk: "Medium", recommended: false },
    ],
  };

  useEffect(() => {
    if (step === "loading") {
      const totalSteps = loadingSteps.length;
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < totalSteps) {
          setCurrentStepIndex(stepIndex + 1);
          setProgress(((stepIndex + 1) / totalSteps) * 100);
          stepIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setStep("result");
          }, 300);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step, loadingSteps.length]);

  useEffect(() => {
    if (step === "result") {
      let val = 0;
      const timer = setInterval(() => {
        if (val < decision.confidenceScore) {
          val += Math.ceil(decision.confidenceScore / 20);
          if (val > decision.confidenceScore) val = decision.confidenceScore;
          setConfidence(val);
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [step, decision.confidenceScore]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setStep("loading");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div style={{ padding: "32px 40px" }}>
          {step === "form" && (
            <>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 8 }}>Quick Decision</div>
              <h2 style={{ fontSize: "28px", marginBottom: 24 }}>Describe your logistics challenge</h2>
              <form onSubmit={handleSubmitForm}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                  <div>
                    <label className="label-premium">Origin</label>
                    <input
                      className="input-premium"
                      value={formData.origin}
                      onChange={(e) => updateForm("origin", e.target.value)}
                      placeholder="e.g. Sao Paulo"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-premium">Destination</label>
                    <input
                      className="input-premium"
                      value={formData.destination}
                      onChange={(e) => updateForm("destination", e.target.value)}
                      placeholder="e.g. Recife"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-premium">Volume (approx.)</label>
                    <input
                      className="input-premium"
                      value={formData.volume}
                      onChange={(e) => updateForm("volume", e.target.value)}
                      placeholder="e.g. 500 pallets/month"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-premium">Transport Type</label>
                    <select className="select-premium" value={formData.transportType} onChange={(e) => updateForm("transportType", e.target.value)}>
                      <option>FTL</option>
                      <option>LTL</option>
                      <option>Warehousing</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-premium">Objective</label>
                    <select className="select-premium" value={formData.objective} onChange={(e) => updateForm("objective", e.target.value)}>
                      <option value="cost">Cost</option>
                      <option value="service">Service</option>
                      <option value="speed">Speed</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn-primary">Run Strategic Assessment →</button>
                </div>
              </form>
            </>
          )}

          {step === "loading" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 24 }}>AI Decision Engine</div>
              <div className="loading-steps">
                {loadingSteps.map((stepText, idx) => (
                  <div
                    key={idx}
                    className={`loading-step ${idx < currentStepIndex ? "completed" : idx === currentStepIndex ? "active" : ""}`}
                  >
                    <span className="step-icon">
                      {idx < currentStepIndex ? "✓" : idx === currentStepIndex ? "●" : "○"}
                    </span>
                    {stepText}
                  </div>
                ))}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {step === "result" && (
            <>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 8 }}>Decision Output</div>
              <h2 style={{ fontSize: "28px", marginBottom: 16 }}>{decision.strategy}</h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3 }}>Cost Reduction</div>
                  <div className="stat-number" style={{ fontSize: 28, color: C.green }}>{decision.costReduction}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3 }}>Lead Time</div>
                  <div className="stat-number" style={{ fontSize: 28 }}>{decision.leadTime}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3 }}>Service Level</div>
                  <div className="stat-number" style={{ fontSize: 28, color: C.green }}>{decision.serviceLevel}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3 }}>Confidence Score</div>
                  <div className="stat-number" style={{ fontSize: 28 }}>{confidence}/100</div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 12 }}>Top Supplier</div>
                <div className="card-premium" style={{ padding: "16px", background: C.goldDim, borderColor: C.gold }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{decision.supplier.name}</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>Score {decision.supplier.score}/100</div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 12 }}>Why This Decision</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {decision.reasons.map((reason, idx) => (
                    <li key={idx} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ color: C.gold }}>✓</span>
                      <span style={{ color: C.gray1 }}>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 12 }}>Scenario Comparison</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {decision.scenarios.map((scenario) => (
                    <div
                      key={scenario.name}
                      className="card-premium"
                      style={{
                        padding: "12px",
                        background: scenario.recommended ? C.goldDim : C.bgDark,
                        borderColor: scenario.recommended ? C.gold : C.border,
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>{scenario.name}</div>
                      <div style={{ fontSize: 12, color: C.gray2 }}>Cost: {scenario.cost}</div>
                      <div style={{ fontSize: 12, color: C.gray2 }}>Risk: {scenario.risk}</div>
                      {scenario.recommended && <div style={{ fontSize: 10, color: C.gold, marginTop: 6 }}>Recommended</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-primary" onClick={() => setStep("email")}>
                  Get Full Report (PDF) →
                </button>
              </div>
            </>
          )}

          {step === "email" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 16 }}>Get Your Strategic Report</div>
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit}>
                  <p style={{ color: C.gray2, marginBottom: 24 }}>
                    Enter your email to receive the full strategic report including scenario analysis and supplier recommendations.
                  </p>
                  <input
                    type="email"
                    className="input-premium"
                    style={{ marginBottom: 20, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div>
                    <button type="submit" className="btn-primary">Send Report →</button>
                  </div>
                </form>
              ) : (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
                  <h3 style={{ fontSize: 24, marginBottom: 12 }}>Report sent!</h3>
                  <p style={{ color: C.gray2, marginBottom: 24 }}>
                    We've sent the strategic report to <strong>{email}</strong>. Check your inbox.
                  </p>
                  <button className="btn-secondary" onClick={onClose}>Close</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
ASSESSMENT SCREEN (Premium)
============================================================ */
function AssessmentScreen({ form, updateField, setScreen }) {
  const [ref, visible] = useInView();

  return (
    <div style={{ background: C.bg, color: C.white, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav onNavigate={setScreen} />
      
      <section style={{ padding: "120px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 20 }}>
            <button className="btn-secondary" style={{ padding: "10px 24px" }} onClick={() => setScreen("home")}>
              ← Back to Home
            </button>
          </div>

          <div style={{ maxWidth: 900, marginBottom: 48 }}>
            <div className="eyebrow">Strategic Assessment</div>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 68px)", lineHeight: 1, margin: 0 }}>
              Describe your logistics challenge
            </h1>
            <p className="lead" style={{ marginTop: 24 }}>
              Enter the operational context and let LogiStart generate scenarios,
              benchmark the market, and recommend the best decision.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32, alignItems: "start" }}>
            {/* Form Card */}
            <div className="card-premium" style={{ padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label className="label-premium">Project Type</label>
                  <select className="select-premium" value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)}>
                    <option value="existing_operation">Existing operation</option>
                    <option value="new_project">New project</option>
                  </select>
                </div>
                <div>
                  <label className="label-premium">Mode</label>
                  <select className="select-premium" value={form.mode} onChange={(e) => updateField("mode", e.target.value)}>
                    <option value="road">Road</option>
                    <option value="ocean">Ocean</option>
                    <option value="air">Air</option>
                    <option value="warehousing">Warehousing</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="label-premium">Origin</label>
                  <input className="input-premium" value={form.origin} onChange={(e) => updateField("origin", e.target.value)} placeholder="e.g. Sao Paulo" />
                </div>
                <div>
                  <label className="label-premium">Destination</label>
                  <input className="input-premium" value={form.destination} onChange={(e) => updateField("destination", e.target.value)} placeholder="e.g. Recife" />
                </div>
                <div>
                  <label className="label-premium">Volume</label>
                  <input className="input-premium" value={form.volume} onChange={(e) => updateField("volume", e.target.value)} placeholder="e.g. 3000 pallets" />
                </div>
                <div>
                  <label className="label-premium">Duration</label>
                  <input className="input-premium" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="e.g. 6 months" />
                </div>
                <div>
                  <label className="label-premium">Priority</label>
                  <select className="select-premium" value={form.priority} onChange={(e) => updateField("priority", e.target.value)}>
                    <option value="cost">Cost</option>
                    <option value="speed">Speed</option>
                    <option value="resilience">Resilience</option>
                  </select>
                </div>
                <div>
                  <label className="label-premium">Service Level</label>
                  <select className="select-premium" value={form.serviceLevel} onChange={(e) => updateField("serviceLevel", e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <label className="label-premium">Additional Notes</label>
                <textarea className="input-premium" style={{ minHeight: "100px", resize: "vertical" }} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Describe the challenge, constraints, or goals" />
              </div>

              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => setScreen("result")}>Generate Decision →</button>
                <button className="btn-secondary" onClick={() => {
                  updateField("projectType", "new_project");
                  updateField("origin", "");
                  updateField("destination", "");
                  updateField("volume", "");
                  updateField("duration", "");
                  updateField("mode", "hybrid");
                  updateField("priority", "cost");
                  updateField("serviceLevel", "standard");
                  updateField("notes", "");
                }}>Reset</button>
              </div>
            </div>

            {/* Info Card */}
            <div className="card-premium" style={{ padding: "32px" }}>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 16 }}>What this MVP does</div>
              <h3 style={{ fontSize: 24, marginBottom: 16 }}>Decision preview</h3>
              <p style={{ color: C.gray2, marginBottom: 24, lineHeight: 1.6 }}>
                This version simulates a strategic recommendation based on your inputs and shows:
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {["Recommended strategy", "Scenario comparison", "Estimated cost outlook", "Market benchmark", "Risk level", "Confidence score"].map((item) => (
                  <div key={item} style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: C.bgDark,
                    border: `1px solid ${C.border}`,
                    color: C.gray1,
                    fontSize: 13,
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
RESULT SCREEN (Premium)
============================================================ */
function ResultScreen({ decision, form, setScreen }) {
  const [ref, visible] = useInView();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const conf = parseInt(decision.confidence);
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 2, conf);
      setProgress(p);
      if (p >= conf) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [visible, decision.confidence]);

  function labelProjectType(value) {
    return value === "existing_operation" ? "Existing operation" : "New project";
  }

  function capitalize(value) {
    if (!value) return "-";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return (
    <div style={{ background: C.bg, color: C.white, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav onNavigate={setScreen} />
      
      <section ref={ref} style={{ padding: "120px 0 80px" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button className="btn-secondary" style={{ padding: "10px 24px" }} onClick={() => setScreen("home")}>
              ← Back to Home
            </button>
            <button className="btn-secondary" style={{ padding: "10px 24px" }} onClick={() => setScreen("assessment")}>
              Edit Assessment
            </button>
          </div>

          <div style={{ maxWidth: 920, marginBottom: 48 }}>
            <div className="eyebrow">Decision Output</div>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 68px)", lineHeight: 1, margin: 0 }}>
              Strategic recommendation generated
            </h1>
            <p className="lead" style={{ marginTop: 24 }}>
              This is not a dashboard. This is the decision your team was trying to reach for weeks.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32, alignItems: "start" }}>
            {/* Decision Card */}
            <div className="card-premium" style={{ padding: "32px", animation: visible ? "glowPulse 3s ease-in-out infinite" : "none" }}>
              <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 24, marginBottom: 24 }}>
                <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 12 }}>RECOMMENDED STRATEGY</div>
                <h2 style={{ fontSize: 28, color: C.gold, marginBottom: 12 }}>{decision.strategy}</h2>
                <p style={{ color: C.gray2, lineHeight: 1.6 }}>{decision.summary}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3, marginBottom: 8 }}>Estimated Annual Cost</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{decision.cost}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3, marginBottom: 8 }}>vs Market Benchmark</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: C.green }}>{decision.benchmark}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3, marginBottom: 8 }}>Risk Level</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: decision.risk === "Low" ? C.green : C.gold }}>{decision.risk}</div>
                </div>
                <div className="card-premium" style={{ padding: "16px", background: C.bgDark }}>
                  <div style={{ fontSize: 11, color: C.gray3, marginBottom: 8 }}>Confidence Score</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{progress}/100</div>
                </div>
              </div>

              <div>
                <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 16 }}>Scenario Comparison</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {decision.scenarios.map((scenario) => (
                    <div key={scenario.name} style={{
                      padding: "18px",
                      borderRadius: 16,
                      border: scenario.recommended ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
                      background: scenario.recommended ? C.goldDim : C.bgDark,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <strong style={{ fontSize: 16 }}>{scenario.name}</strong>
                        {scenario.recommended && <span style={{ color: C.gold, fontSize: 12, fontWeight: 600 }}>✓ Recommended</span>}
                      </div>
                      <div style={{ fontSize: 13, color: C.gray2 }}>{scenario.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1 }}>Export Decision PDF</button>
                <button className="btn-secondary" style={{ flex: 1 }}>Book Executive Demo</button>
              </div>
            </div>

            {/* Summary Card */}
            <div className="card-premium" style={{ padding: "32px" }}>
              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 16 }}>Input Summary</div>
              <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Project Type</span>
                  <strong>{labelProjectType(form.projectType)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Origin</span>
                  <strong>{form.origin || "-"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Destination</span>
                  <strong>{form.destination || "-"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Volume</span>
                  <strong>{form.volume || "-"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Duration</span>
                  <strong>{form.duration || "-"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Mode</span>
                  <strong>{capitalize(form.mode)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.gray2 }}>Priority</span>
                  <strong>{capitalize(form.priority)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: C.gray2 }}>Service Level</span>
                  <strong>{capitalize(form.serviceLevel)}</strong>
                </div>
              </div>

              <div className="eyebrow" style={{ paddingLeft: 0, marginBottom: 12 }}>Next Step</div>
              <p style={{ color: C.gray1, lineHeight: 1.6, marginBottom: 24 }}>{decision.nextStep}</p>

              <div style={{
                padding: "20px",
                background: C.goldDim,
                borderRadius: 16,
                border: `1px solid ${C.gold}`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 12, color: C.gold, marginBottom: 8 }}>⚡ READY FOR EXECUTION</div>
                <div style={{ fontSize: 13, color: C.gray2 }}>This decision is ready to present to your board.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
DECISION LOGIC (mantida do seu código)
============================================================ */
function generateDecision(form) {
  const isNewProject = form.projectType === "new_project";
  const isHybrid = form.mode === "hybrid";
  const isWarehousing = form.mode === "warehousing";
  const isSpeed = form.priority === "speed";
  const isResilience = form.priority === "resilience";
  const isCritical = form.serviceLevel === "critical";
  const volumeText = (form.volume || "").toLowerCase();

  const largeVolume =
    volumeText.includes("3000") ||
    volumeText.includes("3.000") ||
    volumeText.includes("high") ||
    volumeText.includes("large") ||
    volumeText.includes("pallet");

  let strategy = "Hybrid network with 2 DCs + cross-dock";
  let summary = "Recommended for balancing cost, service level, and expansion flexibility across the network.";
  let cost = "$1.2M";
  let benchmark = "-18% vs market";
  let risk = "Low";
  let confidence = "91/100";
  let nextStep = "Launch supplier outreach for the recommended model and validate service assumptions with shortlisted operators.";

  if (isWarehousing) {
    strategy = "3PL warehousing model with flexible overflow capacity";
    summary = "Recommended to secure storage capacity quickly while preserving flexibility and reducing fixed exposure.";
    cost = "$890k";
    benchmark = "-12% vs market";
    risk = "Medium-Low";
    confidence = "88/100";
    nextStep = "Validate capacity availability, service SLAs, and implementation timeline with top-ranked 3PL operators.";
  }

  if (isNewProject && isHybrid) {
    strategy = "Hybrid launch network with regional DC + cross-dock support";
    summary = "Recommended for new project ramp-up where flexibility, supplier optionality, and phased scale matter most.";
    cost = "$1.35M";
    benchmark = "-15% vs market";
    risk = "Low";
    confidence = "92/100";
    nextStep = "Run a pilot sourcing round for the hybrid design and validate launch timing, ramp curve, and regional service targets.";
  }

  if (isSpeed || isCritical) {
    strategy = "Multi-node fast-response network";
    summary = "Recommended for higher service urgency, prioritizing lead time reduction and continuity over lowest cost.";
    cost = "$1.48M";
    benchmark = "-6% vs market";
    risk = "Medium";
    confidence = "86/100";
    nextStep = "Confirm lead-time assumptions, premium service requirements, and backup capacity across shortlisted partners.";
  }

  if (isResilience) {
    strategy = "Dual-sourcing network with regional redundancy";
    summary = "Recommended to reduce dependency risk and improve continuity through diversified provider and node design.";
    cost = "$1.41M";
    benchmark = "-9% vs market";
    risk = "Low";
    confidence = "89/100";
    nextStep = "Validate dual-sourcing economics and negotiate redundancy clauses with primary and secondary operators.";
  }

  if (largeVolume && isNewProject) {
    strategy = "Scaled hybrid network with 2 DCs, overflow warehousing, and cross-dock";
    summary = "Recommended for large-scale project launch requiring capacity flexibility, network balance, and faster implementation.";
    cost = "$1.62M";
    benchmark = "-18% vs market";
    risk = "Low";
    confidence = "93/100";
    nextStep = "Initiate strategic bid across warehousing and transport providers and validate phased capacity expansion.";
  }

  const scenarios = [
    {
      name: "Scenario A - Single DC model",
      text: "Lowest structural complexity, but weaker regional service responsiveness and higher concentration risk.",
      recommended: false,
    },
    {
      name: "Scenario B - Hybrid network",
      text: "Best balance of cost, service, implementation speed, and provider optionality across the network.",
      recommended: true,
    },
    {
      name: "Scenario C - Fully distributed model",
      text: "Higher service potential but increased fixed cost and coordination complexity across nodes.",
      recommended: false,
    },
  ];

  if (strategy.toLowerCase().includes("dual-sourcing")) {
    scenarios[1].recommended = false;
    scenarios[2].recommended = true;
    scenarios[2].name = "Scenario C - Dual-sourcing resilient network";
    scenarios[2].text = "Best fit for resilience priority with diversified providers and stronger business continuity.";
  }

  if (isWarehousing) {
    scenarios[0].name = "Scenario A - Single 3PL warehouse";
    scenarios[1].name = "Scenario B - Flexible core + overflow";
    scenarios[2].name = "Scenario C - Multi-warehouse model";
    scenarios[1].text = "Best balance of storage flexibility, cost control, and scalability during demand variation.";
  }

  return { strategy, summary, cost, benchmark, risk, confidence, nextStep, scenarios };
}