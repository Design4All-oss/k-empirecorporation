import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Users } from 'lucide-react';

const BlogHero = ({ featuredEvent }) => {
  const eventLink = featuredEvent?.slug ? `/formations/${featuredEvent.slug}` : '#';
  const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=120&h=80&fit=crop';

  return (
    <div className="bg-accent">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={eventLink}
          className="flex items-center gap-5 py-4 group"
        >
          {/* Image */}
          <img
            src={featuredEvent?.image || defaultImage}
            alt=""
            className="w-24 h-16 md:w-32 md:h-20 rounded-lg object-cover flex-shrink-0"
          />

          {/* Texte + infos */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Formation à la une</span>
            </div>
            <p className="text-[15px] md:text-base font-bold text-white truncate leading-tight mb-1.5">
              {featuredEvent?.title || 'Formation en cours'}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-white/60">
              {featuredEvent?.date && (
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {featuredEvent.date}
                </span>
              )}
              {featuredEvent?.time && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {featuredEvent.time}
                </span>
              )}
              {featuredEvent?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {featuredEvent.location}
                </span>
              )}
              {featuredEvent?.spots && (
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {featuredEvent.registered}/{featuredEvent.spots} places
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors flex-shrink-0">
            Découvrir
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogHero;
