
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { LatestYouTubeVideo } from '@/components/LatestYouTubeVideo';

// Mock data for articles
const articles = [
  {
    id: "1",
    title: "Advancements in Pharmaceutical Research",
    description: "New developments in the field of pharmaceutical research show promising results for treatment of various diseases.",
    date: "2023-05-20",
    author: "Dr. Jane Smith",
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: true,
  },
  {
    id: "2",
    title: "Climate Change Impact on Health",
    description: "Recent studies show the direct correlation between climate change and increasing health issues in vulnerable populations.",
    date: "2023-05-15",
    author: "Prof. Robert Johnson",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
  },
  {
    id: "3",
    title: "Medical Ethics in AI Development",
    description: "As AI becomes more integrated in healthcare, ethical considerations become increasingly important.",
    date: "2023-05-12",
    author: "Dr. Sarah Williams",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "4",
    title: "Breakthrough in Cancer Research",
    description: "Scientists have discovered a new approach to targeting specific cancer cells that could revolutionize treatment.",
    date: "2023-05-08",
    author: "Dr. Michael Chen",
    category: "Research",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isUpdated: true,
  },
  {
    id: "5",
    title: "Mental Health Awareness Month",
    description: "Initiatives and resources available during Mental Health Awareness Month to support wellbeing.",
    date: "2023-05-05",
    author: "Dr. Emily Harris",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
  },
  {
    id: "6",
    title: "Nutritional Guidelines Updated",
    description: "The latest nutritional guidelines emphasize plant-based diets and sustainable food choices.",
    date: "2023-05-01",
    author: "Nutritionist Rebecca Adams",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  },
];

export default function Dashboard() {
  const navigateToArticle = (id: string) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Latest News and Updates</h1>
      
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
      
      {/* Latest YouTube Videos Section */}
      <LatestYouTubeVideo />
    </div>
  );
}
