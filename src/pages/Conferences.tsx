
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';

// Mock data for conference articles
const articles = [
  {
    id: "1",
    title: "African Technology Summit 2023",
    description: "Annual conference bringing together tech innovators and entrepreneurs from across Africa.",
    date: "2023-06-15",
    author: "Tech Africa Network",
    category: "Conferences",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
  },
  {
    id: "2",
    title: "International Healthcare Conference Nairobi",
    description: "Global healthcare professionals gather to discuss advances in medical practice and policy.",
    date: "2023-07-10",
    author: "African Medical Association",
    category: "Conferences",
    image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
  },
  {
    id: "3",
    title: "Pan-African Educational Forum",
    description: "Educators and policymakers discuss the future of education across the continent.",
    date: "2023-08-05",
    author: "Education Africa Initiative",
    category: "Conferences",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
];

export default function Conferences() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Upcoming Conferences</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            description={article.description}
            date={article.date}
            author={article.author}
            category={article.category}
            image={article.image}
            isNew={article.isNew}
            isTrending={article.isTrending}
            isUpdated={article.isUpdated}
            onClick={() => navigateToArticle(article.id)}
          />
        ))}
      </div>
    </div>
  );
}
