import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import {
  Clock,
  ArrowRight,
  Users,
  Flame,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const TopicPageTemplate = ({ pageData }) => {
  const { slug, title, description, content, relatedModes } = pageData;

  const modeLinks = {
    bff: { title: "The Socialite", path: "/bff-party-game", icon: Users },
    date: { title: "Rouge Night", path: "/date-night-game", icon: Flame },
    couples: {
      title: "Private Affair",
      path: "/couples-party-game",
      icon: Sparkles,
    },
  };

  return (
    <>
      <SEO title={title} description={description} path={slug} />
      <Layout>
        <div className="bg-black text-zinc-400 min-h-screen selection:bg-red-700 selection:text-white font-sans antialiased">
          {/* Progress Bar / Decorative Line */}
          <div className="fixed top-0 left-0 w-1 h-full bg-zinc-900 z-50 hidden md:block">
            <div className="w-full h-1/3 bg-red-600"></div>
          </div>

          <article className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-24">
            {/* --- NAVIGATION --- */}
            <nav className="mb-16 md:mb-24 flex items-center justify-between border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-zinc-500">
                <Link to="/" className="hover:text-red-600 transition-colors">
                  Archive
                </Link>
                <span className="text-red-900">/</span>
                <span className="text-zinc-200 truncate max-w-[150px] md:max-w-none">
                  {title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-[10px] uppercase tracking-widest font-bold hidden md:block">
                  Volume 01
                </span>
                <div className="w-8 h-[1px] bg-red-600"></div>
              </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="mb-20 md:mb-32">
              <h1 className="text-5xl md:text-8xl lg:text-[120px] font-serif font-light text-white leading-[0.9] tracking-tighter mb-10">
                {title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      i % 3 === 0
                        ? "text-white"
                        : "text-zinc-800 italic block md:inline"
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-7">
                  <p className="text-xl md:text-3xl text-zinc-300 font-serif leading-relaxed italic border-l-2 border-red-600 pl-6">
                    {description}
                  </p>
                </div>
                <div className="md:col-span-5 flex md:justify-end">
                  <div className="flex items-center gap-4 bg-zinc-900/30 px-6 py-3 rounded-full border border-zinc-800">
                    <Clock size={16} className="text-red-600" />
                    <span className="text-xs uppercase tracking-widest text-zinc-400">
                      5 Minute Dossier
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-32">
              {/* Sidebar/Abstract */}
              <aside className="lg:col-span-4 order-2 lg:order-1">
                <div className="sticky top-12 space-y-12">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold">
                      Abstract
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-500 font-light">
                      {content.intro}
                    </p>
                  </div>
                  <div className="h-px w-full bg-zinc-900"></div>
                  <div className="space-y-6">
                    <h4 className="text-white text-xs uppercase tracking-widest font-bold">
                      Key Objectives
                    </h4>
                    <ul className="space-y-3 text-sm">
                      {content.sections.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-zinc-400"
                        >
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          {s.heading}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Main Reading Area */}
              <main className="lg:col-span-8 order-1 lg:order-2 space-y-24">
                {content.sections.map((section, index) => (
                  <section key={index} className="group">
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-red-600 font-serif text-xl italic font-bold">
                        0{index + 1}.
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-white group-hover:tracking-wider transition-all duration-700">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="md:pl-12 border-l border-zinc-900 group-hover:border-red-900/50 transition-colors">
                      <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                        {section.content}
                      </p>
                    </div>
                  </section>
                ))}
              </main>
            </div>

            {/* --- RELATED MODES (The Gallery) --- */}
            <section className="mb-32">
              <div className="mb-12 flex items-end justify-between border-b border-zinc-900 pb-6">
                <h2 className="text-4xl font-serif text-white italic">
                  Curations
                </h2>
                <div className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Play Mode Selection
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                {relatedModes.map((mode) => {
                  const modeInfo = modeLinks[mode];
                  if (!modeInfo) return null;
                  const Icon = modeInfo.icon;
                  return (
                    <Link
                      key={mode}
                      to={modeInfo.path}
                      className="group relative bg-black p-10 md:p-16 hover:bg-zinc-950 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-red-600" size={20} />
                      </div>
                      <Icon
                        className="text-red-600 mb-8 transform group-hover:-translate-y-2 transition-transform duration-500"
                        size={32}
                        strokeWidth={1}
                      />
                      <h3 className="text-2xl font-serif text-white mb-4">
                        {modeInfo.title}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-zinc-600 group-hover:text-red-500 transition-colors">
                        Launch Experience
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* --- CALL TO ACTION (The Black Card) --- */}
            <section className="bg-zinc-950 border border-red-900/20 p-8 md:p-20 text-center relative overflow-hidden">
              {/* Subtle background texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tighter">
                  Ready for the{" "}
                  <span className="text-red-600 italic">Unforgettable?</span>
                </h3>
                <p className="text-zinc-500 text-lg mb-12 font-light italic">
                  Muse Moment creates bespoke challenges for those who demand
                  more from their evening.
                </p>
                <Link
                  to="/"
                  state={{ defaultMode: relatedModes?.[0] || null }}
                  className="inline-flex items-center gap-8 group"
                >
                  <span className="text-white text-xs uppercase tracking-[0.4em] font-bold border-b border-red-600 pb-2 group-hover:text-red-600 transition-all">
                    Enter the Atelier
                  </span>
                  <ChevronRight className="text-red-600 group-hover:translate-x-4 transition-transform" />
                </Link>
              </div>
            </section>
          </article>

          {/* Footer Minimalist */}
          <footer className="py-12 border-t border-zinc-900 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-700">
              © 2026 Muse Moment Luxe • All Rights Reserved
            </p>
          </footer>
        </div>
      </Layout>
    </>
  );
};

export default TopicPageTemplate;
