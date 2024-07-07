"use client";

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface EditorJSOutputProps {
  data: string;
}

const EditorJSOutput: React.FC<EditorJSOutputProps> = ({ data }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      const parsedData = JSON.parse(data);
      
      const editor = new EditorJS({
        holder: outputRef.current,
        data: parsedData,
        readOnly: true,
        tools: {
          // Include the same tools you used in the Editor component
          header: require('@editorjs/header'),
          list: require('@editorjs/list'),
          checklist: require('@editorjs/checklist'),
          quote: require('@editorjs/quote'),
          warning: require('@editorjs/warning'),
          marker: require('@editorjs/marker'),
          code: require('@editorjs/code'),
          delimiter: require('@editorjs/delimiter'),
          inlineCode: require('@editorjs/inline-code'),
          linkTool: require('@editorjs/link'),
          table: require('@editorjs/table'),
        },
      });

      return () => {
        if (editor && editor.destroy) {
          editor.destroy();
        }
      };
    }
  }, [data]);

  return <div ref={outputRef} />;
};

export default EditorJSOutput;