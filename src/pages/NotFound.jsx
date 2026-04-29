import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Muse Moment"
        description="The page you're looking for doesn't exist. Start a new game of Muse Moment!"
      />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-6xl font-bold text-zinc-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md">
            The page you're looking for doesn't exist. Let's get you back to the
            game!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
