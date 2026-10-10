import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'j5pf9fd6'
const contentDataset = process.env.SANITY_STUDIO_DATASET || 'production'
const submissionsDataset = process.env.SANITY_STUDIO_SUBMISSIONS_DATASET || 'submissions'

// Types masqués de la barre latérale — restent dans schemaTypes pour les docs existants
// category → se choisit/crée inline dans le document formation (disableNew: false)
// valeurs → contenu statique, éditable dans src/constants/
const hiddenTypes = ['category', 'valeurs', 'soumissionNewsletter', 'soumissionDevis', 'soumissionRdv', 'inscription', 'inscriptionEvenement', 'googleTokens']

const submissionTypes = ['soumissionNewsletter', 'soumissionDevis', 'soumissionRdv', 'inscription', 'inscriptionEvenement']

export default defineConfig([
  {
    name: 'kempire-content',
    title: "K'Empire Corporation — Contenu",
    projectId,
    dataset: contentDataset,
    basePath: '/production',
    plugins: [
      structureTool({
        structure: (S) =>
          S.list()
            .title('Contenu')
            .items(
              S.documentTypeListItems().filter(
                (item) => item.getId() && !hiddenTypes.includes(item.getId())
              )
            ),
      }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'kempire-submissions',
    title: "K'Empire Corporation — Soumissions",
    projectId,
    dataset: submissionsDataset,
    basePath: '/submissions',
    plugins: [
      structureTool({
        structure: (S) =>
          S.list()
            .title('Soumissions')
            .items(
              S.documentTypeListItems().filter(
                (item) => item.getId() && submissionTypes.includes(item.getId())
              )
            ),
      }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
])