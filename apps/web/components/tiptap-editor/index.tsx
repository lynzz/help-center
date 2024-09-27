'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import { useCallback } from 'react';
import './index.css';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Typography, Highlight],
    content,
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  return <EditorContent className="tiptap" editor={editor} />;
};

export default TiptapEditor;
