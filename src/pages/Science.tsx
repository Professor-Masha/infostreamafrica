
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';

// Mock data for science articles
const articles = [
  {
    id: "1",
    title: "New Breakthrough in Quantum Computing",
    description: "Scientists have achieved a significant breakthrough in quantum computing, potentially revolutionizing the field.",
    date: "2023-05-20",
    author: "Dr. Jane Smith",
    category: "Science",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
  },
  {
    id: "2",
    title: "Discoveries in Astrophysics",
    description: "Recent telescopic observations have revealed new insights into distant galaxies and their formation.",
    date: "2023-05-15",
    author: "Prof. Robert Johnson",
    category: "Science",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
  },
  {
    id: "3",
    title: "Advancements in Particle Physics",
    description: "CERN researchers have identified new properties of subatomic particles through recent experiments.",
    date: "2023-05-12",
    author: "Dr. Sarah Williams",
    category: "Science",
    image: "https://images.unsplash.com/photo-1636466497217-26a42372b966?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
];

export default function Science() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Science News and Research</h1>
      
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
