export default function App() {
  return (
    <div className="page">
      <section className="container" style={{ padding: "80px 20px" }}>
        
        <h1 style={{ fontSize: "42px", color: "#C9A646" }}>
          AI that designs and optimizes your logistics strategy.
        </h1>

        <p style={{ marginTop: "20px", color: "#ccc", fontSize: "18px" }}>
          LogiStart analyzes scenarios, benchmarks the market, evaluates suppliers,
          and recommends the best logistics strategy instantly.
        </p>

        <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
          <button style={{ background: "#C9A646", color: "black", padding: "12px 20px", borderRadius: "8px" }}>
            ▶ See Decision Demo
          </button>

          <button style={{ border: "1px solid #C9A646", color: "#C9A646", padding: "12px 20px", borderRadius: "8px" }}>
            Access Dashboard
          </button>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h2>10x</h2>
          <p>faster decisions</p>

          <h2>18%</h2>
          <p>avg. cost reduction</p>

          <h2>91%</h2>
          <p>confidence score</p>
        </div>

      </section>
    </div>
  );
}