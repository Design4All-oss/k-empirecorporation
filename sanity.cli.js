import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'j5pf9fd6'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'k-empire-corporation',
  deployment: {
    appId: 'szov8e3v9ao4o4p086yg1r53',
  },
})