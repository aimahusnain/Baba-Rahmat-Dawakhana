"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Warning from "@editorjs/warning";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import Code from "@editorjs/code";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import Table from "@editorjs/table";

const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
  checklist: Checklist,
  quote: Quote,
  warning: Warning,
  marker: Marker,
  code: Code,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  linkTool: LinkTool,
  table: Table,
};

interface EditorJSOutputProps {
  data: string;
}

const EditorJSOutput: React.FC<EditorJSOutputProps> = ({ data }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    const checkForUrdu = (text: string) => {
      const urduRegex = /[\u0600-\u06FF]/;
      return urduRegex.test(text);
    };

    const addClassToBlocks = () => {
      const blocks = outputRef.current?.querySelectorAll(".ce-block__content");
      if (blocks) {
        blocks.forEach((block: Element) => {
          const text = block.textContent || "";
          if (checkForUrdu(text)) {
            block.classList.add("text-right", "nastaleeqFont");
          } else {
            block.classList.remove("text-right", "nastaleeqFont");
          }
        });
      }
    };

    if (outputRef.current && !editorInstance.current) {
      const parsedData = JSON.parse(data);

      editorInstance.current = new EditorJS({
        holder: outputRef.current,
        data: parsedData,
        readOnly: true,
        tools: EDITOR_JS_TOOLS,
        onReady: () => {
          console.log("EditorJS is ready to work!");
          addClassToBlocks();
        },
        onChange: () => {
          addClassToBlocks();
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div
      ref={outputRef}
      className="mb-8 px-0 w-full flex flex-col items-start justify-start"
    />
  );
};

export default EditorJSOutput;
