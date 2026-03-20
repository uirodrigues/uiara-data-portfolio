import { useState, useEffect, useRef } from "react";

/* ============================================================
DESIGN TOKENS
============================================================ */
const C = {
  bg:      "#060A0F",
  bg1:     "#0A1018",
  bg2:     "#0E1520",
  card:    "#0C1119",
  border:  "#141E2C",
  border2: "#1C2A3A",
  gold:    "#C8A951",
  goldLt:  "#E2C36A",
  goldDim: "rgba(200,169,81,0.10)",
  white:   "#F2F6FF",
  gray1:   "#8B9AAE",
  gray2:   "#4A5568",
  green:   "#2ECC71",
  red:     "#E74C3C",
  amber:   "#E67E22",
  blue:    "#4A9EFF",
  purple:  "#A855F7",
};

/* ============================================================
GLOBAL CSS  (module-level constant - injected once)
============================================================ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=DM+Serif+Display:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { -webkit-font-smoothing: antialiased; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: ${C.bg}; }
::-webkit-scrollbar-thumb { background: ${C.border2}; border-radius: 4px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse    { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes scanline { from { top: -100%; } to { top: 200%; } }
@keyframes blink    { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes float    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes borderGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200,169,81,0); }
  50%      { box-shadow: 0 0 28px 6px rgba(200,169,81,0.10); }
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.in  { opacity: 1; transform: translateY(0); }
.reveal-d1.in { transition-delay: 0.10s; }
.reveal-d2.in { transition-delay: 0.20s; }
.reveal-d3.in { transition-delay: 0.30s; }
.reveal-d4.in { transition-delay: 0.40s; }
.reveal-d5.in { transition-delay: 0.50s; }

.btn-gold {
  display: inline-flex; align-items: center; gap: 8px;
  background: ${C.gold}; color: #050810; border: none; border-radius: 6px;
  padding: 13px 26px; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.3px;
  transition: all 0.2s; text-decoration: none; white-space: nowrap;
}
.btn-gold:hover {
  background: ${C.goldLt};
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200,169,81,0.25);
}

.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: ${C.white}; border: 1px solid ${C.border2};
  border-radius: 6px; padding: 12px 24px; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 500; cursor: pointer; letter-spacing: 0.3px;
  transition: all 0.2s; text-decoration: none; white-space: nowrap;
}
.btn-ghost:hover { border-color: ${C.gold}; color: ${C.gold}; }

.engine-card {
  border: 1px solid ${C.border}; border-radius: 12px;
  padding: 28px 24px; transition: all 0.25s; background: ${C.card};
}
.engine-card:hover {
  border-color: rgba(200,169,81,0.3);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,169,81,0.08);
}

.impact-card {
  border: 1px solid ${C.border}; border-radius: 12px;
  padding: 32px 28px; transition: border-color 0.25s;
  background: ${C.card}; position: relative; overflow: hidden;
}
.impact-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at 0% 100%, rgba(200,169,81,0.04) 0%, transparent 60%);
}
.impact-card:hover { border-color: rgba(200,169,81,0.25); }

.logo-pill {
  display: flex; align-items: center; justify-content: center;
  border: 1px solid ${C.border2}; border-radius: 8px;
  padding: 14px 24px; font-size: 13px; font-weight: 600; color: ${C.gray2};
  letter-spacing: 0.5px; transition: color 0.2s; background: ${C.card};
}
.logo-pill:hover { color: ${C.gray1}; }

.step-card {
  position: relative; padding: 28px 24px;
  border: 1px solid ${C.border}; border-radius: 12px;
  background: ${C.card}; transition: border-color 0.25s;
}
.step-card:hover { border-color: rgba(200,169,81,0.2); }

.nav-link {
  font-size: 13.5px; font-weight: 500; color: ${C.gray1};
  text-decoration: none; transition: color 0.18s; cursor: pointer;
}
.nav-link:hover { color: ${C.white}; }

.decision-card { position: relative; overflow: hidden; }
.decision-card::after {
  content: ''; position: absolute; left: 0; right: 0; height: 60px;
  background: linear-gradient(transparent, rgba(200,169,81,0.04), transparent);
  animation: scanline 4s linear infinite; pointer-events: none;
}

.mobile-menu {
  display: none;
  position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
  background: rgba(6,10,15,0.97); backdrop-filter: blur(20px);
  border-bottom: 1px solid ${C.border};
  padding: 20px 24px 28px;
  flex-direction: column; gap: 0;
}
.mobile-menu.open { display: flex; }
.mobile-menu-link {
  padding: 14px 0; font-size: 16px; font-weight: 500; color: ${C.gray1};
  border-bottom: 1px solid ${C.border}; cursor: pointer; transition: color 0.18s;
}
.mobile-menu-link:hover { color: ${C.white}; }
.mobile-menu-link:last-child { border-bottom: none; }

@media (max-width: 1024px) {
  .decision-grid { grid-template-columns: 1fr !important; }
  .impact-grid   { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
  .footer-grid   { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
  .comp-table-wrap { overflow-x: auto; }
}

@media (max-width: 768px) {
  .nav-links-desktop { display: none !important; }
  .nav-cta-desktop   { display: none !important; }
  .hamburger-btn     { display: flex !important; }
  .steps-grid        { grid-template-columns: 1fr !important; }
  .connector-line    { display: none !important; }
  .engines-grid      { grid-template-columns: 1fr !important; }
  .testimonials-grid { grid-template-columns: 1fr !important; }
  .impact-grid       { grid-template-columns: 1fr !important; }
  .hero-stats        { gap: 16px !important; }
  .section-pad       { padding: 72px 20px !important; }
  .hero-pad          { padding: 100px 20px 72px !important; }
  .footer-grid       { grid-template-columns: 1fr !important; }
}

@media (max-width: 480px) {
  .cta-row { flex-direction: column !important; align-items: stretch !important; }
  .cta-row a, .cta-row button { text-align: center !important; justify-content: center !important; }
  .trust-row { flex-direction: column !important; align-items: center !important; gap: 10px !important; }
  .decision-kpi-grid { grid-template-columns: 1fr 1fr !important; }
}
`;

/* ============================================================
HOOKS
============================================================ */
function useInView(threshold = 0.12) {
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
  const [wIdx, setWIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [charIdx, setCharIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;
    const word = words[wIdx];
    let timeout;

    if (phase === "typing") {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
      } else {
        timeout = setTimeout(() => setPhase("erasing"), 1800);
      }
    } else {
      // erasing
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(c => c - 1), 30);
      } else {
        setWIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    setTyped(words[wIdx].slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, phase, wIdx, active, words]);

  return typed;
}

