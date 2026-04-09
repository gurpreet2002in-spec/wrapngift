import React, { useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  RemoveFormatting,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

/**
 * RichTextEditor
 * A lightweight contentEditable-based rich text editor.
 * Stores content as HTML string (e.g. "<b>Hello</b> world").
 *
 * Props:
 *  value      – HTML string currently stored
 *  onChange   – (htmlString) => void
 *  placeholder
 *  rows       – approximate min height in lines (default 4)
 */
const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Enter content...",
  rows = 4,
}) => {
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);

  // Sync external value → DOM (only when not triggered by user input)
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    // Only update if DOM content differs to avoid cursor jump
    if (editor.innerHTML !== (value || "")) {
      editor.innerHTML = value || "";
    }
  }, [value]);

  const exec = useCallback(
    (command, val = null) => {
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      // Trigger onChange after command
      setTimeout(() => {
        if (editorRef.current) {
          isInternalChange.current = true;
          onChange(editorRef.current.innerHTML);
        }
      }, 0);
    },
    [onChange],
  );

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  };

  const ToolbarBtn = ({ onClick, title, children, active }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${active ? "bg-gray-200 text-primary" : "text-gray-600"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-primary transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        <ToolbarBtn onClick={() => exec("bold")} title="Bold (Ctrl+B)">
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("italic")} title="Italic (Ctrl+I)">
          <Italic size={14} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("underline")}
          title="Underline (Ctrl+U)"
        >
          <Underline size={14} />
        </ToolbarBtn>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <ToolbarBtn onClick={() => exec("justifyLeft")} title="Align Left">
          <AlignLeft size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyCenter")} title="Align Center">
          <AlignCenter size={14} />
        </ToolbarBtn>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <ToolbarBtn
          onClick={() => exec("insertUnorderedList")}
          title="Bullet List"
        >
          <List size={14} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered size={14} />
        </ToolbarBtn>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <ToolbarBtn onClick={insertLink} title="Insert Link">
          <Link size={14} />
        </ToolbarBtn>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <ToolbarBtn
          onClick={() => exec("removeFormat")}
          title="Clear Formatting"
        >
          <RemoveFormatting size={14} />
        </ToolbarBtn>

        <span className="ml-auto text-[9px] text-gray-400 uppercase tracking-widest font-bold pr-1">
          HTML
        </span>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight: `${rows * 1.6}rem` }}
        className="w-full p-2.5 text-sm text-gray-800 outline-none leading-relaxed
                    [&_b]:font-bold [&_strong]:font-bold
                    [&_i]:italic [&_em]:italic
                    [&_u]:underline
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1
                    [&_a]:text-primary [&_a]:underline
                    empty:before:content-[attr(data-placeholder)]
                    empty:before:text-gray-400
                    empty:before:pointer-events-none"
      />
    </div>
  );
};

export default RichTextEditor;
