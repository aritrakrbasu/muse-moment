import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { getPageBySlug } from "./programmatic/content/pages-config";
import TopicPageTemplate from "./programmatic/templates/TopicPageTemplate";
import CategoryPageTemplate from "./programmatic/templates/CategoryPageTemplate";

const ProgrammaticPage = () => {
  const { slug } = useParams();
  const pageData = getPageBySlug(slug);

  if (!pageData) {
    return <Navigate to="/404" replace />;
  }

  // Determine if this is a topic page or category page
  const isCategoryPage = pageData.relatedTopics !== undefined;

  if (isCategoryPage) {
    return <CategoryPageTemplate pageData={pageData} />;
  }

  return <TopicPageTemplate pageData={pageData} />;
};

export default ProgrammaticPage;
