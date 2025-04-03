
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';

// Mock data for technology articles
const articles = [
  {
    id: "1",
    title: "Advancements in AI Research",
    description: "New breakthroughs in artificial intelligence are pushing the boundaries of what machines can learn and accomplish.",
    date: "2023-05-20",
    author: "Dr. Alan Turing",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "2",
    title: "The Future of Renewable Energy Tech",
    description: "Innovative solutions in energy storage and distribution could accelerate the transition to renewable sources.",
    date: "2023-05-15",
    author: "Prof. Maria Rodriguez",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "3",
    title: "Blockchain Applications Beyond Cryptocurrency",
    description: "How blockchain technology is being applied to solve problems in healthcare, supply chain, and governance.",
    date: "2023-05-12",
    author: "Dr. Wei Dai",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
];

export default function Technology() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Technology Innovations</h1>
      
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
