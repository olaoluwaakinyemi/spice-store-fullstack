import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "SpiceStore - Premium Spices from Around the World",
  description = "Discover authentic, high-quality spices sourced from around the globe. Shop our collection of organic spices, exotic blends, and culinary essentials.",
  keywords = "spices, organic spices, exotic spices, spice blends, culinary spices, buy spices online",
  image = "https://your-domain.vercel.app/og-image.jpg",
  url = "https://your-domain.vercel.app",
  type = "website",
}) => {
  const siteTitle = "SpiceStore";
  const fullTitle = title.includes(siteTitle)
    ? title
    : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="SpiceStore" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
