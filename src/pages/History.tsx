
import { History } from "lucide-react";
import { CategoryPage } from "@/components/CategoryPage";

// Mock data
const historyArticles = [
  {
    id: "his1",
    title: "Newly Discovered Artifacts Shed Light on Ancient Kingdom",
    description: "Archaeological expedition uncovers royal tomb with unprecedented insights into pre-colonial African civilization.",
    date: "June 14, 2023",
    author: "Dr. Ibrahim Touré",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "his2",
    title: "Oral History Project Preserves Indigenous Knowledge",
    description: "Initiative records elders' stories to document traditional practices and cultural heritage for future generations.",
    date: "June 12, 2023",
    author: "Professor Amina Diop",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1529448005898-b19fc13465b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "his3",
    title: "Digital Archive Restores Historical Documents",
    description: "University-led project digitizes colonial-era manuscripts, making them accessible to researchers worldwide.",
    date: "June 10, 2023",
    author: "Dr. Kwame Nkrumah",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: true,
  },
];

const trendingHistory = [
  {
    id: "his4",
    title: "Lost Medieval Trade Routes Discovered in Desert Region",
    description: "Satellite imagery reveals forgotten commercial networks that connected ancient African kingdoms.",
    date: "June 15, 2023",
    author: "Dr. Sarah Mensah",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1682687981907-170c006e3744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "his5",
    title: "Ancient Astronomical Knowledge Encoded in Historical Structures",
    description: "Researchers find evidence that ancient monuments were aligned with celestial events with surprising precision.",
    date: "June 13, 2023",
    author: "Professor Julius Nyerere",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1590283603385-5254e48a7995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "his6",
    title: "Historical Census Records Reveal Migration Patterns",
    description: "Analysis of colonial-era population data shows previously unknown demographic shifts across the continent.",
    date: "June 11, 2023",
    author: "Dr. Leopold Senghor",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1511184117514-a1e34c2e2487?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
];

export default function HistoryPage() {
  return (
    <CategoryPage
      title="History"
      icon={History}
      articles={historyArticles}
      trendingArticles={trendingHistory}
    />
  );
}
