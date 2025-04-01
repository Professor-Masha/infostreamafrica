
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleCard } from "@/components/ArticleCard";

// Mock article data
const articles = [
  {
    id: 1,
    title: "New Breakthrough in mRNA Vaccine Technology",
    description: "Scientists have developed a new approach to mRNA vaccine delivery that could improve stability and effectiveness against emerging variants.",
    date: "May 15, 2023",
    author: "Dr. Sarah Chen",
    category: "Immunology",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    content: `
      <p>Researchers at the Institute of Biomedical Innovation have announced a significant advancement in mRNA vaccine technology that could address key challenges in vaccine distribution and efficacy against viral variants.</p>
      
      <p>The team, led by Dr. Sarah Chen, has developed a novel lipid nanoparticle formulation that demonstrates enhanced stability at refrigerator temperatures for up to three months—a substantial improvement over current mRNA vaccines that typically require ultra-cold storage conditions.</p>
      
      <h2>Improved Stability and Effectiveness</h2>
      
      <p>"Our modified lipid nanoparticle structure provides better protection for the mRNA molecules," explained Dr. Chen. "This not only extends shelf life but also improves cellular uptake, potentially enhancing immune response with lower doses."</p>
      
      <p>The research, published today in the Journal of Advanced Therapeutics, demonstrated that the new formulation generated robust antibody responses against multiple SARS-CoV-2 variants in preclinical models, including those that have shown some resistance to current vaccines.</p>
      
      <h2>Implications for Global Vaccine Distribution</h2>
      
      <p>The improved temperature stability could significantly impact global vaccine distribution, particularly in regions with limited cold-chain infrastructure. Additionally, the technology platform is adaptable for various mRNA sequences, potentially accelerating development timelines for vaccines targeting emerging pathogens.</p>
      
      <p>Clinical trials are expected to begin later this year, with researchers optimistic about the potential for this technology to address both current and future pandemic threats.</p>
      
      <h2>Collaborative Effort</h2>
      
      <p>The research represents a collaborative effort between academic institutions and industry partners, with funding support from several international health organizations committed to improving global vaccine equity.</p>
    `,
    references: [
      "Chen, S. et al. (2023). Enhanced stability and immunogenicity of modified lipid nanoparticle mRNA formulations. Journal of Advanced Therapeutics, 45(3), 276-290.",
      "Williams, J. & Peterson, T. (2022). Challenges in cold-chain distribution of mRNA vaccines. International Journal of Pharmaceutical Sciences, 18(2), 142-159.",
      "Rodriguez, M. et al. (2023). Cross-variant neutralizing antibody responses to modified mRNA vaccines. Immunology Today, 34(1), 87-103."
    ],
    isNew: true,
    isTrending: true,
    isUpdated: false,
  },
  // Add isUpdated property to other articles as needed
];

// Mock related articles
const relatedArticles = [
  {
    id: 7,
    title: "Novel Protein Structure Prediction Algorithm Outperforms Previous Methods",
    description: "Computer scientists have developed a new algorithm for predicting protein structures with unprecedented accuracy, accelerating drug development.",
    date: "April 28, 2023",
    author: "Dr. David Lee",
    category: "Computational Biology",
    image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: 8,
    title: "Emerging Infectious Diseases: Preparing for the Next Pandemic",
    description: "A comprehensive review of lessons learned from recent outbreaks and recommendations for strengthening global health security infrastructure.",
    date: "April 25, 2023",
    author: "Dr. Lisa Patel",
    category: "Epidemiology",
    image: "https://images.unsplash.com/photo-1584115202321-cbfa3d714848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
  {
    id: 9,
    title: "Precision Medicine Approaches for Rare Genetic Disorders",
    description: "Advances in genomic medicine are enabling personalized therapeutic strategies for patients with previously untreatable rare genetic conditions.",
    date: "April 22, 2023",
    author: "Dr. Jennifer Adams",
    category: "Genetics",
    image: "https://images.unsplash.com/photo-1580800434532-f1e5e44fcfb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: false,
    isUpdated: false,
  },
];

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<typeof articles[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    setTimeout(() => {
      const foundArticle = articles.find((a) => a.id === Number(id));
      setArticle(foundArticle || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRelatedArticleClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center space-x-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="mb-6 mt-2 text-muted-foreground">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={handleBack}>Go back</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <article className="space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              {article.category}
            </div>
          </div>
        </div>

        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="h-auto w-full rounded-lg object-cover"
          />
        )}

        <div className="flex justify-between">
          <div className="flex gap-2">
            {article.isNew && <span className="badge-new">New</span>}
            {article.isTrending && <span className="badge-trending">Trending</span>}
            {article.isUpdated && <span className="badge-updated">Updated</span>}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.references && (
          <div>
            <h2 className="mb-4 text-xl font-bold">References</h2>
            <ul className="list-disc space-y-2 pl-5">
              {article.references.map((ref, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              author={article.author}
              category={article.category}
              image={article.image}
              onClick={() => handleRelatedArticleClick(article.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
