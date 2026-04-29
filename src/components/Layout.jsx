import React from "react";

const Layout = ({ children, fullWidth = false }) => {
  // Simulated social proof - in production, this would come from your backend
  const gamesPlayed = Math.floor(Math.random() * 500) + 1234;
  const gamesThisWeek = Math.floor(Math.random() * 200) + 89;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] font-sans selection:bg-rose-500/30 flex flex-col items-center justify-center p-6 md:p-12 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(18,18,18,1)_0%,_rgba(10,10,10,1)_100%)] -z-10" />

      {/* Social Proof Banner */}
      <div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">
              {gamesThisWeek} games this week
            </span>
          </div>
          <div className="w-px h-3 bg-zinc-800"></div>
          <span className="text-[9px] text-zinc-600 uppercase tracking-wider">
            {gamesPlayed.toLocaleString()} total played
          </span>
        </div>
      </div>

      <div className={`w-full`}>{children}</div>
    </div>
  );
};

export default Layout;
