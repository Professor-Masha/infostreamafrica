
import { Flag } from "lucide-react";
import { CategoryPage } from "@/components/CategoryPage";

// Mock data
const africaArticles = [
  {
    id: "af1",
    title: "Renewable Energy Initiative Transforms Rural Communities",
    description: "Solar power projects bring electricity to previously unserved villages across multiple African nations.",
    date: "June 15, 2023",
    author: "Nana Akufo",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1604004218771-c87c13fd96e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "af2",
    title: "Digital Innovation Hub Launches in Nairobi",
    description: "Tech incubator aims to support next generation of African entrepreneurs and startups.",
    date: "June 13, 2023",
    author: "Chimamanda Adichie",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: "af3",
    title: "Cultural Festival Celebrates Pan-African Heritage",
    description: "Annual event brings together artists, musicians, and writers from across the continent to showcase diversity.",
    date: "June 11, 2023",
    author: "Nelson Mandela",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1523365280197-f1149d6b91b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: true,
  },
];

const trendingAfrica = [
  {
    id: "af4",
    title: "African Continental Free Trade Agreement Shows Early Success",
    description: "Intra-continental trade increases by 25% in first year of implementation as barriers are reduced.",
    date: "June 16, 2023",
    author: "Amina Mohammed",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "af5",
    title: "Conservation Efforts Save Endangered Species in National Park",
    description: "Anti-poaching measures and habitat protection lead to recovery of wildlife populations.",
    date: "June 14, 2023",
    author: "Wangari Maathai",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "af6",
    title: "Infrastructure Project Connects Remote Regions",
    description: "New highway network improves transportation and economic opportunities for rural communities.",
    date: "June 12, 2023",
    author: "Kofi Annan",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1604918353941-eda6e4d4d629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
];

export default function Africa() {
  return (
    <CategoryPage
      title="Africa"
      icon={Flag}
      articles={africaArticles}
      trendingArticles={trendingAfrica}
    />
  );
}
