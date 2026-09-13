import React, { useCallback } from 'react'
import { useDocumentPane } from 'sanity/structure'
import { TextInput, Stack, Text, Button, Flex } from '@sanity/ui'
import { set } from 'sanity'

function extractPlainText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children.map((child) => child.text || '').join('')
      }
      return ''
    })
    .join(' ')
    .trim()
}

function truncate(text, maxLen = 150) {
  if (!text) return ''
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen).trim() + '...'
}

export default function AutoExcerptInput(props) {
  const { value, onChange } = props
  const { document } = useDocumentPane()

  const contentFields = document
    ? ['body', 'content', 'description'].filter((f) => document[f])
    : []

  const sourceField = contentFields[0] || null

  const generate = useCallback(() => {
    if (!document || !sourceField) return
    const source = document[sourceField]
    const plain = extractPlainText(source)
    const truncated = truncate(plain, 150)
    onChange(set(truncated))
  }, [document, sourceField, onChange])

  return (
    <Stack space={3}>
      <TextInput
        value={value || ''}
        onChange={(e) => onChange(set(e.currentTarget.value))}
        placeholder="Extrait auto-généré ou saisi manuellement"
        rows={3}
      />
      <Flex gap={2} align="center">
        <Button
          mode="ghost"
          tone="primary"
          fontSize={1}
          padding={2}
          onClick={generate}
          disabled={!sourceField}
          text={
            sourceField
              ? `Générer depuis « ${sourceField} »`
              : 'Aucun contenu source'
          }
        />
        {value && (
          <Text size={1} muted>
            {value.length}/150
          </Text>
        )}
      </Flex>
    </Stack>
  )
}
