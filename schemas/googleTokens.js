import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'googleTokens',
  title: 'Google OAuth Tokens',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accessToken',
      title: 'Access Token',
      type: 'string',
    }),
    defineField({
      name: 'refreshToken',
      title: 'Refresh Token',
      type: 'string',
    }),
    defineField({
      name: 'expiry',
      title: 'Token Expiry',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'expiry' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Google Token',
        subtitle: subtitle ? `Expire: ${new Date(subtitle).toLocaleDateString()}` : 'No expiry',
      }
    },
  },
})
