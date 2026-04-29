import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import {
  Heart,
  Flame,
  Sparkles,
  Target,
  Wine,
  ChevronRight,
  Star,
} from "lucide-react";

const DatePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Muse Moment - Date Night Game",
    description:
      "An intimate romantic encounter. AI-curated challenges progressing from chemistry to tension to a spicy finale.",
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 2, maxValue: 2 },
  };

  return (
    <>
      <SEO
        title="Date Night Game - The Rendezvous | Muse Moment"
        description="Elevate your evening. AI-generated romantic challenges that progress from breaking the ice to a spicy finale. Designed for elite date nights."
        path="/date-night-game"
        schema={structuredData}
      />
      <Layout>
        <div className="bg-black text-zinc-400 min-h-screen selection:bg-rose-900 selection:text-white font-sans antialiased">
          <article className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
            {/* --- HERO SECTION --- */}
            <header className="mb-32 md:mb-48 flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center p-4 border border-rose-900/30 rounded-full mb-10 group hover:border-rose-600 transition-colors duration-700">
                <Heart
                  size={32}
                  className="text-rose-600 group-hover:scale-110 transition-transform"
                  strokeWidth={1}
                />
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white leading-none tracking-tighter mb-10">
                The <span className="text-rose-600 italic">Rendezvous.</span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-400 font-serif italic leading-relaxed max-w-2xl border-x border-rose-900/20 px-12">
                Transform a standard evening into a curated adventure. Tension
                by design. Connection by choice.
              </p>
            </header>

            {/* --- THE THREE ACTS (FEATURES) --- */}
            <section className="mb-40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Act I: Chemistry",
                    icon: Sparkles,
                    desc: "Subtle icebreakers and playful confessions to ease into the evening's flow.",
                  },
                  {
                    title: "Act II: Tension",
                    icon: Flame,
                    desc: "The stakes rise. Challenges become more intimate as the connection deepens.",
                  },
                  {
                    title: "Act III: Finale",
                    icon: Target,
                    desc: "A daring conclusion. High-intensity challenges for those who don't play it safe.",
                  },
                ].map((act, i) => (
                  <div
                    key={i}
                    className="relative group text-center md:text-left"
                  >
                    <div className="mb-6 flex justify-center md:justify-start">
                      <act.icon
                        className="text-rose-900 group-hover:text-rose-500 transition-colors"
                        size={40}
                        strokeWidth={1}
                      />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-4 italic">
                      {act.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 font-light group-hover:text-zinc-300 transition-colors">
                      {act.desc}
                    </p>
                    <div className="mt-6 h-px w-0 bg-rose-600 group-hover:w-full transition-all duration-700"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- OPERATIONAL FLOW --- */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
              <div className="lg:col-span-4 bg-zinc-950 p-12 border border-zinc-900">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-rose-600 font-bold mb-10">
                  Execution
                </h2>
                <div className="space-y-10">
                  {[
                    {
                      n: "01",
                      t: "Guest Registration",
                      d: "Identify both participants for bespoke challenges.",
                    },
                    {
                      n: "02",
                      t: "Duration Selection",
                      d: "Choose between 10, 20, or 30 rounds of play.",
                    },
                    {
                      n: "03",
                      t: "Liquid Penance",
                      d: "Complete the dare or accept the cocktail penalty.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <span className="text-xs font-serif italic text-rose-900">
                        {step.n}
                      </span>
                      <div>
                        <h4 className="text-zinc-200 text-sm font-bold tracking-widest uppercase mb-2">
                          {step.t}
                        </h4>
                        <p className="text-xs text-zinc-600">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- SAMPLE BRIEF (DARES) --- */}
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-white">
                    Sample Dossiers
                  </h3>
                  <div className="h-px flex-grow bg-zinc-900"></div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      label: "Chemistry",
                      task: "Recount the precise moment you knew they were different. Penalty: 2 drinks.",
                    },
                    {
                      label: "Tension",
                      task: "A 30-second sensory massage. They drink if you lose focus early.",
                    },
                    {
                      label: "Finale",
                      task: "A whispered confession of a hidden desire. Drink to keep the secret.",
                    },
                  ].map((sample, i) => (
                    <div
                      key={i}
                      className="group p-8 border border-zinc-900 hover:border-rose-900/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-rose-700 mb-2 block">
                          {sample.label}
                        </span>
                        <p className="text-lg font-serif italic text-zinc-300 group-hover:text-white transition-colors">
                          "{sample.task}"
                        </p>
                      </div>
                      <ChevronRight
                        className="text-zinc-800 group-hover:text-rose-600 transition-all"
                        size={20}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- CURATED FOR --- */}
            <section className="mb-40 py-20 border-y border-zinc-900">
              <div className="text-center mb-16">
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 font-bold">
                  Ideal Applications
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
                {[
                  "Anniversary Eves",
                  "Valentine Protocols",
                  "Private Residences",
                  "New Connections",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Star size={12} className="text-rose-900" />
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-light italic">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* --- FINAL CALL --- */}
            <section className="text-center">
              <Link
                to="/"
                state={{ defaultMode: "date" }}
                className="inline-block relative group"
              >
                <div className="absolute -inset-4 border border-rose-900/20 group-hover:border-rose-600 transition-all duration-700 rounded-full scale-110 opacity-0 group-hover:opacity-100"></div>
                <span className="bg-rose-700 text-white px-16 py-6 text-[10px] uppercase tracking-[0.5em] font-bold inline-block group-hover:bg-rose-600 transition-all relative z-10">
                  Begin The Rendezvous
                </span>
              </Link>
              <div className="mt-12 flex items-center justify-center gap-4 text-zinc-700 text-[9px] uppercase tracking-widest">
                <Wine size={14} />
                <span>Enjoy Responsibly</span>
                <span className="w-1 h-1 bg-rose-900 rounded-full"></span>
                <span>Private Session</span>
              </div>
            </section>

            {/* --- FOOTER MODES --- */}
            <footer className="mt-40 pt-12 border-t border-zinc-900">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <span className="text-[9px] uppercase tracking-[0.8em] text-zinc-800">
                  Muse Moment Archive
                </span>
                <div className="flex gap-12">
                  <Link
                    to="/bff-party-game"
                    className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-rose-600 transition-colors"
                  >
                    The Socialite Mode
                  </Link>
                  <Link
                    to="/couples-party-game"
                    className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-rose-600 transition-colors"
                  >
                    The Private Suite
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

export default DatePage;
