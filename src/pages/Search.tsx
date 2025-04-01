
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ArticleCard } from "@/components/ArticleCard";

// Mock search results
const allArticles = [
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
  {
    id: 7,
    title: "Novel Protein Structure Prediction Algorithm Outperforms Previous Methods",
    description: "Computer scientists have developed a new algorithm for predicting protein structures with unprecedented accuracy, accelerating drug development.",
    date: "April 28, 2023",
    author: "Dr. David Lee",
    category: "Computational Biology",
    image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
  {
    id: 8,
    title: "Emerging Infectious Diseases: Preparing for the Next Pandemic",
    description: "A comprehensive review of lessons learned from recent outbreaks and recommendations for strengthening global health security infrastructure.",
    date: "April 25, 2023",
    author: "Dr. Lisa Patel",
    category: "Epidemiology",
    image: "https://images.unsplash.com/photo-1584115202321-cbfa3d714848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
  {
    id: 9,
    title: "Precision Medicine Approaches for Rare Genetic Disorders",
    description: "Advances in genomic medicine are enabling personalized therapeutic strategies for patients with previously untreatable rare genetic conditions.",
    date: "April 22, 2023",
    author: "Dr. Jennifer Adams",
    category: "Genetics",
    image: "https://images.unsplash.com/photo-1580800434532-f1e5e44fcfb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
  {
    id: 10,
    title: "The Impact of Climate Change on Vector-Borne Diseases",
    description: "Researchers document shifting patterns of mosquito-borne and tick-borne illnesses as global temperatures rise, with implications for public health preparedness.",
    date: "April 20, 2023",
    author: "Dr. Thomas Wilson",
    category: "Environmental Health",
    image: "https://images.unsplash.com/photo-1555672157-5f7a028a9208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(allArticles);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate search API call
      setTimeout(() => {
        const filtered = allArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.description.toLowerCase().includes(query.toLowerCase()) ||
            article.category.toLowerCase().includes(query.toLowerCase()) ||
            article.author.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);
    } else {
      setResults(allArticles);
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Search Medical Research</h1>
        <div className="w-full max-w-3xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {query ? `Results for "${query}"` : "All Articles"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="article-card h-[350px] animate-pulse bg-muted"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.length > 0 ? (
            results.map((article) => (
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
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search terms or browse categories instead.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
