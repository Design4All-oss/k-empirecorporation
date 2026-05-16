import React, { useState } from 'react';
import PageBanner from '../components/ui/PageBanner';
import HomeNewsletter from '../components/home/HomeNewsletter';
import BlogHero from '../components/blog/BlogHero';
import BlogRecentNews from '../components/blog/BlogRecentNews';
import BlogArticles from '../components/blog/BlogArticles';
import { usePosts, useEvenements, useFeaturedFormations } from '../hooks';

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPostsSlide, setCurrentPostsSlide] = useState(0);

  const { data: apiPosts, isLoading: postsLoading } = usePosts(1, 10);
  const { data: apiEvenements, isLoading: eventsLoading } = useEvenements();
  const { data: featuredFormations, isLoading: formationsLoading } = useFeaturedFormations();

  const isLoading = postsLoading || eventsLoading || formationsLoading;
  
  const posts = apiPosts || [];
  
  const featuredEvent = (featuredFormations && featuredFormations.length > 0) ? {
    id: featuredFormations[0].id,
    slug: featuredFormations[0].slug,
    type: featuredFormations[0].type || 'Formation',
    title: featuredFormations[0].title,
    date: featuredFormations[0].date,
    time: featuredFormations[0].time,
    location: featuredFormations[0].location,
    spots: featuredFormations[0].spots,
    registered: featuredFormations[0].registered,
    image: featuredFormations[0].image,
    format: featuredFormations[0].format
  } : null;
  
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };
  
  // Fonction pour parser les dates (gère format ISO et format français)
  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    // Essayer de parser comme ISO
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate.getTime();
    }
    // Essayer de parser le format français (ex: "20 Avril 2026")
    const frenchMonths = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
      'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
    if (match) {
      const day = parseInt(match[1]);
      const month = frenchMonths[match[2].toLowerCase()];
      const year = parseInt(match[3]);
      if (month !== undefined) {
        return new Date(year, month, day).getTime();
      }
    }
    return 0;
  };
  
  // Transformer les événements - ajouter dateTimestamp pour le tri
  const allEvents = (apiEvenements && apiEvenements.length > 0) 
    ? apiEvenements.map(e => ({
        id: e.id,
        slug: e.slug,
        type: 'event',
        title: e.title,
        excerpt: e.excerpt,
        date: e.date,
        dateTimestamp: parseDate(e.date),
        time: e.time,
        location: e.location,
        spots: e.spots,
        registered: e.registered,
        image: e.image,
        format: e.format
      }))
    : [];
  
  // Transformer les articles - utiliser modified si disponible, sinon date
  const allPosts = (posts && posts.length > 0) ? posts.map(p => ({
    id: p.id,
    slug: p.slug,
    type: 'post',
    title: p.title,
    excerpt: stripHtml(p.excerpt),
    category: p.categories?.[0]?.name || p.category,
    author: typeof p.author === 'object' ? p.author?.name || 'Auteur' : p.author || 'Auteur',
    date: p.date,
    modified: p.modified || p.date,
    dateTimestamp: parseDate(p.modified || p.date),
    dateFormatted: p.date ? new Date(p.date).toLocaleDateString('fr-FR') : '',
    readTime: p.readTime,
    image: p.image
  })) : [];
  
  // Combiner et trier par dateTimestamp (plus récent en premier)
  // Tout est mélangé - tri uniquement par date
  const allNews = [...allEvents, ...allPosts].sort((a, b) => {
    const aTime = a.dateTimestamp || 0;
    const bTime = b.dateTimestamp || 0;
    console.log(`Sorting: ${a.title} (${aTime}) vs ${b.title} (${bTime}) = ${bTime - aTime}`);
    return bTime - aTime;
  });
  
  // Debug - retirer après tests
  console.log('All news (sorted):', allNews.map(n => ({ title: n.title, date: n.date, timestamp: n.dateTimestamp, type: n.type })));
  
  // Prendre les 4 premières nouvelles pour le slider
  const recentNews = allNews.slice(0, 4);
  
  console.log('Recent news (top 4):', recentNews.map(n => ({ title: n.title, date: n.date, timestamp: n.dateTimestamp, type: n.type })));

  const itemsPerSlide = 5;
  const totalSlides = recentNews.length > 0 ? Math.max(1, Math.ceil(recentNews.length / itemsPerSlide)) : 1;
  const postsPerSlide = 3;
  const totalPostsSlides = posts.length > 0 ? Math.ceil(posts.length / postsPerSlide) : 1;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const nextPostsSlide = () => setCurrentPostsSlide((prev) => (prev + 1) % totalPostsSlides);
  const prevPostsSlide = () => setCurrentPostsSlide((prev) => (prev - 1 + totalPostsSlides) % totalPostsSlides);

  return (
    <>
      <PageBanner
        title="Blog & Événements"
        description="Actualités, analyses et événements pour rester informé"
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Blog K-EMPIRE"
      />
      
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="mt-4 text-text-muted">Chargement des donnees...</p>
        </div>
      ) : (
        <>
          {featuredEvent && (
            <BlogHero featuredEvent={featuredEvent} />
          )}
          
          {recentNews.length > 0 && (
            <BlogRecentNews 
              recentNews={recentNews}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              totalSlides={totalSlides}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            />
          )}
          
          {posts.length > 0 && (
            <BlogArticles 
              posts={posts}
              currentPostsSlide={currentPostsSlide}
              setCurrentPostsSlide={setCurrentPostsSlide}
              totalPostsSlides={totalPostsSlides}
              nextPostsSlide={nextPostsSlide}
              prevPostsSlide={prevPostsSlide}
            />
          )}
        </>
      )}

      <div className="relative z-50 px-4 -mt-48">
        <HomeNewsletter />
      </div>
    </>
  );
};

export default Blog;