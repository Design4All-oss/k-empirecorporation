import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'j5pf9fd6'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Types masqués de la barre latérale — restent dans schemaTypes pour les docs existants
// category → se choisit/crée inline dans le document formation (disableNew: false)
// statistiques/valeurs/temoignage/temoignageFormation → contenu statique, éditable dans src/constants/
const hiddenTypes = ['category', 'statistiques', 'valeurs', 'temoignage', 'temoignageFormation']

export default defineConfig({
  name: 'kempire',
  title: "K'Empire Corporation",
  projectId,
  dataset,
  studioHost: 'k-empire-corporation',
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
})