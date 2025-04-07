
import React from 'react';
import { CategoryPage } from '@/components/CategoryPage';

export default function Business() {
  const businessArticles = [
    {
      id: "b1",
      title: "Global Markets Reach Record Highs Despite Economic Uncertainties",
      description: "Major stock indices continue to climb despite inflation concerns and supply chain disruptions.",
      content: "Full article content goes here...",
      date: "3 hrs ago",
      author: "Financial Correspondent",
      category: "Business",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      isTrending: true,
      status: "published" as const,
    },
    {
      id: "b2",
      title: "Africa's Startup Ecosystem Sees 40% Growth in Venture Capital",
      description: "African tech startups attracted record funding in Q1 2023, with fintech leading the surge.",
      content: "Full article content goes here...",
      date: "6 hrs ago",
      author: "Tech Business Editor",
      category: "Business",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      isNew: true,
      status: "published" as const,
    },
    {
      id: "b3",
      title: "Central Banks Across Africa Raise Interest Rates to Combat Inflation",
      description: "Several African nations implement coordinated monetary policy to stabilize currencies and control rising prices.",
      content: "Full article content goes here...",
      date: "1 day ago",
      author: "Economic Affairs Editor",
      category: "Business",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      status: "published" as const,
    },
    {
      id: "b4",
      title: "Why shoppers are snapping up 'stripes' products for eye-popping prices",
      description: "As Canada's Hudson's Bay Company faces an end to its 355-year legacy, shoppers are scrambling for anything with its iconic \"stripes\".",
      content: "Full article content goes here...",
      date: "14 hrs ago",
      author: "US & Canada Correspondent",
      category: "Business",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      status: "published" as const,
    },
    {
      id: "b5",
      title: "More than 50 countries contact US in bid to negotiate tariffs",
      description: "Israel's Netanyahu is heading to the US for trade talks, while Vietnam has asked for a 46-day delay.",
      content: "Full article content goes here...",
      date: "5 hrs ago",
      author: "Business Correspondent",
      category: "Business",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      isTrending: true,
      status: "published" as const,
    },
    {
      id: "b6",
      title: "African Continental Free Trade Area Implementation Accelerates",
      description: "AfCFTA sees significant progress as more countries finalize tariff reduction schedules and trade barriers come down.",
      content: "Full article content goes here...",
      date: "2 days ago",
      author: "Trade Correspondent",
      category: "Business",
      image: "https://images.unsplash.com/photo-1572455043037-e6be1a0eb4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
      isUpdated: true,
      status: "published" as const,
    },
  ];

  return (
    <CategoryPage 
      title="Business News" 
      subtitle="Latest business, economic and financial news from Africa and around the world"
      articles={businessArticles}
    />
  );
}
