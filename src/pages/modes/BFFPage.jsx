import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import {
  Users,
  PartyPopper,
  Zap,
  Award,
} from "lucide-react";

const BFFPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Muse Moment - BFF Party Game",
    description:
      "A high-stakes party game for inner circles. AI-generated dares designed for social peak chaos.",
    numberOfPlayers: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 20,
    },
  };

  return (
    <>
      <SEO
        title="BFF Party Game - The Inner Circle | Muse Moment"
        description="The definitive social experience for friends. AI-curated dares that escalate from warm-up to peak mayhem. Designed for groups of 2-20."
        path="/bff-party-game"
        schema={structuredData}
      />
      <Layout>
        <div className="bg-black text-zinc-400 min-h-screen selection:bg-red-700 selection:text-white font-sans antialiased">
          <article className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
            {/* --- HERO SECTION --- */}
            <header className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-red-600 font-bold mb-8">
                  <Users size={14} />
                  <span>Mode: The Socialite</span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white leading-[0.85] tracking-tighter mb-8">
                  BFF <span className="text-red-600 italic">Party.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 font-serif italic leading-relaxed border-l border-red-900/50 pl-8">
                  A high-stakes "Do or Drink" experience for the inner circle.
                  Where AI logic meets social chaos.
                </p>
              </div>
              <div className="hidden lg:block text-right">
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
                  Protocol Strength
                </div>
                <div className="flex gap-1 justify-end">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-1 h-8 ${i < 5 ? "bg-red-600" : "bg-zinc-900"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </header>

            {/* --- FEATURES GRID --- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 mb-32">
              {[
                {
                  title: "Progressive Stakes",
                  icon: PartyPopper,
                  desc: "Three tiers of escalation: Warm-up → Heating Up → Peak Chaos. No safety nets.",
                },
                {
                  title: "AI Generation",
                  icon: Zap,
                  iconColor: "text-red-600",
                  desc: "Bespoke challenges generated in real-time. No two gatherings are ever identical.",
                },
                {
                  title: "Group Scaling",
                  icon: Award,
                  desc: "Seamless orchestration for parties of 2 to 20 guests. Desktop or mobile optimized.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-black p-10 md:p-12 hover:bg-zinc-950 transition-colors group"
                >
                  <f.icon
                    className="text-red-600 mb-8 group-hover:scale-110 transition-transform"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-serif text-white mb-4">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 font-light">
                    {f.desc}
                  </p>
                </div>
              ))}
            </section>

            {/* --- HOW TO OPERATE --- */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
              <div className="lg:col-span-4">
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-8">
                  The Rules of Engagement
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed italic">
                  "The evening is defined by its participants. Success requires
                  a minimum of two players and an absolute lack of inhibitions."
                </p>
              </div>
              <div className="lg:col-span-8 space-y-px bg-zinc-900 border border-zinc-900">
                {[
                  "Register guest names (2 - 20 participants).",
                  "Select duration (10, 20, or 30 high-intensity rounds).",
                  "Execute the dare or accept the liquid penalty.",
                  "Survive the escalation as AI intensifies the social pressure.",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="bg-black p-6 md:p-8 flex items-center gap-8 group"
                  >
                    <span className="text-2xl font-serif italic text-red-900 group-hover:text-red-600 transition-colors">
                      0{i + 1}
                    </span>
                    <span className="text-zinc-300 font-light tracking-wide">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* --- SAMPLE DOSSIERS --- */}
            <section className="mb-32">
              <div className="flex items-end justify-between border-b border-zinc-900 pb-6 mb-12">
                <h2 className="text-4xl font-serif text-white italic">
                  Challenge Samples
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 italic">
                  Classified
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    tag: "Warm-up",
                    content: "Perform a 30-second celebrity monologue.",
                  },
                  {
                    tag: "Heating Up",
                    content:
                      "Text your most recent contact: 'I need to confess something.' Drink if you decline.",
                  },
                  {
                    tag: "Peak Chaos",
                    content:
                      "Surrender your device. The group posts one story of their choice to your profile.",
                  },
                ].map((dare, i) => (
                  <div
                    key={i}
                    className="border border-zinc-900 p-8 hover:border-red-900/50 transition-all duration-500 bg-zinc-950/20"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-red-600 font-bold block mb-4">
                      {dare.tag}
                    </span>
                    <p className="text-zinc-300 font-serif italic leading-relaxed text-lg">
                      "{dare.content}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- FINAL CALL --- */}
            <section className="relative py-24 px-10 text-center border border-red-900/20 bg-[#050505] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-red-600"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-5xl md:text-7xl font-serif text-white mb-10 tracking-tighter">
                  Enter the <br />
                  <span className="text-red-600 italic">Maelstrom.</span>
                </h3>
                <Link
                  to="/"
                  state={{ defaultMode: "bff" }}
                  className="inline-flex items-center gap-8 group mb-8"
                >
                  <span className="bg-red-600 text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:bg-red-700 transition-all shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                    Initiate Session
                  </span>
                </Link>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                  No Credentials Required • Instant Execution
                </p>
              </div>
            </section>

            {/* --- OTHER MODES --- */}
            <footer className="mt-24 pt-12 border-t border-zinc-900">
              <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-800">
                  Alternative Volumes
                </div>
                <div className="flex gap-8">
                  <Link
                    to="/date-night-game"
                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors"
                  >
                    Date Night →
                  </Link>
                  <Link
                    to="/couples-party-game"
                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors"
                  >
                    Private Suite →
                  </Link>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default BFFPage;
