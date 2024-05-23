import {
  DiffEditor,
  DiffEditorProps,
  Editor,
  EditorProps,
  loader,
} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });

export default function MonacoEditor(porps: EditorProps) {
  return <Editor {...porps} />;
}

export function MonacoDiffEditor(porps: DiffEditorProps) {
  return <DiffEditor {...porps} />;
}
