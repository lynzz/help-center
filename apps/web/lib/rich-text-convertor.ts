import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { type JSONContent } from '@tiptap/core';

export function convertTiptapToStrapiBlocks(tiptapJson: JSONContent) {
  return tiptapJson.content
    ?.map((node) => {
      switch (node.type) {
        case 'paragraph':
          return {
            type: 'paragraph',
            children: node.content?.map((inline: any) => ({
              type: 'text',
              text: inline.text,
              ...(inline.marks &&
                inline.marks.length > 0 && {
                  bold: inline.marks.some((mark: any) => mark.type === 'bold'),
                  italic: inline.marks.some(
                    (mark: any) => mark.type === 'italic'
                  )
                  // 添加其他标记类型...
                })
            }))
          };
        case 'heading':
          return {
            type: 'heading',
            children: [{ type: 'text', text: node.content?.[0].text }],
            level: node.attrs?.level
          };
        case 'bulletList':
          return {
            type: 'list',
            format: 'unordered',
            children: node.content?.map((listItem: any) => ({
              type: 'list-item',
              children: listItem.content?.map((content: any) => ({
                type: 'text',
                text: content.text
              }))
            }))
          };
        case 'orderedList':
          return {
            type: 'list',
            format: 'ordered',
            children: node.content?.map((listItem: any) => ({
              type: 'list-item',
              children: listItem.content?.map((content: any) => ({
                type: 'text',
                text: content.text
              }))
            }))
          };
        case 'image':
          return {
            type: 'image',
            image: {
              url: node.attrs?.src,
              alternativeText: node.attrs?.alt || ''
            }
          };
        case 'codeBlock':
          return {
            type: 'code',
            code: node.content?.[0].text,
            language: node.attrs?.language || 'plaintext'
          };
        default:
          return null;
      }
    })
    .filter(Boolean) as BlocksContent;
}

export function convertStrapiToTiptapJson(strapiBlocks?: BlocksContent) {
  console.log('strapiBlocks', strapiBlocks);
  return {
    type: 'doc',
    content:
      strapiBlocks
        ?.map((block) => {
          switch (block.type) {
            case 'paragraph':
              return {
                type: 'paragraph',
                content: block.children.map((child: any) => ({
                  type: 'text',
                  text: child.text,
                  marks: [
                    ...(child.bold ? [{ type: 'bold' }] : []),
                    ...(child.italic ? [{ type: 'italic' }] : [])
                    // Add other mark types here...
                  ].filter((mark) => mark.type)
                }))
              };
            case 'heading':
              return {
                type: 'heading',
                attrs: { level: block.level },
                content: [{ type: 'text', text: block.children[0].text }]
              };
            case 'list':
              if (block.format === 'ordered') {
                return {
                  type: 'orderedList',
                  content: block.children.map((listItem: any) => ({
                    type: 'listItem',
                    content: listItem.children?.map((child: any) => ({
                      type: 'paragraph',
                      content: [{ type: 'text', text: child.text }]
                    }))
                  }))
                };
              } else {
                return {
                  type: 'bulletList',
                  content: block.children.map((listItem: any) => ({
                    type: 'listItem',
                    content: listItem.children?.map((child: any) => ({
                      type: 'paragraph',
                      content: [{ type: 'text', text: child.text }]
                    }))
                  }))
                };
              }
            case 'image':
              return {
                type: 'image',
                attrs: {
                  src: block.image.url,
                  alt: block.image.alternativeText || ''
                }
              };
            case 'code':
              return {
                type: 'codeBlock',
                attrs: { language: 'plaintext' },
                content: [{ type: 'text', text: block.children[0] }]
              };
            default:
              return null;
          }
        })
        .filter(Boolean) || []
  } as JSONContent;
}
