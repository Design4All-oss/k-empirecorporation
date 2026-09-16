import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

const BlogRecentNews = ({ recentNews }) => {
  const safeRecentNews = recentNews && Array.isArray(recentNews) ? recentNews : [];
  const defaultImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop';

  const getLink = (item) => {
    return item?.type === 'event' ? `/event/${item.slug || item.id}` : `/blog/${item.slug || item.id}`;
  };

  if (safeRecentNews.length === 0) return null;

  const [hero, ...rest] = safeRecentNews;
  const medium = rest.slice(0, 2);
  const small = rest.slice(2, 6);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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
            Articles récents
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* Hero Card — 8 cols, dark bg */}
          {hero && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-8"
            >
              <Link to={getLink(hero)} className="block group relative rounded-2xl overflow-hidden bg-primary min-h-[320px] md:min-h-[400px] flex flex-col justify-between">
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={hero?.image || defaultImage}
                    alt={hero?.title || ''}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                </div>

                {/* Top: badges */}
                <div className="relative flex items-center gap-2 p-6 md:p-8 lg:p-10 pb-0">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    hero?.type === 'event' ? 'bg-accent text-white' : 'bg-white/15 text-white backdrop-blur-sm'
                  }`}>
                    {hero?.type === 'event' ? 'Événement' : 'Article'}
                  </span>
                  {hero?.date && (
                    <span className="text-white/50 text-[11px] flex items-center gap-1">
                      <Calendar size={11} />
                      {hero.date}
                    </span>
                  )}
                </div>

                {/* Bottom: title + excerpt + CTA */}
                <div className="relative p-6 md:p-8 lg:p-10 pt-0">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white leading-tight mb-2 max-w-lg">
                    {hero?.title || 'Titre'}
                  </h3>
                  {hero?.excerpt && (
                    <p className="text-white/60 text-sm md:text-base line-clamp-2 max-w-md mb-4">
                      {hero.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                    Lire
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Medium Cards — 4 cols stacked */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
            {medium.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <Link to={getLink(item)} className="block group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-400 h-full">
                  <div className="relative h-36 md:h-40 overflow-hidden">
                    <img
                      src={item?.image || defaultImage}
                      alt={item?.title || ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        item?.type === 'event' ? 'bg-accent text-white' : 'bg-primary text-white'
                      }`}>
                        {item?.type === 'event' ? 'Événement' : 'Article'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-primary text-sm leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors duration-200">
                      {item?.title || 'Titre'}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted">
                      {item?.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} className="text-accent" />
                          {item.date}
                        </span>
                      )}
                      {item?.type !== 'event' && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {item?.readTime || '5 min'}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Small Cards — 4 cols, 2 rows */}
          {small.length > 0 && (
            <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {small.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={getLink(item)} className="block group relative rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full">
                    <div className="relative h-28 md:h-32 overflow-hidden">
                      <img
                        src={item?.image || defaultImage}
                        alt={item?.title || ''}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full ${
                          item?.type === 'event' ? 'bg-accent text-white' : 'bg-primary text-white'
                        }`}>
                          {item?.type === 'event' ? 'Événement' : 'Article'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-display font-bold text-primary text-[13px] leading-snug line-clamp-2 mb-1.5 group-hover:text-accent transition-colors duration-200">
                        {item?.title || 'Titre'}
                      </h3>
                      <span className="text-[10px] text-text-muted flex items-center gap-1">
                        <Calendar size={9} className="text-accent" />
                        {item?.date || ''}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogRecentNews;
