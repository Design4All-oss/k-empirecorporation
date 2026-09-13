/**
 * Convertit un lien Google Drive en lien de téléchargement direct.
 * Supporte les formats :
 *   - https://drive.google.com/file/d/FILE_ID/view
 *   - https://drive.google.com/file/d/FILE_ID/preview
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/uc?id=FILE_ID
 *   - https://drive.usercontent.google.com/download?id=FILE_ID
 *
 * Retourne l'URL originale si ce n'est pas un lien Google Drive.
 */
export function toDirectDownloadUrl(url) {
  if (!url) return ''

  const drivePatterns = [
    // /file/d/FILE_ID/view or /file/d/FILE_ID/preview
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    // /open?id=FILE_ID
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    // /uc?id=FILE_ID
    /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
    // /download?id=FILE_ID
    /drive\.google\.com\/download\?id=([a-zA-Z0-9_-]+)/,
  ]

  for (const pattern of drivePatterns) {
    const match = url.match(pattern)
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
  }

  return url
}

/**
 * Déclenche le téléchargement d'un fichier.
 */
export function triggerDownload(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  if (filename) link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
