import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

const ContactCoordinates = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Kara, Togo',
      href: null,
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+228 90 00 00 00',
      href: 'tel:+22890000000',
    },
    {
      icon: Mail,
      label: 'E‑mail',
      value: 'contact@k-empirecorporation.com',
      href: 'mailto:contact@k-empirecorporation.com',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <span className="text-label text-accent mb-4 block">
            Nos coordonnées
          </span>
          <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display mb-4">
            Parlons directement
          </h2>
          <p className="text-text-muted">
            Vous pouvez également nous joindre directement via les coordonnées ci‑dessous.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-[#F5F7FA] p-6 rounded-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <item.icon size={24} className="text-accent" strokeWidth={1.5} />
              </div>
              <p className="text-small font-medium text-text-muted mb-1">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-lg font-bold text-primary hover:text-accent transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-lg font-bold text-primary">{item.value}</p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="primary" className="flex items-center gap-2">
            <MessageCircle size={20} />
            Échanger via WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCoordinates;