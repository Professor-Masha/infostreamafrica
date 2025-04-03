
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';

// Mock data for health articles
const articles = [
  {
    id: "1",
    title: "New Findings on Mental Health and Exercise",
    description: "Recent studies show a strong correlation between regular exercise and improved mental health outcomes.",
    date: "2023-05-20",
    author: "Dr. Emily Harris",
    category: "Health",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
  },
  {
    id: "2",
    title: "Advances in Vaccine Technology",
    description: "New vaccine platforms show promise for addressing a wider range of infectious diseases.",
    date: "2023-05-15",
    author: "Dr. Michael Chen",
    category: "Health",
    image: "https://images.unsplash.com/photo-1584462280065-2ea0bea3ac3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
  },
  {
    id: "3",
    title: "Nutrition Guidelines for Heart Health",
    description: "Cardiologists release updated dietary recommendations for maintaining heart health across all age groups.",
    date: "2023-05-12",
    author: "Nutritionist Rebecca Adams",
    category: "Health",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
];

export default function Health() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Health and Wellness</h1>
      
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
