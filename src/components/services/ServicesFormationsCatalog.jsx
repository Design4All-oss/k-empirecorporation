import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  MapPin, 
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Filter
} from 'lucide-react';
import Button from '../ui/Button';

// Formations catalog data
const formations = [
  {
    id: 1,
    title: "Sécurisation des contrats d'affaires en droit OHADA",
    hook: "Maîtrisez les principes juridiques essentiels pour sécuriser vos contrats et réduire les risques.",
    duration: "3 jours",
    format: "Présentiel / En ligne",
    audience: "Juristes, responsables juridiques, cadres dirigeants",
    category: "Droit",
    nextSession: "15 Avril 2024",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Fiscalité des entreprises : optimisation et conformité",
    hook: "Optimisez votre fiscalité tout en respectant les réglementations en vigueur.",
    duration: "2 jours",
    format: "Présentiel",
    audience: "Directeurs financiers, comptables, chefs d'entreprise",
    category: "Fiscalité",
    nextSession: "22 Avril 2024",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Management et leadership d'équipe",
    hook: "Développez vos compétences de leader pour inspirer et mobiliser vos collaborateurs.",
    duration: "3 jours",
    format: "Présentiel / En ligne",
    audience: "Managers, responsables d'équipe, futurs leaders",
    category: "Management",
    nextSession: "08 Mai 2024",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Gouvernance d'entreprise et conformité",
    hook: "Mettez en place une gouvernance efficace et assurez la conformité de votre organisation.",
    duration: "2 jours",
    format: "En ligne",
    audience: "Administrateurs, dirigeants, responsables conformité",
    category: "Gouvernance",
    nextSession: "15 Mai 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Comptabilité internationale et normes IFRS",
    hook: "Maîtrisez les normes comptables internationales pour vos opérations transfrontalières.",
    duration: "4 jours",
    format: "Présentiel",
    audience: "Comptables, contrôleurs de gestion, auditeurs",
    category: "Comptabilité",
    nextSession: "03 Juin 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Négociation commerciale et gestion des partenariats",
    hook: "Perfectionnez vos techniques de négociation pour des partenariats gagnants.",
    duration: "2 jours",
    format: "Présentiel / En ligne",
    audience: "Commerciaux, responsables achats, entrepreneurs",
    category: "Négociation",
    nextSession: "20 Juin 2024",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop"
  }
];

const categories = ["Toutes", "Droit", "Fiscalité", "Management", "Gouvernance", "Comptabilité", "Négociation", "Marketing"];

const ServicesFormationsCatalog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const itemsPerPage = 3;

  // Filter formations based on selected category
  const filteredFormations = activeCategory === "Toutes"
    ? formations
    : formations.filter(f => f.category === activeCategory);

  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);

  // Reset to page 0 when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleFormations = filteredFormations.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Get featured formation (first of current page)
  const featuredFormation = visibleFormations[0];
  // Get side formations (remaining)
  const sideFormations = visibleFormations.slice(1);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-small text-accent">
            Catalogue
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-4">
            Nos formations disponibles
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Découvrez nos programmes certifiants conçus pour développer les compétences clés de vos équipes
          </p>
        </motion.div>

        {/* Category Tags & Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          {/* Category Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#0E4063] text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#0E4063] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-[#0E4063] flex items-center justify-center text-[#0E4063] hover:bg-[#0E4063] hover:text-white transition-all duration-300"
              aria-label="Précédent"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#0E4063] flex items-center justify-center text-white hover:bg-[#0E4063]/90 transition-all duration-300"
              aria-label="Suivant"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* Empty State */}
          {!featuredFormation && (
            <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-20 px-4">
              <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-[#0E4063]" />
              </div>
              <h3 className="text-xl font-bold text-[#0E4063] font-display mb-3 text-center">
                Aucune formation disponible
              </h3>
              <p className="text-[#6B7280] text-center max-w-md mb-6">
                Il n'y a pas encore de formation dans cette catégorie. Explorez nos autres programmes ou revenez bientôt pour découvrir nos nouveautés !
              </p>

            </div>
          )}

          {/* Featured Card - Large Left */}
          {featuredFormation && (
            <div className="group bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden hover:border-[#0E4063]/20 transition-all duration-300 flex flex-col h-full">
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden shrink-0">
                <img
                  src={featuredFormation.image}
                  alt={featuredFormation.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4063]/60 to-transparent" />
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-[#E5A81A] text-white text-sm font-medium rounded-full">
                  {featuredFormation.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0E4063] font-display mb-3">
                  {featuredFormation.title}
                </h3>
                <p className="text-[#6B7280] mb-6">
                  {featuredFormation.hook}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-[#6B7280] mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#E5A81A]" />
                    <span>{featuredFormation.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#E5A81A]" />
                    <span>{featuredFormation.format}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-sm text-[#0E4063] font-medium">
                    {featuredFormation.audience}
                  </span>
                  <Link to={`/formations/${featuredFormation.id}`}>
                    <Button variant="primary" size="sm" className="group/btn shrink-0">
                      <span>Voir</span>
                      <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Side Cards - Right Column */}
          <div className="flex flex-col gap-6 h-full">
            {sideFormations.map((formation, idx) => (
              <div
                key={formation.id}
                className="group bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden hover:border-[#0E4063]/20 transition-all duration-300 flex flex-1 sm:flex-row"
              >
                {/* Image */}
                <div className="relative sm:w-2/5 h-48 sm:h-full overflow-hidden shrink-0">
                  <img
                    src={formation.image}
                    alt={formation.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E4063]/40 to-transparent sm:bg-gradient-to-r" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#E5A81A] text-white text-xs font-medium rounded-full">
                    {formation.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:w-3/5 flex flex-col">
                  <h3 className="text-lg font-bold text-[#0E4063] font-display mb-2 line-clamp-2">
                    {formation.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                    {formation.hook}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-[#E5A81A]" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#E5A81A]" />
                      <span>{formation.format}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-[#6B7280] line-clamp-1">
                      {formation.audience}
                    </span>
                    <Link to={`/formations/${formation.id}`}>
                      <Button variant="primary" size="sm" className="group/btn shrink-0 ml-2">
                        <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? 'bg-[#0E4063] w-8'
                  : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/formations#formations">
            <Button variant="accent" className="inline-flex items-center gap-2">
              <Filter size={18} />
              <span>Voir toutes les formations</span>
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesFormationsCatalog;
