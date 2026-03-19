export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08101f",
        color: "#f5f7fb",
        padding: "80px 20px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", color: "#c9a646", marginBottom: "24px" }}>
          AI that designs and optimizes your logistics strategy.
        </h1>

        <p style={{ fontSize: "20px", lineHeight: 1.6, maxWidth: "800px", marginBottom: "32px" }}>
          LogiStart analyzes scenarios, benchmarks the market, evaluates suppliers,
          and recommends the best logistics strategy instantly.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
          <button
            style={{
              background: "#c9a646",
              color: "#000",
              border: "none",
              padding: "14px 22px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            See Decision Demo
          </button>

          <button
            style={{
              background: "transparent",
              color: "#c9a646",
              border: "1px solid #c9a646",
              padding: "14px 22px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Access Dashboard
          </button>
        </div>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ color: "#c9a646", fontSize: "36px" }}>10x</h2>
            <p>faster decisions</p>
          </div>

          <div>
            <h2 style={{ color: "#c9a646", fontSize: "36px" }}>18%</h2>
            <p>avg. cost reduction</p>
          </div>

          <div>
            <h2 style={{ color: "#c9a646", fontSize: "36px" }}>91%</h2>
            <p>confidence score</p>
          </div>
        </div>
      </div>
    </div>
  );
}