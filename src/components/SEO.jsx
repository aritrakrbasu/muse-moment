import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Muse Moment - The Ultimate 'Do or Drink' Party Game",
  description = "Spice up your gatherings with Muse Moment - the AI-powered party game for couples, friends, and dates. Take on daring challenges or drink as penalty. Three game modes with progressive intensity.",
  path = "",
  image = "https://aritrakrbasu.github.io/muse-moment/og-image.png",
}) => {
  const url = `https://aritrakrbasu.github.io/muse-moment/${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Muse Moment" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
