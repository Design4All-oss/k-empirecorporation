import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import Button from '../ui/Button';
import Slider from '../ui/Slider';
import { useFormations, useFeaturedFormations } from '../../hooks';

// Formation Card Component
const FormationCard = ({ formation }) => (
  <Link to={`/formations/${formation?.slug || ''}`} className="block h-full">
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 h-full cursor-pointer">
      <div className="relative h-56 overflow-hidden">
        <img
          src={formation?.image || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop'}
          alt={formation?.title || 'Formation'}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60" />
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
          {formation?.category || 'Formation'}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full">
            {formation?.level || 'Tous niveaux'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-primary font-display mb-3 line-clamp-2 leading-snug">
          {formation?.title || 'Titre de la formation'}
        </h3>
        <p className="text-sm text-text-muted mb-5 line-clamp-2 leading-relaxed">
          {formation?.hook || 'Description de la formation'}
        </p>
        <div className="flex items-center gap-4 text-xs text-text-muted mb-5">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-accent flex-shrink-0" />
            <span>{formation?.duration || 'Contactez-nous'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent flex-shrink-0" />
            <span className="truncate">{formation?.format || 'Présentiel / En ligne'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-text-muted">Tarif</span>
            <span className={`text-lg font-bold ${formation?.price ? 'text-accent' : 'text-green-600'}`}>
              {formation?.price ? 'Formation payante' : 'Formation gratuite'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// Extraire les catégories uniques
const getCategories = (formations) => {
  if (!formations || !Array.isArray(formations)) return [];
  const categories = formations.map(f => f.category).filter(Boolean);
  return [...new Set(categories)];
};

const FormationsCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [activeLevel, setActiveLevel] = useState("Tous niveaux");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: apiFormations, isLoading, error } = useFormations();
  const { data: featuredFromApi } = useFeaturedFormations();

  const formations = apiFormations || [];
  const featuredFromData = (featuredFromApi || []).filter(f => f.featured);

  // Categories disponibles
  const categories = ["Toutes", ...getCategories(formations)];
  const levels = ["Tous niveaux", "Intermédiaire", "Avancé"];

  // Filter formations
  const filteredFormations = formations.filter(formation => {
    const title = formation.title || '';
    const hook = formation.hook || '';
    const matchesCategory = activeCategory === "Toutes" || formation.category === activeCategory;
    const matchesLevel = activeLevel === "Tous niveaux" || formation.level === activeLevel;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Featured formations - only show when no filters are active
  const isFiltering = searchQuery || activeCategory !== "Toutes" || activeLevel !== "Tous niveaux";
  const featuredFormations = isFiltering ? [] : (featuredFromData || []).filter(f => f.featured);
  const regularFormations = filteredFormations.filter(f => !f.featured);
  
  // Calculate slides - minimum 2 items per slide for proper display
  const itemsPerSlide = regularFormations.length >= 2 ? Math.min(3, regularFormations.length) : 1;
  const totalSlides = Math.max(1, Math.ceil(regularFormations.length / itemsPerSlide));

  return (
    <section id="formations" className="py-24 md:py-32 bg-white" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-label text-accent">
            Catalogue
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-6">
            Nos formations disponibles
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {isLoading 
              ? 'Chargement des formations...' 
              : 'Filtrez nos formations par thématique, niveau et format pour trouver le programme qui répond à vos attentes.'}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Search and Level on same row */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            {/* Search Bar with icon outside - orange circle background */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Search size={20} className="text-white" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 bg-transparent border border-border rounded-full text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-all"
              />
            </div>

            {/* Level Filter - pushed to right */}
            <div className="flex-1 flex justify-end">
              <div className="flex gap-2 flex-wrap">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      activeLevel === level
                        ? 'bg-accent text-white'
                        : 'bg-bg-alt text-text-muted hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Toggle Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-bg-alt rounded-xl mb-4"
          >
            <span className="flex items-center gap-2 text-text">
              <Filter size={18} />
              Filtres
            </span>
            <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Categories Filter */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-bg-alt text-text-muted hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 mb-8">
            <p className="text-red-500">Erreur lors du chargement des formations. Veuillez réessayer.</p>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && !error && (
          <div className="mb-8">
            <p className="text-text-muted">
              <span className="font-semibold text-text">{regularFormations.length}</span> formation{regularFormations.length > 1 ? 's' : ''} trouvée{regularFormations.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {filteredFormations.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-bg-alt rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-text-muted" />
              </div>
              <h3 className="text-xl font-bold text-primary font-display mb-3">
                Aucune formation trouvée
              </h3>
              <p className="text-text-muted max-w-md mx-auto mb-6">
                Essayez de modifier vos critères de recherche ou explorez toutes nos formations.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory("Toutes");
                  setActiveLevel("Tous niveaux");
                  setSearchQuery("");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Formation */}
        {featuredFormations.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative bg-gradient-to-br from-primary to-[#0a2d47] rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredFormations[0].image}
                    alt={featuredFormations[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent lg:from-primary/60" />
                  <div className="absolute top-4 left-4 px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-full">
                    Formation à la une
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                      {featuredFormations[0].category}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                      {featuredFormations[0].level}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white font-display mb-4">
                    {featuredFormations[0].title}
                  </h3>
                  <p className="text-white/70 mb-6">
                    {featuredFormations[0].hook}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock size={18} className="text-accent" />
                      <span>{featuredFormations[0].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin size={18} className="text-accent" />
                      <span>{featuredFormations[0].format}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar size={18} className="text-accent" />
                      <span>{featuredFormations[0].nextSession}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/60 text-sm">Tarif</span>
                      <div className={`text-2xl font-bold font-display ${featuredFormations[0].price ? 'text-accent' : 'text-green-400'}`}>
                        {featuredFormations[0].price ? 'Formation payante' : 'Formation gratuite'}
                      </div>
                    </div>
                    <Button variant="primary" className="group">
                      <span>Demander un devis</span>
                      <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Formations Grid - Slider Style */}
        {regularFormations.length > 0 && !isLoading && (
          <div className="mt-12">
            {totalSlides > 1 ? (
              <>
                <Slider 
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                  totalSlides={totalSlides}
                  itemsPerSlide={itemsPerSlide}
                  actions={
                    regularFormations.length > 6 && (
                      <span className="text-primary font-medium text-sm">
                        Voir plus de formations
                      </span>
                    )
                  }
                >
                  {regularFormations.map((formation, index) => (
                    <motion.div
                      key={formation.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="px-4"
                    >
                      <FormationCard formation={formation} />
                    </motion.div>
                  ))}
                </Slider>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularFormations.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <FormationCard formation={formation} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FormationsCatalog;