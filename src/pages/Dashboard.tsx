
import React from 'react';
import { MainNavigation } from '@/components/MainNavigation';
import { FeaturedArticle } from '@/components/FeaturedArticle';
import { NewsGrid } from '@/components/NewsGrid';
import { LatestYouTubeVideo } from '@/components/LatestYouTubeVideo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data for articles
const featuredArticle = {
  id: "1",
  title: "Israel changes account of Gaza medic killings after video showed deadly attack",
  description: "Israeli forces killed 15 emergency workers in a convoy of ambulances near Rafah on 23 March, officials confirm after video evidence emerges.",
  content: "Full article content goes here...",
  date: "2023-05-20",
  author: "Middle East Correspondent",
  category: "Middle East",
  image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
  isNew: true,
  status: 'published',
};

// Secondary features
const secondaryFeatures = [
  {
    id: "2",
    title: "Two UK MPs denied entry to Israel",
    description: "Israel says Yuan Yang and Abtisam Mohamed were refused entry as they intended to \"spread hate speech\".",
    content: "Full article content goes here...",
    date: "8 hrs ago",
    author: "BBC Correspondent",
    category: "Middle East",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
    status: 'published',
  },
  {
    id: "3",
    title: "Why shoppers are snapping up 'stripes' products for eye-popping prices",
    description: "As Canada's Hudson's Bay Company faces an end to its 355-year legacy, shoppers are scrambling for anything with its iconic \"stripes\".",
    content: "Full article content goes here...",
    date: "14 hrs ago",
    author: "US & Canada Correspondent",
    category: "Business",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    status: 'published',
  },
];

// Regular articles
const articles = [
  {
    id: "4",
    title: "Le Pen calls embezzlement conviction a 'witch hunt'",
    description: "The French far-right politician spoke to a rally in Paris after being found guilty of embezzling EU funds.",
    content: "Full article content goes here...",
    date: "2 hrs ago",
    author: "Europe Correspondent",
    category: "Europe",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isNew: false,
    status: 'published',
  },
  {
    id: "5",
    title: "More than 50 countries contact US in bid to negotiate tariffs",
    description: "Israel's Netanyahu is heading to the US for trade talks, while Vietnam has asked for a 46-day delay.",
    content: "Full article content goes here...",
    date: "5 hrs ago",
    author: "Business Correspondent",
    category: "Business",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isTrending: true,
    status: 'published',
  },
  {
    id: "6",
    title: "Breakthrough in Cancer Research",
    description: "Scientists have discovered a new approach to targeting specific cancer cells that could revolutionize treatment.",
    content: "Full article content goes here...",
    date: "2023-05-08",
    author: "Dr. Michael Chen",
    category: "Health",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80",
    isUpdated: true,
    status: 'published',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="container max-w-7xl mx-auto py-6 px-4 space-y-10">
        {/* Featured story */}
        <div className="space-y-6">
          <FeaturedArticle article={featuredArticle} />
        </div>
        
        {/* Secondary features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryFeatures.map((article) => (
            <div key={article.id} className="space-y-2">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-sm text-muted-foreground">{article.description}</p>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.category}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Separator />
        
        {/* Latest news */}
        <NewsGrid articles={articles} title="Latest News" />
        
        {/* YouTube section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Latest Videos</h2>
          <LatestYouTubeVideo />
        </div>
      </div>
    </div>
  );
}

