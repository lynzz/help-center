import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import { ImageUpload as ImageUploadComponent } from './view/ImageUpload'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType
    }
  }
}

export const ImageUpload = Node.create({
  name: 'imageUpload',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent(`<div data-type="${this.name}"></div>`)
            .run();
        }
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent)
  },
})

export default ImageUpload
