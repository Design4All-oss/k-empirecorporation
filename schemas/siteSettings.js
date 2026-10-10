import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'maintenance',
      title: 'Mode maintenance',
      type: 'boolean',
      description:
        "Activé : les visiteurs voient la page de maintenance au lieu du site. Contournement possible avec l'ajout ?preview dans l'URL.",
      initialValue: false,
    }),
    defineField({
      name: 'maintenanceMessage',
      title: 'Message de maintenance',
      type: 'text',
      rows: 3,
      description:
        "Texte affiché sous le titre de la page. Laisser vide pour conserver le message par défaut.",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Paramètres du site', subtitle: 'Mode maintenance' }
    },
  },
})
