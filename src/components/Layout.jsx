import React from "react";

const Layout = ({ children, fullWidth = false }) => (
  <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] font-sans selection:bg-rose-500/30 flex flex-col items-center justify-center p-6 md:p-12 overflow-x-hidden">
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(18,18,18,1)_0%,_rgba(10,10,10,1)_100%)] -z-10" />
    <div className={`w-full ${fullWidth ? "max-w-5xl" : "max-w-2xl"}`}>
      {children}
    </div>
  </div>
);

export default Layout;