/* ============================================================
SHARED COMPONENTS
============================================================ */

function EyebrowLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <div style={{ width: 20, height: 1, background: C.gold }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.8px", color: C.gold, textTransform: "uppercase" }}>
        {text}
      </span>
      <div style={{ width: 20, height: 1, background: C.gold }} />
    </div>
  );
}

function Button({ variant = "gold", children, style, href, onClick }) {
  const cls = variant === "gold" ? "btn-gold" : "btn-ghost";
  if (href) return <a className={cls} href={href} style={style}>{children}</a>;
  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}

function LogoMark({ size = 32, fontSize = 15 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${C.gold}, #8B6914)`,
        borderRadius: 8, display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: 900,
        fontSize: Math.round(size * 0.44), color: "#050810", flexShrink: 0,
      }}>
        L
      </div>
      <span style={{ fontSize, fontWeight: 700 }}>
        LogiStart <span style={{ color: C.gold }}>LDI</span>
      </span>
    </div>
  );
}

function SectionContainer({ children, maxWidth = 1200, style }) {
  return (
    <div style={{ maxWidth, margin: "0 auto", padding: "0 40px", ...style }}>
      {children}
    </div>
  );
}

/* Renders a centred section header.
titleLines: array of { text, gold? } - each item becomes one line separated by <br /> */
function SectionHeader({ eyebrow, titleLines, subtitle, visible }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 72 }}>
      <div className={`reveal ${visible ? "in" : ""}`}>
        <EyebrowLabel text={eyebrow} />
      </div>
      <h2
        className={`reveal reveal-d1 ${visible ? "in" : ""}`}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(36px, 5.5vw, 62px)",
          letterSpacing: "1px", lineHeight: 1, marginBottom: 14,
        }}
      >
        {titleLines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line.gold
              ? <span style={{ color: C.gold }}>{line.text}</span>
              : line.text}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          className={`reveal reveal-d2 ${visible ? "in" : ""}`}
          style={{ fontSize: 17, color: C.gray1, maxWidth: 480, margin: "0 auto" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
NAV
============================================================ */
const NAV_LINKS = ["Platform", "Engines", "Results", "Pricing"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,10,15,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <LogoMark />

        <div className="nav-links-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>

        <div className="nav-cta-desktop" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="nav-link">Sign In</span>
          <Button variant="gold" style={{ padding: "9px 20px", fontSize: 13 }}>See Demo</Button>
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", padding: 8,
            flexDirection: "column", gap: 5, alignItems: "center",
          }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{ width: 22, height: 2, borderRadius: 2, transition: "background 0.2s",
                       background: menuOpen ? C.gold : C.gray1 }}
            />
          ))}
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(l => (
          <div key={l} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{l}</div>
        ))}
        <div className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Sign In</div>
        <div style={{ paddingTop: 20 }}>
          <Button variant="gold" style={{ width: "100%", justifyContent: "center", fontSize: 15 }}>
            See Demo
          </Button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
HERO
============================================================ */
const TYPEWRITER_WORDS = [
  "logistics decisions",
  "supplier selections",
  "cost strategies",
  "risk assessments",
];

const HERO_STATS = [
  { v: "10x", l: "faster decisions" },
  { v: "18%", l: "avg. cost reduction" },
  { v: "91%", l: "avg. confidence score" },
];

