
import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Heading, List, ListOrdered, Image, Video, Link2, Quote, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onImageUploadRequest?: () => void;
  onVideoInsertRequest?: () => void;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder,
  onImageUploadRequest,
  onVideoInsertRequest
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Apply formatting to selected text
  const applyFormatting = (format: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = value.substring(start, end);
    let formattedText = '';
    let newCursorPosition = end;

    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'h1':
        formattedText = `<h1>${selectedText}</h1>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText}</h2>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'ol':
        formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'quote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'code':
        formattedText = `<pre><code>${selectedText}</code></pre>`;
        newCursorPosition = start + formattedText.length;
        break;
      case 'link':
        const url = prompt('Enter URL:', 'https://');
        if (url) {
          formattedText = `<a href="${url}">${selectedText || url}</a>`;
          newCursorPosition = start + formattedText.length;
        } else {
          return; // User cancelled the prompt
        }
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);

    // Set cursor position after formatting
    setTimeout(() => {
      if (editor) {
        editor.focus();
        editor.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  // Insert media at cursor position
  const insertMedia = (type: 'image' | 'video', url?: string) => {
    if (type === 'image' && !url) {
      if (onImageUploadRequest) {
        onImageUploadRequest();
      }
      return;
    }

    if (type === 'video' && !url) {
      if (onVideoInsertRequest) {
        onVideoInsertRequest();
      }
      return;
    }

    if (!url) return;

    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    let mediaTag = '';

    if (type === 'image') {
      mediaTag = `<img src="${url}" alt="Image" class="w-full h-auto rounded-md my-4" />`;
    } else {
      // Assuming YouTube video ID
      mediaTag = `<div class="video-container my-4"><iframe width="560" height="315" src="https://www.youtube.com/embed/${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }

    const newValue = value.substring(0, start) + mediaTag + value.substring(start);
    onChange(newValue);
  };

  // Handle image upload completion
  const handleImageUploadComplete = (imageUrl: string) => {
    insertMedia('image', imageUrl);
  };

  return (
    <div className="rich-text-editor border rounded-md overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('bold')}>
          <Bold size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('italic')}>
          <Italic size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('h1')}>
          <Heading size={16} className="mr-1" />1
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('h2')}>
          <Heading size={16} className="mr-1" />2
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('ul')}>
          <List size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('ol')}>
          <ListOrdered size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('quote')}>
          <Quote size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('code')}>
          <Code size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => applyFormatting('link')}>
          <Link2 size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMedia('image')}>
          <Image size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMedia('video')}>
          <Video size={16} />
        </Button>
      </div>
      <textarea 
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Start writing... Use the toolbar above to format your content."}
        className="w-full min-h-[400px] p-4 font-mono resize-y focus:outline-none"
      />
    </div>
  );
}
