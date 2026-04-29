import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import {
  ArrowRight,
  Bookmark,
  ScrollText,
} from "lucide-react";

const CategoryPageTemplate = ({ pageData: categoryData }) => {
  const { title, description, intro, relatedTopics, slug } = categoryData;

  // We assume 'relatedTopics' slugs are used to fetch post data.
  // For this example, I am mapping them as curated entry points.

  return (
    <>
      <SEO title={title} description={description} path={slug} />
      <Layout>
        <div className="bg-black text-zinc-400 min-h-screen selection:bg-red-700 selection:text-white font-sans antialiased">
          {/* Subtle Vertical Scroll Indicator */}
          <div className="fixed left-0 top-0 w-[1px] h-full bg-zinc-900 z-0 hidden lg:block">
            <div className="w-full h-32 bg-gradient-to-b from-red-600 to-transparent"></div>
          </div>

          <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-24 relative z-10">
            {/* --- NAVIGATION --- */}
            <nav className="mb-16 flex items-center justify-between border-b border-zinc-900 pb-8">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-zinc-500">
                <Link
                  to="/"
                  className="hover:text-red-600 transition-colors underline underline-offset-8 decoration-red-900/50"
                >
                  Atelier
                </Link>
                <span className="text-red-900">/</span>
                <span className="text-zinc-200">Archive</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-[9px] uppercase tracking-widest text-zinc-600">
                <span>Ref. {slug.toUpperCase()}</span>
                <div className="w-8 h-[1px] bg-red-900"></div>
              </div>
            </nav>

            {/* --- HEADER & CURATOR'S NOTE --- */}
            <header className="mb-24 md:mb-40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8">
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white leading-[0.85] tracking-tighter mb-12">
                    {title.split(" - ")[0]}
                    <span className="text-red-600 italic">.</span>
                  </h1>
                </div>
                <div className="lg:col-span-4 lg:pt-4">
                  <div className="p-8 border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm relative">
                    <div className="absolute -top-3 -left-3 bg-red-600 p-2">
                      <ScrollText size={16} className="text-white" />
                    </div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold mb-4">
                      Curator's Note
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-light italic">
                      "{intro}"
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* --- THE INDEX (TOPICS GRID) --- */}
            <section className="mb-40">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-red-600"></div>
                <h2 className="text-xs uppercase tracking-[0.4em] text-white font-bold">
                  The Collection Index
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                {relatedTopics.map((topic, index) => (
                  <Link
                    key={topic}
                    to={`/${topic}`}
                    className="group relative bg-black p-10 md:p-16 flex flex-col justify-between transition-all duration-700 hover:bg-zinc-950"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-16">
                        <span className="text-[10px] font-mono text-zinc-700 group-hover:text-red-900">
                          [{String(index + 1).padStart(2, "0")}]
                        </span>
                        <Bookmark
                          size={14}
                          className="text-zinc-800 group-hover:text-red-600 transition-colors"
                        />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight capitalize">
                        {topic.replace(/-/g, " ")}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-900">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200 transition-colors">
                        Access Dossier
                      </span>
                      <div className="flex items-center gap-0 group-hover:gap-4 transition-all duration-500">
                        <div className="w-0 h-[1px] bg-red-600 group-hover:w-12 transition-all duration-500"></div>
                        <ArrowRight
                          size={18}
                          className="text-red-600 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* --- CALL TO ACTION: MEMBERSHIP --- */}
            <section className="relative border border-red-900/30 bg-[#080808] p-12 md:p-24 overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/10 to-transparent pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tighter italic leading-none">
                  Experience the <br />
                  <span className="text-red-600 not-italic">
                    Extraordinary.
                  </span>
                </h2>
                <p className="text-zinc-500 text-lg mb-12 font-light leading-relaxed">
                  The most exclusive gatherings aren't found, they are
                  engineered. Access our AI-powered game modes to redefine your
                  social standard.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <Link
                    to="/"
                    state={{
                      defaultMode:
                        slug === "date-night-games"
                          ? "date"
                          : slug === "games-for-couples" || slug === "drinking-games-for-two"
                          ? "couples"
                          : "bff",
                    }}
                    className="bg-red-600 text-white px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-red-700 transition-all shadow-[0_10px_40px_rgba(220,38,38,0.15)]"
                  >
                    Begin Play
                  </Link>
                  <div className="flex items-center gap-4 text-zinc-600 group cursor-pointer">
                    <div className="w-12 h-[1px] bg-zinc-800 group-hover:bg-red-600 transition-colors"></div>
                    <span className="text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">
                      Private Concierge
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Minimalist Footer */}
          <footer className="py-16 border-t border-zinc-900 mt-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-800">
                MUSE MOMENT LUXE
              </div>
              <div className="flex gap-12">
                {["Archive", "Ethics", "Legal"].map((item) => (
                  <span
                    key={item}
                    className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-red-600 cursor-pointer transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </Layout>
    </>
  );
};

export default CategoryPageTemplate;
