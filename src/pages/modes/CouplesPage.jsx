import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import {
  Infinity,
  Flame,
  Sparkles,
  Heart,
  Shield,
  Lock,
} from "lucide-react";

const CouplesPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Muse Moment - Couples Intimacy Game",
    description:
      "An elite intimacy experience for couples. AI-curated challenges across four escalating phases of connection.",
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 2, maxValue: 2 },
  };

  return (
    <>
      <SEO
        title="Couples Intimacy Game - The Private Suite | Muse Moment"
        description="The ultimate intimacy game for partners. AI-generated challenges across 4 phases: Warming Up, Building Chemistry, Foreplay, and Climax. Private and sophisticated."
        path="/couples-party-game"
        schema={structuredData}
      />
      <Layout>
        <div className="bg-black text-zinc-400 min-h-screen selection:bg-red-800 selection:text-white font-sans antialiased">
          <article className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
            {/* --- HERO SECTION --- */}
            <header className="mb-24 md:mb-40 relative text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent mb-8"></div>

              <div className="pt-24 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.6em] text-red-600 font-bold mb-10">
                  <Infinity size={16} strokeWidth={1.5} />
                  <span>The Private Collection</span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif font-light text-white leading-none tracking-tighter mb-12">
                  Intimacy <br />{" "}
                  <span className="text-red-700 italic">Redefined.</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 font-serif italic leading-relaxed max-w-2xl mx-auto">
                  An escalating journey through four distinct phases of
                  chemistry, curated by intelligence, driven by desire.
                </p>
              </div>
            </header>

            {/* --- PHASES (The Progression) --- */}
            <section className="mb-40">
              <div className="flex items-center gap-4 mb-16">
                <div className="h-px w-12 bg-red-800"></div>
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                  The Progression Protocol
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
                {[
                  {
                    title: "Warming Up",
                    icon: Sparkles,
                    desc: "Subtle challenges designed to set the mood and dissolve the day.",
                  },
                  {
                    title: "Building Chemistry",
                    icon: Flame,
                    desc: "Deepening the connection with challenges that ignite the spark.",
                  },
                  {
                    title: "Foreplay",
                    icon: Heart,
                    desc: "Sensual exploration and heightening of physical anticipation.",
                  },
                  {
                    title: "Climax",
                    icon: Infinity,
                    desc: "The final tier. Passionate challenges and absolute connection.",
                  },
                ].map((phase, i) => (
                  <div
                    key={i}
                    className="bg-black p-10 hover:bg-zinc-950 transition-all duration-500 group"
                  >
                    <phase.icon
                      className="text-red-700 mb-8 group-hover:text-red-500 transition-colors"
                      size={24}
                      strokeWidth={1}
                    />
                    <h3 className="text-lg font-serif text-white mb-4 italic tracking-wide">
                      {phase.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-500 font-light">
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- OPERATION (HOW TO) --- */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-center">
              <div className="lg:col-span-5">
                <div className="border border-zinc-900 p-12 bg-[#050505] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lock size={120} className="text-red-800" />
                  </div>
                  <h2 className="text-3xl font-serif text-white mb-8">
                    The Setup
                  </h2>
                  <ul className="space-y-6">
                    {[
                      "Identity: Both participants enter credentials.",
                      "Inventory: Specify available items for a bespoke experience.",
                      "Duration: Select 10, 20, or 30 rounds of engagement.",
                      "Execution: Accept the challenge or the liquid penance.",
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex gap-4 text-sm font-light text-zinc-400"
                      >
                        <span className="text-red-700 font-serif italic font-bold">
                          0{i + 1}.
                        </span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-8">
                  Privacy Guarantee
                </h3>
                <p className="text-3xl font-serif text-zinc-200 leading-snug mb-8">
                  "Intimacy is sacred. We operate on a zero-retention policy.
                  What is shared in the suite, stays in the suite."
                </p>
                <div className="flex items-center gap-3 text-zinc-600">
                  <Shield size={16} />
                  <span className="text-[10px] uppercase tracking-widest italic">
                    End-to-End Private Experience
                  </span>
                </div>
              </div>
            </section>

            {/* --- DOSSIER SAMPLES --- */}
            <section className="mb-40">
              <h2 className="text-center text-xs uppercase tracking-[0.5em] text-zinc-600 mb-20">
                The Archive: Sample Briefs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                {[
                  {
                    phase: "Warming Up",
                    task: "Administer a slow shoulder massage for 60 seconds. Every stop is 1 penalty drink.",
                  },
                  {
                    phase: "Building Chemistry",
                    task: "Maintain eye contact for 45 seconds without speaking. Penalty: Finish your drink.",
                  },
                  {
                    phase: "Foreplay",
                    task: "Choose one item from your pre-game inventory to use. If declined: 2 penalty drinks.",
                  },
                  {
                    phase: "Climax",
                    task: "Whisper your most guarded fantasy. If you keep the secret: 3 penalty drinks.",
                  },
                ].map((sample, i) => (
                  <div
                    key={i}
                    className="bg-black p-12 group hover:bg-zinc-950 transition-colors"
                  >
                    <span className="text-[9px] uppercase tracking-[0.3em] text-red-700 font-bold mb-4 block">
                      {sample.phase}
                    </span>
                    <p className="text-xl font-serif text-zinc-300 italic leading-relaxed group-hover:text-white transition-colors">
                      "{sample.task}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="text-center py-20 bg-zinc-950 border border-red-900/10">
              <h3 className="text-5xl md:text-7xl font-serif text-white mb-10 tracking-tighter">
                Ready to <span className="text-red-700">Begin?</span>
              </h3>
              <Link
                to="/"
                state={{ defaultMode: "couples" }}
                className="inline-flex items-center gap-10 group"
              >
                <div className="w-12 h-px bg-red-900 group-hover:w-20 transition-all duration-500"></div>
                <span className="text-white text-[11px] uppercase tracking-[0.5em] font-bold py-4 border-b border-red-700 group-hover:text-red-500 transition-colors">
                  Access The Suite
                </span>
                <div className="w-12 h-px bg-red-900 group-hover:w-20 transition-all duration-500"></div>
              </Link>
              <p className="mt-12 text-[9px] uppercase tracking-widest text-zinc-700">
                Guests Only • Discreet Session
              </p>
            </section>

            {/* --- NAVIGATION FOOTER --- */}
            <footer className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-800 italic">
                Ref: Muse Moment Private
              </div>
              <div className="flex gap-12">
                <Link
                  to="/bff-party-game"
                  className="text-xs uppercase tracking-widest text-zinc-600 hover:text-red-700 transition-colors"
                >
                  The Socialite Mode
                </Link>
                <Link
                  to="/date-night-game"
                  className="text-xs uppercase tracking-widest text-zinc-600 hover:text-red-700 transition-colors"
                >
                  The Rendezvous
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default CouplesPage;
