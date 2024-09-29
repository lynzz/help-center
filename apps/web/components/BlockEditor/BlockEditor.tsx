import { EditorContent } from '@tiptap/react';
import React, { useRef } from 'react';

import { LinkMenu } from '@/components/menus';

import { useBlockEditor } from '@/hooks/useBlockEditor';

import '@/styles/index.css';

import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus';
import { TextMenu } from '../menus/TextMenu';
import { ContentItemMenu } from '../menus/ContentItemMenu';
type BlockEditorProps = {
  content: any;
  onChange?: (content: any) => void;
};
export const BlockEditor = ({ content, onChange }: BlockEditorProps) => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({ content, onChange });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;
