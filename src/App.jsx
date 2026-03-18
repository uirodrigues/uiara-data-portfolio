import React from "react";

export default function App() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#0b0f19",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>
      
      <h1 style={{ fontSize: "48px", color: "#d4af37" }}>
        AI that makes logistics decisions for you.
      </h1>

      <p style={{ fontSize: "20px", marginTop: "20px", maxWidth: "600px" }}>
        LogiStart analyzes scenarios, benchmarks the market, evaluates suppliers,
        and recommends the best logistics strategy instantly.
      </p>

      <div style={{ marginTop: "40px" }}>
        <button style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#d4af37",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "20px"
        }}>
          ▶ See Decision Demo
        </button>

        <button style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "transparent",
          color: "#d4af37",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Access Dashboard
        </button>
      </div>

      <div style={{
        marginTop: "80px",
        display: "flex",
        gap: "40px"
      }}>
        <div>
          <h2 style={{ color: "#d4af37" }}>10x</h2>
          <p>faster decisions</p>
        </div>

        <div>
          <h2 style={{ color: "#d4af37" }}>18%</h2>
          <p>avg. cost reduction</p>
        </div>

        <div>
          <h2 style={{ color: "#d4af37" }}>91%</h2>
          <p>confidence score</p>
        </div>
      </div>

    </div>
  );
}
