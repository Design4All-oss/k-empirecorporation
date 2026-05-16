import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Monitor, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const formationTypes = [
  {
    id: 1,
    icon: Users,
    title: "Formations inter-entreprises",
    description: "Des sessions ouvertes réunissant des professionnels de divers horizons pour favoriser les échanges d'expériences.",
    features: [
      "Partage d'expériences entre professionnels",
      "Réseau élargi de contacts",
      "Bonnes pratiques multi-sectorielles",
      "Dates fixes tout au long de l'année"
    ],
    color: "accent",
    image: "https://images.unsplash.com/photo-1522202176988-66273ed2c008?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    icon: Building2,
    title: "Formations intra-entreprise",
    description: "Des programmes conçus spécifiquement pour votre organisation, adaptés à vos enjeux et à vos équipes.",
    features: [
      "Contenu 100% personnalisé",
      "Adapté à votre secteur d'activité",
      "Planning flexible selon vos contraintes",
      "Formation dans vos locaux ou chez nous"
    ],
    color: "primary",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62a4a70?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    icon: Monitor,
    title: "Formations en ligne",
    description: "Des formations accessibles à distance via visioconférence, pour toucher vos équipes où qu'elles se trouvent.",
    features: [
      "Accessibilité géographique totale",
      "Supports numériques interactifs",
      "Replay disponible 30 jours",
      "Coût de déplacement réduit"
    ],
    color: "success",
    image: "https://images.unsplash.com/photo-1588196749798-2be4b7f97e1a?w=600&h=400&fit=crop"
  }
];

const FormationsTypes = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-alt">
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-label text-accent">
            Nos formats
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-6">
            Une offre adaptée à vos besoins
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Choisisez le format qui convient le mieux à votre organisation et à vos objectifs de développement des compétences.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {formationTypes.map((type, index) => {
            const IconComponent = type.icon;
            const colorClass = type.color === 'accent' 
              ? 'text-accent bg-accent/10' 
              : type.color === 'primary' 
                ? 'text-primary bg-primary/10' 
                : 'text-success bg-success/10';
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    
                    {/* Icon */}
                    <div className={`absolute bottom-4 left-4 p-3 rounded-xl ${colorClass}`}>
                      <IconComponent size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary font-display mb-3">
                      {type.title}
                    </h3>
                    <p className="text-text-muted mb-6 flex-1">
                      {type.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-text">
                          <CheckCircle size={16} className="text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button variant="outline" className="w-full group/btn">
                      <span>En savoir plus</span>
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormationsTypes;
