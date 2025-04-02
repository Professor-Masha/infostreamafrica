
import { Flag, Globe } from "lucide-react";
import { CategoryPage } from "@/components/CategoryPage";

// Mock data
const worldNewsArticles = [
  {
    id: "wn1",
    title: "Global Summit Addresses Climate Change Crisis",
    description: "World leaders gather to discuss urgent actions against rising global temperatures and extreme weather events.",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1623830551224-f89786251030?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "wn2",
    title: "Peace Talks Resume in Middle East Conflict",
    description: "Diplomatic efforts intensify as international mediators work to secure lasting ceasefire and negotiations.",
    date: "June 12, 2023",
    author: "Ahmed Al-Farsi",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "wn3",
    title: "Global Economy Shows Signs of Recovery Post-Pandemic",
    description: "Major economies report growth as labor markets stabilize and supply chains restore normalcy.",
    date: "June 10, 2023",
    author: "Dr. Elena Rodriguez",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1607944024060-0450380ddd33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: true,
  },
];

const trendingWorldNews = [
  {
    id: "wn4",
    title: "UN Calls for Humanitarian Aid as Crisis Deepens",
    description: "Emergency response teams mobilize as conflict zones face severe food and medical shortages.",
    date: "June 16, 2023",
    author: "Michael Chang",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "wn5",
    title: "Historic Trade Deal Signed Between Major Economies",
    description: "New agreement expected to boost global trade and create millions of jobs across participating nations.",
    date: "June 14, 2023",
    author: "Sophia Williams",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "wn6",
    title: "Technology Giants Pledge Carbon Neutrality by 2030",
    description: "Leading tech companies announce ambitious plans to combat climate change and reduce environmental impact.",
    date: "June 13, 2023",
    author: "Daniel Lee",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
];

export default function WorldNews() {
  return (
    <CategoryPage
      title="World News"
      icon={Globe}
      articles={worldNewsArticles}
      trendingArticles={trendingWorldNews}
    />
  );
}
