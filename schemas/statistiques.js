import { defineField, defineType } from 'sanity'

const section = (name, title) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{ type: 'statItem' }],
  })

export default defineType({
  name: 'statistiques',
  title: 'Statistiques',
  type: 'document',
  fields: [
    section('accueil', 'Accueil — Hero'),
    section('accueilBas', 'Accueil — Section chiffres (bas de page)'),
    section('apropos', 'À propos'),
    section('services', 'Services'),
    section('formations', 'Formations — hero'),
    section('formationsBenefits', 'Formations — bénéfices'),
    section('conseilStrategie', 'Conseil & stratégie'),
    section('assistanceJuridique', 'Assistance juridique'),
    section('intelligenceStrategique', 'Intelligence stratégique'),
  ],
  preview: {
    prepare() {
      return { title: 'Statistiques', subtitle: 'Chiffres officiels du cabinet' }
    },
  },
})