function HeroSection() {
  const [ref, visible] = useInView(0.01);
  const typed = useTypewriter(TYPEWRITER_WORDS, visible);

  return (
    <section
      ref={ref}
      className="hero-pad"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 40px 80px", position: "relative", overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.14 }}
        >
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={C.gold} strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translate(-50%, -50%)", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(200,169,81,0.07) 0%, transparent 65%)",
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: 880, width: "100%" }}>

        {/* Eyebrow pill */}
        <div
          className={`reveal ${visible ? "in" : ""}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(200,169,81,0.3)",
            borderRadius: 20, padding: "6px 16px", marginBottom: 36,
            background: C.goldDim,
          }}
        >
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: C.gold, animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "1.5px", color: C.gold, textTransform: "uppercase" }}>
            Logistics Decision Intelligence Platform
          </span>
        </div>

        {/* Headline line 1 */}
        <h1
          className={`reveal reveal-d1 ${visible ? "in" : ""}`}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 9vw, 100px)",
            lineHeight: 0.95, letterSpacing: "1px",
            color: C.white, marginBottom: 12,
          }}
        >
          AI THAT MAKES
        </h1>

        {/* Headline line 2 - typewriter */}
        <h1
          className={`reveal reveal-d2 ${visible ? "in" : ""}`}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 9vw, 100px)",
            lineHeight: 0.95, letterSpacing: "1px",
            marginBottom: 36,
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "0.18em", flexWrap: "wrap",
          }}
        >
          <span style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLt})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {typed || " "}
          </span>
          <span style={{
            display: "inline-block", width: 4, height: "0.72em",
            background: C.gold, animation: "blink 1s infinite",
            verticalAlign: "middle", borderRadius: 2,
          }} />
          <span style={{ color: C.white }}>FOR YOU.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`reveal reveal-d3 ${visible ? "in" : ""}`}
          style={{
            fontSize: "clamp(16px, 2vw, 18px)", color: C.gray1,
            lineHeight: 1.75, maxWidth: 560, margin: "0 auto 48px", fontWeight: 300,
          }}
        >
          LogiStart simulates scenarios, benchmarks the market, evaluates suppliers,
          and recommends the best logistics strategy{" "}
          <em style={{ color: C.white, fontStyle: "normal", fontWeight: 500 }}>instantly.</em>
        </p>

        {/* CTA row */}
        <div
          className={`reveal reveal-d4 cta-row ${visible ? "in" : ""}`}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Button variant="gold" style={{ fontSize: 15, padding: "14px 30px" }}>
            ▶ See Decision Demo
          </Button>
          <Button variant="ghost" style={{ fontSize: 15, padding: "14px 30px" }}>
            Access Dashboard
          </Button>
        </div>

        {/* Social proof micro-row */}
        <div
          className={`reveal reveal-d5 hero-stats ${visible ? "in" : ""}`}
          style={{
            marginTop: 44, display: "flex", gap: 28,
            justifyContent: "center", flexWrap: "wrap", alignItems: "center",
          }}
        >
          {HERO_STATS.map(({ v, l }) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.gold }}>{v}</span>
              <span style={{ fontSize: 12.5, color: C.gray2, maxWidth: 90, lineHeight: 1.3 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        animation: "float 3s ease-in-out infinite",
      }}>
        <span style={{ fontSize: 10, color: C.gray2, letterSpacing: "1.5px" }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: `linear-gradient(${C.gold}, transparent)` }} />
      </div>
    </section>
  );
}

/* ============================================================
DECISION OUTPUT
============================================================ */
const DECISION_REASONS = [
  "Best cost-to-service balance across all 4 simulated scenarios",
  "18% below market benchmark - confirmed by 3 independent data sources",
  "Lower operational risk than cross-dock alternative",
  "Verified supplier with 97.2% on-time delivery rate",
  "Volume sensitivity controlled within +/-15% range",
];

const BEFORE_AFTER = [
  { l: "Decision timeline",  b: "3-6 weeks",        a: "< 1 hour" },
  { l: "Consulting cost",    b: "$15-50k project",  a: "$449/mo subscription" },
  { l: "Scenarios modeled",  b: "1-2 (manual)",     a: "4+ (automated)" },
  { l: "Market accuracy",    b: "Analyst estimate", a: "Validated benchmark" },
];

function DecisionOutputSection() {
  const [ref, visible] = useInView();
  const [confVal, setConfVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let v = 0;
    const t = setInterval(() => {
      v = Math.min(v + 2, 91);
      setConfVal(v);
      if (v >= 91) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [visible]);

  const kpis = [
    { l: "Annual Cost",   v: "$1.2M",    accent: C.white, sub: "total logistics" },
    { l: "vs Market",     v: "-18%",     accent: C.green, sub: "below benchmark" },
    { l: "Risk Level",    v: "Low",      accent: C.green, sub: "operational profile" },
    { l: "Lead Time",     v: "1.3 days", accent: C.white, sub: "avg. delivery" },
  ];

  const statCards = [
    { icon: "⚡", title: "42 seconds",  sub: "from brief to decision" },
    { icon: "◈", title: "4 scenarios", sub: "simulated and compared" },
    { icon: "◉", title: "3 quotes",    sub: "evaluated and ranked" },
    { icon: "✶", title: "1 decision",  sub: "clear, justified, exportable" },
  ];

  return (
    <section ref={ref} className="section-pad" style={{ padding: "120px 40px" }}>
      <SectionContainer>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className={`reveal ${visible ? "in" : ""}`}>
            <EyebrowLabel text="Decision Output" />
          </div>
          <h2
            className={`reveal reveal-d1 ${visible ? "in" : ""}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(38px, 6vw, 68px)", letterSpacing: "1px", lineHeight: 1, marginBottom: 16 }}
          >
            FROM ANALYSIS TO{" "}<span style={{ color: C.gold }}>DECISION</span>
          </h2>
          <p
            className={`reveal reveal-d2 ${visible ? "in" : ""}`}
            style={{ fontSize: 17, color: C.gray1, maxWidth: 460, margin: "0 auto 12px" }}
          >
            This is what LogiStart delivers.
          </p>
          <p
            className={`reveal reveal-d3 ${visible ? "in" : ""}`}
            style={{ fontSize: 14, color: C.gray2, maxWidth: 500, margin: "0 auto", fontStyle: "italic" }}
          >
            "This is not a dashboard. This is the decision your team was trying to reach for weeks."
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="decision-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 28, alignItems: "start" }}
        >
          {/* Decision card */}
          <div
            className={`reveal decision-card ${visible ? "in" : ""}`}
            style={{
              border: "1px solid rgba(200,169,81,0.35)",
              borderRadius: 16, overflow: "hidden",
              background: `linear-gradient(160deg, ${C.bg2}, ${C.bg1})`,
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              animation: visible ? "borderGlow 4s ease-in-out infinite" : "none",
            }}
          >
            {/* Card header */}
            <div style={{
              padding: "20px 28px", borderBottom: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "rgba(200,169,81,0.03)", flexWrap: "wrap", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: C.gold, fontSize: 18 }}>{"✶"}</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "1.5px", color: C.gold, textTransform: "uppercase" }}>
                  Decision Output  -  Q3 Southeast Network
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, color: C.gray1 }}>Generated now</span>
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: 28 }}>
              {/* Strategy */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10.5, color: C.gray2, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
                  Recommended Strategy
                </div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: C.gold, lineHeight: 1.2 }}>
                  Hybrid Network  -  2 DCs + Cross-dock
                </div>
                <div style={{ fontSize: 13, color: C.gray1, marginTop: 6, lineHeight: 1.5 }}>
                  Sao Paulo + Belo Horizonte  |  FTL inter-hub  |  LTL last-mile
                </div>
              </div>

              {/* KPI grid */}
              <div
                className="decision-kpi-grid"
                style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}
              >
                {kpis.map(({ l, v, accent, sub }) => (
                  <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 10, color: C.gray2, marginBottom: 5, letterSpacing: "0.5px" }}>{l}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: accent, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 10.5, color: C.gray2, marginTop: 3 }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Confidence bar */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 10.5, color: C.gray2, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    Confidence Score
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: C.gold }}>{confVal}/100</span>
                </div>
                <div style={{ height: 5, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${confVal}%`,
                    background: `linear-gradient(90deg, ${C.gold}, ${C.green})`,
                    borderRadius: 3, transition: "width 0.08s linear",
                  }} />
                </div>
              </div>

              {/* Why list */}
              <div>
                <div style={{ fontSize: 10.5, color: C.gray2, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
                  Why This Decision
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {DECISION_REASONS.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        padding: "9px 12px",
                        background: "rgba(200,169,81,0.04)",
                        border: "1px solid rgba(200,169,81,0.09)",
                        borderRadius: 7,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateX(-8px)",
                        transition: `opacity 0.5s ${(0.3 + i * 0.08).toFixed(2)}s ease, transform 0.5s ${(0.3 + i * 0.08).toFixed(2)}s ease`,
                      }}
                    >
                      <span style={{ color: C.gold, fontSize: 11, flexShrink: 0, marginTop: 1 }}>{"✓"}</span>
                      <span style={{ fontSize: 12.5, color: C.gray1, lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div style={{
              padding: "16px 28px", borderTop: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: 10,
            }}>
              <span style={{ fontSize: 11.5, color: C.gray2 }}>
                Generated in 42 seconds  |  4 scenarios  |  3 quotes
              </span>
              <Button variant="gold" style={{ padding: "8px 16px", fontSize: 12 }}>Export PDF</Button>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              className={`reveal reveal-d1 ${visible ? "in" : ""}`}
              style={{ fontSize: 14, color: C.gray1, lineHeight: 1.75 }}
            >
              This is the real platform output. Not a report. Not a dashboard.
              An <strong style={{ color: C.white }}>executive decision</strong>, ready to be approved.
            </div>

            {statCards.map(({ icon, title, sub }, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} ${visible ? "in" : ""}`}
                style={{
                  display: "flex", gap: 16, alignItems: "center",
                  padding: "16px 20px", background: C.card,
                  border: `1px solid ${C.border}`, borderRadius: 10,
                  transition: "border-color 0.2s", cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(200,169,81,0.25)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: C.goldDim, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, color: C.gold,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: C.white }}>{title}</div>
                  <div style={{ fontSize: 12, color: C.gray2 }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Before / After table */}
            <div
              className={`reveal reveal-d5 ${visible ? "in" : ""}`}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginTop: 4 }}
            >
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, fontSize: 10.5, fontWeight: 700, color: C.gray2, letterSpacing: "1px", textTransform: "uppercase" }}>
                Before vs. After LogiStart
              </div>
              {BEFORE_AFTER.map(({ l, b, a }) => (
                <div
                  key={l}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "11px 18px", borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}
                >
                  <span style={{ color: C.gray2 }}>{l}</span>
                  <span style={{ color: C.red, textDecoration: "line-through" }}>{b}</span>
                  <span style={{ color: C.green, fontWeight: 600 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
HOW IT WORKS
============================================================ */
const STEPS = [
  {
    num: "01",
    icon: "◯",
    title: "Describe your logistics problem",
    desc: "Define origin, destination, volume, product type, and strategic priority. Takes under 5 minutes.",
    detail: "No spreadsheets. No complex forms. Just context.",
  },
  {
    num: "02",
    icon: "◈",
    title: "LogiStart simulates and analyzes",
    desc: "The platform generates 4 network scenarios, queries real-time market benchmarks, and evaluates suppliers automatically.",
    detail: "The equivalent of 3-6 weeks of consulting work.",
  },
  {
    num: "03",
    icon: "✶",
    title: "Get the best decision instantly",
    desc: "A structured executive recommendation: strategy, supplier, cost, risk, and next steps - in seconds.",
    detail: "Ready to present to the CFO or board.",
  },
];

function HowItWorksSection() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{ padding: "100px 40px", background: C.bg1, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
    >
      <SectionContainer maxWidth={1100}>
        <SectionHeader
          eyebrow="How It Works"
          titleLines={[
            { text: "THREE STEPS." },
            { text: "ONE DECISION.", gold: true },
          ]}
          subtitle="The fastest logistics decision process ever built."
          visible={visible}
        />

        <div
          className="steps-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, position: "relative" }}
        >
          <div
            className="connector-line"
            style={{
              position: "absolute", top: 52, left: "16.7%", right: "16.7%", height: 1,
              background: `linear-gradient(90deg, transparent, ${C.gold}40, ${C.gold}40, transparent)`,
              pointerEvents: "none", zIndex: 0,
            }}
          />

          {STEPS.map(({ num, icon, title, desc, detail }, i) => (
            <div
              key={i}
              className={`step-card reveal reveal-d${i + 1} ${visible ? "in" : ""}`}
              style={{ zIndex: 1 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: i === 1 ? C.gold : C.goldDim,
                  border: `1px solid ${i === 1 ? C.gold : "rgba(200,169,81,0.25)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: i === 1 ? "#050810" : C.gold, fontWeight: 800,
                }}>
                  {icon}
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "rgba(200,169,81,0.08)", lineHeight: 1 }}>
                  {num}
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: C.gray1, lineHeight: 1.65, marginBottom: 14 }}>{desc}</p>
              <p style={{ fontSize: 11.5, color: C.gold, fontStyle: "italic" }}>{detail}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
ENGINES
============================================================ */
const ENGINES = [
  {
    icon: "◯",
    color: C.blue,
    name: "Scenario Engine",
    tagline: "Simulates logistics strategies",
    desc: "Models complete distribution networks - single DC, multi-DC, cross-dock, direct shipping - with cost and lead time estimates before any quote is requested.",
    outcome: "4 scenarios compared in 10 minutes",
  },
  {
    icon: "◈",
    color: C.gold,
    name: "Market Intelligence",
    tagline: "Real-time market benchmarks",
    desc: "Proprietary database of warehouse rates, freight costs, and operator performance data, continuously updated. You know the fair price before negotiating.",
    outcome: "+/-15-20% accuracy vs. actual market rate",
  },
  {
    icon: "◉",
    color: C.purple,
    name: "Autonomous Sourcing",
    tagline: "Finds and evaluates suppliers",
    desc: "Automatically selects the most suitable operators, generates a structured RFQ, and ranks results by composite score. No manual research required.",
    outcome: "5-8 qualified operators in minutes",
  },
  {
    icon: "✶",
    color: C.green,
    name: "AI Decision Engine",
    tagline: "Recommends the best option",
    desc: "Synthesizes scenarios, benchmarks, and quotes into a single executive recommendation. Strategy, supplier, cost, risk, and next steps - in 60 seconds.",
    outcome: "1 clear, justified, exportable decision",
  },
];

function EnginesSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section-pad" style={{ padding: "120px 40px" }}>
      <SectionContainer>
        <SectionHeader
          eyebrow="Architecture"
          titleLines={[
            { text: "THE INTELLIGENCE BEHIND" },
            { text: "EVERY DECISION", gold: true },
          ]}
          subtitle="Four interconnected engines. Each one eliminates weeks of manual work."
          visible={visible}
        />

        {/* Flow diagram */}
        <div
          className={`reveal reveal-d2 ${visible ? "in" : ""}`}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 56, flexWrap: "wrap" }}
        >
          {ENGINES.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                padding: "6px 14px", borderRadius: 20,
                background: e.color + "15", border: `1px solid ${e.color}40`,
                fontSize: 12, fontWeight: 600, color: e.color,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>{e.icon}</span>
                {e.name}
              </div>
              {i < ENGINES.length - 1 && (
                <span style={{ color: C.gray2, fontSize: 16 }}>{"→"}</span>
              )}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: C.gray2, fontSize: 16 }}>{"→"}</span>
            <div style={{ padding: "6px 14px", borderRadius: 20, background: C.goldDim, border: "1px solid rgba(200,169,81,0.4)", fontSize: 12, fontWeight: 700, color: C.gold }}>
              {"✶"} DECISION
            </div>
          </div>
        </div>

        {/* Engine cards */}
        <div
          className="engines-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}
        >
          {ENGINES.map((e, i) => (
            <div
              key={i}
              className={`engine-card reveal reveal-d${i + 1} ${visible ? "in" : ""}`}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: e.color + "15", border: `1px solid ${e.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: e.color,
                }}>
                  {e.icon}
                </div>
                <span style={{
                  fontSize: 11, color: e.color, fontWeight: 700,
                  letterSpacing: "0.5px", padding: "3px 9px",
                  background: e.color + "10", borderRadius: 20,
                  border: `1px solid ${e.color}25`,
                }}>
                  {e.tagline}
                </span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 10 }}>{e.name}</h3>
              <p style={{ fontSize: 13.5, color: C.gray1, lineHeight: 1.7, marginBottom: 18 }}>{e.desc}</p>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                borderRadius: 8, background: e.color + "08", border: `1px solid ${e.color}20`,
              }}>
                <span style={{ color: e.color, fontSize: 14 }}>{"→"}</span>
                <span style={{ fontSize: 12.5, color: e.color, fontWeight: 600 }}>{e.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
IMPACT
============================================================ */
const IMPACTS = [
  { metric: "8-20%", label: "Logistics cost reduction",    icon: "↓", color: C.green,
    desc: "Identified through market benchmarks and negotiation opportunities on every project." },
  { metric: "10x",   label: "Faster decisions",            icon: "⚡", color: C.gold,
    desc: "3-6 weeks of manual analysis compressed into a session under 1 hour." },
  { metric: "91%",   label: "Average confidence score",    icon: "◯", color: C.blue,
    desc: "Based on verified market data, not spreadsheet assumptions." },
  { metric: "Zero",  label: "Spreadsheet-driven errors",   icon: "✓", color: C.green,
    desc: "Structured data, automated calculations, and validated benchmarks eliminate human risk." },
];

function ImpactSection() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{ padding: "120px 40px", background: C.bg1, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
    >
      <SectionContainer maxWidth={1100}>
        <div
          className="impact-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
        >
          {/* Left */}
          <div>
            <div className={`reveal ${visible ? "in" : ""}`}>
              <EyebrowLabel text="Real Results" />
            </div>
            <h2
              className={`reveal reveal-d1 ${visible ? "in" : ""}`}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5.5vw, 62px)", letterSpacing: "1px", lineHeight: 1, marginBottom: 20 }}
            >
              BUILT FOR<br />
              <span style={{ color: C.gold }}>MEASURABLE OUTCOMES</span>
            </h2>
            <p
              className={`reveal reveal-d2 ${visible ? "in" : ""}`}
              style={{ fontSize: 16, color: C.gray1, lineHeight: 1.75, marginBottom: 32 }}
            >
              Every LogiStart recommendation is calibrated against real market data.
              Not generic analyses. Not decorative dashboards.
            </p>
            <div
              className={`reveal reveal-d3 cta-row ${visible ? "in" : ""}`}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Button variant="gold">See Demo</Button>
              <Button variant="ghost">Talk to a Specialist</Button>
            </div>
          </div>

          {/* Right - 2x2 impact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {IMPACTS.map(({ metric, label, desc, icon, color }, i) => (
              <div key={i} className={`impact-card reveal reveal-d${i + 1} ${visible ? "in" : ""}`}>
                <div style={{ fontSize: 30, marginBottom: 12, color }}>{icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color, lineHeight: 1, marginBottom: 6 }}>
                  {metric}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: C.white, marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 12, color: C.gray2, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
SOCIAL PROOF
============================================================ */
const LOGOS = ["ACME CORP", "METALCORP", "PLASTICO S.A.", "PACKCO", "FASTPARTS", "TRANSUL LOG"];

const TESTIMONIALS = [
  {
    quote: "We closed a negotiation 22% below our previous rate. The recommendation was there, ready, in under an hour.",
    name: "Head of Supply Chain",
    company: "Packaging Industry, SP",
  },
  {
    quote: "We eliminated 4 weeks of analysis per project. The CFO approved the contract in the same meeting where we presented the Decision Output.",
    name: "Strategic Procurement Manager",
    company: "Consumer Goods, MG",
  },
  {
    quote: "For the first time we have a decision with a number, a rationale, and a risk level. Before it was all gut feel and spreadsheets.",
    name: "COO",
    company: "National Distributor, RJ",
  },
];

function SocialProofSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="section-pad" style={{ padding: "100px 40px" }}>
      <SectionContainer maxWidth={1100}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className={`reveal ${visible ? "in" : ""}`}>
            <EyebrowLabel text="Trusted by Leaders" />
          </div>
          <h2
            className={`reveal reveal-d1 ${visible ? "in" : ""}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", letterSpacing: "1px", lineHeight: 1, marginBottom: 12 }}
          >
            USED BY LOGISTICS AND<br />
            <span style={{ color: C.gold }}>PROCUREMENT LEADERS</span>
          </h2>
        </div>

        {/* Logos */}
        <div
          className={`reveal reveal-d1 ${visible ? "in" : ""}`}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 72 }}
        >
          {LOGOS.map(l => <div key={l} className="logo-pill">{l}</div>)}
          <div className="logo-pill" style={{ color: C.gold, borderColor: "rgba(200,169,81,0.2)" }}>
            + Enterprise-ready
          </div>
        </div>

        {/* Testimonials */}
        <div
          className="testimonials-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}
        >
          {TESTIMONIALS.map(({ quote, name, company }, i) => (
            <div
              key={i}
              className={`reveal reveal-d${i + 1} ${visible ? "in" : ""}`}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px" }}
            >
              <div style={{ fontSize: 28, color: C.gold, marginBottom: 16, fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>
                "
              </div>
              <p style={{ fontSize: 14, color: C.gray1, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>
                {quote}
              </p>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{name}</div>
                <div style={{ fontSize: 11.5, color: C.gray2 }}>{company}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
POSITIONING
============================================================ */
const POSITIONING_PILLS = [
  { label: "Not a TMS",            x: true  },
  { label: "Not an ERP",           x: true  },
  { label: "Not just a dashboard", x: true  },
  { label: "A Decision Engine",    x: false },
];

const COMPETITOR_ROWS = [
  { cap: "Network modeling",        vals: [false, false, true,  true] },
  { cap: "Market benchmarks",       vals: [false, false, true,  true] },
  { cap: "Autonomous sourcing",     vals: [false, true,  false, true] },
  { cap: "Decision recommendation", vals: [false, false, false, true] },
  { cap: "Time to value",           vals: ["Weeks", "Months", "Months", "Minutes"] },
  { cap: "Target market",           vals: ["Enterprise", "Enterprise", "Enterprise", "Mid-market SaaS"] },
];

function PositioningSection() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{
        padding: "120px 40px", background: C.bg1,
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: 900, height: 900,
        background: "radial-gradient(circle, rgba(200,169,81,0.05) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <SectionContainer maxWidth={800} style={{ textAlign: "center", position: "relative" }}>
        <div className={`reveal ${visible ? "in" : ""}`} style={{ marginBottom: 32 }}>
          <EyebrowLabel text="Category Definition" />
        </div>

        <div className={`reveal reveal-d1 ${visible ? "in" : ""}`} style={{ marginBottom: 28 }}>
          <p style={{
            fontSize: "clamp(20px, 3vw, 27px)", color: C.gray1, lineHeight: 1.6,
            fontStyle: "italic", fontFamily: "'DM Serif Display', serif",
          }}>
            "LogiStart is not a procurement tool."
          </p>
        </div>

        <div
          className={`reveal reveal-d2 ${visible ? "in" : ""}`}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 5vw, 58px)", letterSpacing: "1px", lineHeight: 1, marginBottom: 36 }}
        >
          IT IS THE{" "}<span style={{ color: C.gold }}>INTELLIGENCE LAYER</span><br />
          THAT DECIDES YOUR LOGISTICS.
        </div>

        <p
          className={`reveal reveal-d3 ${visible ? "in" : ""}`}
          style={{ fontSize: 16, color: C.gray1, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 48px" }}
        >
          While other systems record what happened, LogiStart determines what should be done{" "}
          - before the negotiation even begins.
        </p>

        {/* Pills */}
        <div
          className={`reveal reveal-d4 ${visible ? "in" : ""}`}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}
        >
          {POSITIONING_PILLS.map(({ label, x }) => (
            <span
              key={label}
              style={{
                padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                background: x ? "rgba(231,76,60,0.08)" : C.goldDim,
                border: `1px solid ${x ? "rgba(231,76,60,0.2)" : "rgba(200,169,81,0.3)"}`,
                color: x ? C.red : C.gold,
              }}
            >
              {x ? "✕" : "✶"} {label}
            </span>
          ))}
        </div>

        {/* Competitor comparison */}
        <div
          className={`reveal reveal-d5 ${visible ? "in" : ""}`}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", textAlign: "left" }}
        >
          <div className="comp-table-wrap">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: `1px solid ${C.border}`, fontSize: 10.5, fontWeight: 700, letterSpacing: "1px", color: C.gray2, textTransform: "uppercase", minWidth: 480 }}>
              <span>Capability</span>
              <span style={{ textAlign: "center" }}>Flexport</span>
              <span style={{ textAlign: "center" }}>SAP Ariba</span>
              <span style={{ textAlign: "center" }}>Palantir</span>
              <span style={{ textAlign: "center", color: C.gold }}>LogiStart</span>
            </div>
            {COMPETITOR_ROWS.map(({ cap, vals }) => (
              <div
                key={cap}
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "11px 20px", borderBottom: `1px solid ${C.border}`, fontSize: 12.5, minWidth: 480 }}
              >
                <span style={{ color: C.gray1 }}>{cap}</span>
                {vals.map((v, i) => (
                  <span
                    key={i}
                    style={{
                      textAlign: "center",
                      color: i === 3 ? C.gold : typeof v === "boolean" ? (v ? C.green : C.gray2) : C.gray1,
                      fontWeight: i === 3 ? 700 : 400,
                    }}
                  >
                    {typeof v === "boolean" ? (v ? "✓" : "-") : v}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* ============================================================
FINAL CTA
============================================================ */
const TRUST_ITEMS = [
  "✓ No long-term contract",
  "✓ Setup in 1 day",
  "✓ Value in the first project",
];

function FinalCTASection() {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{ padding: "140px 40px", position: "relative", overflow: "hidden" }}
    >
      {/* Animated background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.11 }}
        >
          <defs>
            <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke={C.gold} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(200,169,81,0.10) 0%, transparent 65%)",
        }} />
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className={`reveal ${visible ? "in" : ""}`}>
          <EyebrowLabel text="Next Step" />
        </div>

        <h2
          className={`reveal reveal-d1 ${visible ? "in" : ""}`}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 7vw, 80px)", letterSpacing: "1px", lineHeight: 0.95, marginBottom: 28 }}
        >
          READY TO MAKE<br />
          <span style={{ color: C.gold }}>BETTER DECISIONS?</span>
        </h2>

        <p
          className={`reveal reveal-d2 ${visible ? "in" : ""}`}
          style={{ fontSize: 17, color: C.gray1, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 44px" }}
        >
          See how a company in your sector used LogiStart to cut logistics costs by 18%
          and make the decision in under an hour.
        </p>

        <div
          className={`reveal reveal-d3 cta-row ${visible ? "in" : ""}`}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}
        >
          <Button variant="gold" style={{ fontSize: 15, padding: "15px 32px" }}>
            ▶ See Your First Decision in 15 Minutes
          </Button>
          <Button variant="ghost" style={{ fontSize: 15, padding: "15px 32px" }}>
            Book a Call
          </Button>
        </div>

        <div
          className={`reveal reveal-d4 trust-row ${visible ? "in" : ""}`}
          style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", fontSize: 12.5, color: C.gray2 }}
        >
          {TRUST_ITEMS.map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
FOOTER
============================================================ */
const FOOTER_COLS = [
  { title: "Platform", links: ["Dashboard", "Decision Output", "Market Intelligence", "Operator Network"] },
  { title: "Company",  links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Legal",    links: ["Privacy", "Terms", "Security", "GDPR"] },
];

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "48px 40px 32px", background: C.bg1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}
        >
          <div>
            <div style={{ marginBottom: 16 }}><LogoMark /></div>
            <p style={{ fontSize: 13, color: C.gray2, lineHeight: 1.7, maxWidth: 260 }}>
              Logistics Decision Intelligence Platform.<br />
              The AI layer that decides your logistics.
            </p>
          </div>

          {FOOTER_COLS.map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: C.gray2, textTransform: "uppercase", marginBottom: 16 }}>
                {title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(l => (
                  <span
                    key={l}
                    style={{ fontSize: 13, color: C.gray1, cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.color = C.white}
                    onMouseLeave={e => e.currentTarget.style.color = C.gray1}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: `1px solid ${C.border}`, paddingTop: 24,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 12, color: C.gray2 }}>
            (c) 2026 LogiStart LDI. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: C.gray2 }}>
            Built for Directors, CFOs, and COOs who need to decide.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
ROOT
============================================================ */
export default function Homepage() {
  return (
    <div style={{ background: C.bg, color: C.white, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav />
      <main>
        <HeroSection />
        <DecisionOutputSection />
        <HowItWorksSection />
        <EnginesSection />
        <ImpactSection />
        <SocialProofSection />
        <PositioningSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}