import { COLLECTION_SLUG_MEDIA } from '@/payload/collections/media'
import type { Block } from 'payload/types'

const RichText: Block = {
  slug: 'RichText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText'
    }
  ]
}

export default RichText
