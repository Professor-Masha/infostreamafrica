
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FlaskConical, 
  Pill, 
  Leaf, 
  BookOpen, 
  Thermometer, 
  Calendar, 
  TrendingUp 
} from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Mock data
const featuredArticles = [
  {
    id: 1,
    title: "New Breakthrough in mRNA Vaccine Technology",
    description: "Scientists have developed a new approach to mRNA vaccine delivery that could improve stability and effectiveness against emerging variants.",
    date: "May 15, 2023",
    author: "Dr. Sarah Chen",
    category: "Immunology",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: true,
  },
  {
    id: 2,
    title: "The Role of Gut Microbiome in Mental Health",
    description: "Recent research establishes stronger connections between gut bacteria composition and various mental health conditions, pointing to new treatment possibilities.",
    date: "May 10, 2023",
    author: "Dr. Michael Rodriguez",
    category: "Neuroscience",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isTrending: true,
  },
  {
    id: 3,
    title: "Advancements in CRISPR Gene Editing for Inherited Diseases",
    description: "Researchers report significant progress in using CRISPR-Cas9 technology to treat sickle cell disease and beta-thalassemia in human trials.",
    date: "May 8, 2023",
    author: "Dr. James Thompson",
    category: "Genetics",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isUpdated: true,
  },
];

const latestArticles = [
  {
    id: 4,
    title: "AI-Powered Drug Discovery Platform Identifies Novel Antibiotics",
    description: "An artificial intelligence system has successfully identified a new class of antibiotics effective against drug-resistant bacteria.",
    date: "May 5, 2023",
    author: "Dr. Emily Watson",
    category: "Pharmacology",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
  },
  {
    id: 5,
    title: "Understanding Long COVID: New Insights into Chronic Symptoms",
    description: "A comprehensive study reveals potential mechanisms behind persistent symptoms in COVID-19 survivors and suggests targeted treatment approaches.",
    date: "May 3, 2023",
    author: "Dr. Robert Kim",
    category: "Virology",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
  {
    id: 6,
    title: "Biomarkers for Early Alzheimer's Detection in Blood Tests",
    description: "Scientists have identified specific blood biomarkers that may enable earlier and more accessible diagnosis of Alzheimer's disease.",
    date: "May 1, 2023",
    author: "Dr. Patricia Moore",
    category: "Neurology",
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
];

const categories = [
  { title: "Medicine", icon: Pill, count: 1245 },
  { title: "Biochemistry", icon: FlaskConical, count: 873 },
  { title: "Biology", icon: Leaf, count: 1089 },
  { title: "Clinical Research", icon: Thermometer, count: 964 },
  { title: "Journals", icon: BookOpen, count: 1532 },
  { title: "Conferences", icon: Calendar, count: 347 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  
  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };
  
  const handleCategoryClick = (category: string) => {
    navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Research</h2>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              author={article.author}
              category={article.category}
              image={article.image}
              isNew={article.isNew}
              isTrending={article.isTrending}
              isUpdated={article.isUpdated}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <section className="lg:col-span-3">
          <h2 className="mb-6 text-2xl font-bold">Latest Publications</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                date={article.date}
                author={article.author}
                category={article.category}
                image={article.image}
                isNew={article.isNew}
                isTrending={article.isTrending}
                isUpdated={article.isUpdated}
                onClick={() => handleArticleClick(article.id)}
              />
            ))}
          </div>
        </section>
        <div className="lg:col-span-1">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
