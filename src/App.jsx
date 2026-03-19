import React from "react";

export default function App() {
  return (
    <div className="bg-[#0B1220] text-white min-h-screen">

      {/* HERO */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-[#C9A646] leading-tight">
          AI that designs and optimizes your logistics strategy.
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          LogiStart analyzes scenarios, benchmarks the market, evaluates suppliers,
          and recommends the best logistics strategy instantly.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-[#C9A646] text-black px-6 py-3 rounded-lg font-semibold">
            ▶ See Decision Demo
          </button>

          <button className="border border-[#C9A646] text-[#C9A646] px-6 py-3 rounded-lg">
            Access Dashboard
          </button>
        </div>

        <div className="mt-12 flex gap-10 text-center">
          <div>
            <p className="text-2xl font-bold">10x</p>
            <p className="text-gray-400">faster decisions</p>
          </div>
          <div>
            <p className="text-2xl font-bold">18%</p>
            <p className="text-gray-400">avg. cost reduction</p>
          </div>
          <div>
            <p className="text-2xl font-bold">91%</p>
            <p className="text-gray-400">confidence score</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="px-6 py-20 bg-[#0E1628]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#C9A646]">
            Logistics decisions are broken
          </h2>

          <p className="mt-6 text-gray-300">
            Today, companies rely on fragmented data, manual analysis, and static
            tools. Decisions are slow, inconsistent, and often suboptimal.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#C9A646]">
            From routes to strategy
          </h2>

          <p className="mt-6 text-gray-300">
            LogiStart doesn’t just compare existing routes. It designs new ones,
            evaluates sourcing strategies, and optimizes your entire logistics network.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="px-6 py-20 bg-[#0E1628]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#C9A646]">
            Built for decision-makers
          </h2>

          <p className="mt-6 text-gray-300">
            Whether you're managing procurement, logistics, or supply chain strategy,
            LogiStart gives you clarity, speed, and confidence.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#C9A646]">
          Start making better logistics decisions today
        </h2>

        <button className="mt-6 bg-[#C9A646] text-black px-8 py-4 rounded-lg font-semibold">
          Get Started
        </button>
      </section>

    </div>
  );
}