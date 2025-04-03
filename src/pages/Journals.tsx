
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';

// Mock data for journal articles
const articles = [
  {
    id: "1",
    title: "The Journal of African Studies: Latest Edition",
    description: "Exploring the cultural and historical developments across the African continent in this quarter's edition.",
    date: "2023-05-20",
    author: "African Studies Association",
    category: "Journals",
    image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "2",
    title: "International Medical Research Journal",
    description: "A compilation of the latest peer-reviewed medical research from across the globe.",
    date: "2023-05-15",
    author: "International Medical Association",
    category: "Journals",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "3",
    title: "Journal of Climate Research and Policy",
    description: "Research and policy recommendations addressing climate challenges specific to African regions.",
    date: "2023-05-12",
    author: "Climate Research Network",
    category: "Journals",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
];

export default function Journals() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Academic Journals</h1>
      
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
