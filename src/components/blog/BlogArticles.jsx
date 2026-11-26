import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, '').trim() : '');

// publishedAt arrive en ISO ; on affiche « 23 août 2026 ».
const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

// « 7 min » est déjà complet en base : on n'ajoute pas un second « min ».
const readLabel = (value) => {
  const s = String(value || '').trim();
  if (!s) return '5 min de lecture';
  return /min/i.test(s) ? `${s} de lecture` : `${s} min de lecture`;
};

const getLink = (item) =>
  item.type === 'event' ? `/event/${item.slug || item.id}` : `/blog/${item.slug || item.id}`;

// Classes de span statiques : Tailwind doit les voir littéralement dans la source.
const SPAN_CLASS = {
  12: 'lg:col-span-12',
  8: 'lg:col-span-8',
  6: 'lg:col-span-6',
  4: 'lg:col-span-4',
};

// Répartition des largeurs sur 12 colonnes. Chaque rangée totalise 12 :
// N cellules pour N contenus, jamais de case vide en milieu ni en fin.
const bentoSpans = (n) => {
  if (n <= 1) return [12];
  const spans = [8, 4]; // 1 grand + 1 compagnon sur la première rangée
  let rest = n - 2;
  while (rest > 0) {
    if (rest === 1) { spans.push(12); rest = 0; }
    else if (rest === 2) { spans.push(6, 6); rest = 0; }
    else if (rest === 4) { spans.push(6, 6, 6, 6); rest = 0; }
    else { spans.push(4, 4, 4); rest -= 3; }
  }
  return spans;
};

// L'article mis en avant ou en tête, sinon le plus récent.
const withFeaturedFirst = (items) => {
  const i = items.findIndex((x) => x.featured);
  return i > 0 ? [items[i], ...items.filter((_, k) => k !== i)] : items;
};

const DatePanel = ({ date }) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-6 text-center">
      <span className="font-display text-3xl font-semibold leading-none tracking-tight text-white md:text-4xl">
        {d.getDate()}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        {d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
      </span>
    </div>
  );
};

const BlogArticles = ({ posts }) => {
  const [page, setPage] = useState(1);
  const reduce = useReducedMotion();

  const safePosts = Array.isArray(posts) ? posts : [];
  if (safePosts.length === 0) return null;

  const totalPages = Math.ceil(safePosts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const displayed = withFeaturedFirst(safePosts.slice(start, start + ITEMS_PER_PAGE));
  const spans = bentoSpans(displayed.length);

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div {...fade()} className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-[1.1] tracking-tight">
            Articles et actualités
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-lg mt-3">
            Tous nos contenus, analyses et retours d'expérience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {displayed.map((item, index) => {
            const span = spans[index] || 12;
            const isLead = index === 0;
            const excerpt = stripHtml(item.excerpt) || stripHtml(item.description);

            return (
              <motion.div
                key={item.id}
                {...fade(index * 0.04)}
                className={`${SPAN_CLASS[span]} h-full`}
              >
                <Link
                  to={getLink(item)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-colors duration-200 hover:border-accent/40"
                >
                  {/* Couverture : obligatoire, sinon panneau de substitution */}
                  {/* grow : quand la cellule s'étire sur la rangée (cellule de
                      tête + petite cellule), la couverture absorbe la hauteur
                      au lieu de laisser un vide en bas. */}
                  <div className="relative aspect-[16/9] shrink-0 grow overflow-hidden bg-primary">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || ''}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <DatePanel date={item.date} />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-text-muted">
                        <span>{formatDate(item.date)}</span>
                        <span className="text-gray-300">·</span>
                        <span>
                          {item.type === 'event' ? 'Événement' : readLabel(item.readTime)}
                        </span>
                      </div>

                      <h3
                        className={`mt-2 font-display font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent ${
                          isLead
                            ? 'text-lg line-clamp-3 md:text-2xl'
                            : 'line-clamp-2 text-base md:text-lg'
                        }`}
                      >
                        {item.title || 'Titre'}
                      </h3>

                      {excerpt && (
                        <p
                          className={`mt-2 text-sm leading-relaxed text-text-muted ${
                            isLead ? 'line-clamp-3 max-w-[65ch]' : 'line-clamp-2'
                          }`}
                        >
                          {excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-50 pt-3">
                      <div className="min-w-0">
                        <span className="block text-[11px] leading-tight text-text-muted">
                          Publié par :
                        </span>
                        <span className="block truncate text-xs font-medium leading-tight text-primary">
                          {item.author || 'K-EMPIRE CORPORATION'}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="flex-shrink-0 text-gray-300 transition-colors duration-200 group-hover:text-accent"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`h-10 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
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
                aria-current={page === i + 1 ? 'page' : undefined}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  page === i + 1 ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`h-10 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                page === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary border border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              →
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default BlogArticles;
