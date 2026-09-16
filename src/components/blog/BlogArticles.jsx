import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const BlogArticles = ({ posts }) => {
  const [page, setPage] = useState(1);
  const safePosts = posts && Array.isArray(posts) ? posts : [];
  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168d8c?w=600&h=400&fit=crop';

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  if (safePosts.length === 0) return null;

  const totalPages = Math.ceil(safePosts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const displayed = safePosts.slice(start, start + ITEMS_PER_PAGE);
  const features = displayed.slice(0, 2);
  const rest = displayed.slice(2);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-[1.1] tracking-tight">
            Articles et actualités
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-lg mt-3">
            Tous nos contenus, analyses et retours d'expérience.
          </p>
        </motion.div>

        {/* Feature Cards — 2 large landscape */}
        {features.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {features.map((item, index) => {
              const type = item.type || 'post';
              const link = type === 'event' ? `/event/${item.slug || item.id}` : `/blog/${item.slug || item.id}`;
              const excerpt = stripHtml(item.excerpt) || stripHtml(item.description) || '';
              const category = item.category || (type === 'event' ? 'Événement' : null);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={link} className="block group relative rounded-2xl overflow-hidden bg-primary min-h-[280px] md:min-h-[340px] flex flex-col justify-between">
                    <div className="absolute inset-0">
                      <img
                        src={item?.image || defaultImage}
                        alt={item?.title || 'Article'}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                    </div>

                    {/* Top: badges */}
                    <div className="relative flex items-center gap-2 p-5 md:p-7 pb-0">
                      {category && (
                        <span className="inline-block px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {category}
                        </span>
                      )}
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        type === 'event' ? 'bg-accent text-white' : 'bg-white/10 text-white'
                      }`}>
                        {type === 'event' ? 'Événement' : 'Article'}
                      </span>
                    </div>

                    {/* Bottom: title + excerpt + CTA */}
                    <div className="relative p-5 md:p-7 pt-0">
                      <h3 className="text-lg md:text-xl font-display font-bold text-white leading-snug line-clamp-2 mb-2">
                        {item?.title || 'Titre'}
                      </h3>

                      {excerpt && (
                        <p className="text-white/55 text-sm line-clamp-2 max-w-md mb-3">
                          {excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[11px] text-white/50">
                          {item?.time && (
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {item.time}
                            </span>
                          )}
                          {item?.location && type === 'event' && (
                            <span className="flex items-center gap-1">
                              <MapPin size={11} />
                              {item.location}
                            </span>
                          )}
                        </div>
                        <span className="text-accent text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Lire
                          <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Rest — 3-col grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((item, index) => {
              const type = item.type || 'post';
              const link = type === 'event' ? `/event/${item.slug || item.id}` : `/blog/${item.slug || item.id}`;
              const excerpt = stripHtml(item.excerpt) || stripHtml(item.description) || '';
              const category = item.category || (type === 'event' ? 'Événement' : null);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={link} className="block group h-full">
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-accent/15 transition-all duration-400 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={item?.image || defaultImage}
                          alt={item?.title || 'Article'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                        {category && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {category}
                            </span>
                          </div>
                        )}

                        <div className="absolute top-3 right-3">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            type === 'event' ? 'bg-accent text-white' : 'bg-primary/90 text-white'
                          }`}>
                            {type === 'event' ? 'Événement' : 'Article'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-primary text-[15px] leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors duration-200">
                          {item?.title || 'Titre'}
                        </h3>

                        {excerpt && (
                          <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">
                            {excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                          <div className="flex items-center gap-2 text-[10px] text-text-muted">
                            {item?.date && (
                              <span className="flex items-center gap-1">
                                <Calendar size={10} className="text-accent" />
                                {item.date}
                              </span>
                            )}
                            {item?.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {item.time}
                              </span>
                            )}
                          </div>
                          <ArrowUpRight size={14} className="text-gray-300 group-hover:text-accent transition-colors duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`h-10 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                page === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary border border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              ←
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  page === i + 1
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-text-muted hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`h-10 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                page === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary border border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogArticles;
