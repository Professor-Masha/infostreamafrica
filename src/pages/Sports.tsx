
import { Trophy } from "lucide-react";
import { CategoryPage } from "@/components/CategoryPage";

// Mock data
const sportsArticles = [
  {
    id: "sp1",
    title: "African Nations Cup Final Sets Viewership Records",
    description: "The tournament's finale became the most-watched sporting event in African television history.",
    date: "June 14, 2023",
    author: "Emmanuel Okoye",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "sp2",
    title: "Local Marathon Runner Breaks Continental Record",
    description: "Kenyan athlete sets new African record in international marathon, securing Olympic qualification.",
    date: "June 12, 2023",
    author: "Diana Mwangi",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "sp3",
    title: "Football League Announces Major Expansion Plans",
    description: "Continental football governing body unveils strategy to develop youth leagues across 15 countries.",
    date: "June 10, 2023",
    author: "Samuel Eto'o",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: true,
  },
];

const trendingSports = [
  {
    id: "sp4",
    title: "Basketball Tournament Showcases Rising African Talent",
    description: "Scouts from international leagues attend championship as young players demonstrate world-class skills.",
    date: "June 15, 2023",
    author: "Charles Njoku",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "sp5",
    title: "Cricket Gains Popularity Across African Nations",
    description: "New grassroots programs introduce the sport to thousands of children in previously untapped regions.",
    date: "June 13, 2023",
    author: "Tendai Mtawarira",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "sp6",
    title: "New Training Center Established for Olympic Athletes",
    description: "State-of-the-art facility aims to prepare African athletes for international competition at highest levels.",
    date: "June 11, 2023",
    author: "Blessing Okagbare",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
];

export default function Sports() {
  return (
    <CategoryPage
      title="Sports"
      icon={Trophy}
      articles={sportsArticles}
      trendingArticles={trendingSports}
    />
  );
}
