import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import HomeNewsletter from '../components/home/HomeNewsletter';
import BlogHero from '../components/blog/BlogHero';
import BlogRecentNews from '../components/blog/BlogRecentNews';
import BlogArticles from '../components/blog/BlogArticles';
import { usePosts, useEvenements, useFeaturedFormations } from '../hooks';

const Blog = () => {
  const { data: apiPosts } = usePosts(1, 10);
  const { data: apiEvenements } = useEvenements();
  const { data: featuredFormations } = useFeaturedFormations();
  
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
  
  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) return isoDate.getTime();
    const frenchMonths = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
      'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
    if (match) {
      const month = frenchMonths[match[2].toLowerCase()];
      if (month !== undefined) return new Date(parseInt(match[3]), month, parseInt(match[1])).getTime();
    }
    return 0;
  };
  
  const allEvents = (apiEvenements && apiEvenements.length > 0) 
    ? apiEvenements.map(e => ({
        id: e.id, slug: e.slug, type: 'event', title: e.title,
        excerpt: e.excerpt, date: e.date, dateTimestamp: parseDate(e.date),
        time: e.time, location: e.location, spots: e.spots,
        registered: e.registered, image: e.image, format: e.format
      }))
    : [];
  
  const allPosts = (posts && posts.length > 0) ? posts.map(p => ({
    id: p.id, slug: p.slug, type: 'post', title: p.title,
    excerpt: stripHtml(p.excerpt),
    category: p.categories?.[0]?.name || p.category,
    author: typeof p.author === 'object' ? p.author?.name || 'Auteur' : p.author || 'Auteur',
    date: p.date, modified: p.modified || p.date,
    dateTimestamp: parseDate(p.modified || p.date),
    readTime: p.readTime, image: p.image
  })) : [];
  
  const allNews = [...allEvents, ...allPosts].sort((a, b) => (b.dateTimestamp || 0) - (a.dateTimestamp || 0));
  const recentNews = allNews.slice(0, 5);

  return (
    <>
      <SEO
        title="Blog & Événements"
        description="Actualités, analyses et événements de K-EMPIRE Corporation. Restez informé des dernières tendances en business, droit et management au Togo."
        url="/blog"
        image="/assets/images/blog/hero.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog K-EMPIRE Corporation",
          "description": "Actualités, analyses et événements au Togo.",
          "url": "https://www.k-empirecorporation.com/blog"
        }}
      />
      <PageBanner
        title="Blog & Événements"
        description="Actualités, analyses et événements pour rester informé"
        imageUrl="/assets/images/blog/hero.webp"
        imageAlt="Blog K-EMPIRE"
      />
      
      {featuredEvent && (
        <BlogHero featuredEvent={featuredEvent} />
      )}
      
      {recentNews.length > 0 && (
        <BlogRecentNews recentNews={recentNews} />
      )}

      {allNews.length > 0 && (
        <BlogArticles posts={allNews} />
      )}

      <HomeNewsletter />
    </>
  );
};

export default Blog;