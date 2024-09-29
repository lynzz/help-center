import { useEffect, useState } from 'react';
import { useEditor, useEditorState } from '@tiptap/react';
import type { AnyExtension, Editor } from '@tiptap/core';

import { ExtensionKit } from '@/extensions/extension-kit';
import {
  convertStrapiToTiptapJson,
  convertTiptapToStrapiBlocks
} from '@/lib/rich-text-convertor';
import { isEqual } from 'lodash';
import { BlocksContent } from '@strapi/blocks-react-renderer';

export const useBlockEditor = ({
  content,
  onChange
}: {
  content?: BlocksContent;
  onChange?: (content: BlocksContent) => void;
}) => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      // content: initialContent,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(convertStrapiToTiptapJson(content));
          ctx.editor.commands.focus('start', { scrollIntoView: true });
        }
      },
      onUpdate: (ctx) => {
        if (onChange) {
          const json = convertTiptapToStrapiBlocks(ctx.editor.getJSON());
          console.log('json', json);
          if (!isEqual(json, content)) {
            onChange(json);
          }
        }
      },
      extensions: ExtensionKit(),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full'
        }
      }
    },
    []
  );

  return { editor };
};
