
import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Image, Video, Link, Quote, Code, AlignLeft, AlignCenter, 
  AlignRight, Underline
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  // Initialize editor content from prop
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle editor content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  // Execute command on the editor
  const execCommand = (command: string, value?: string | boolean) => {
    document.execCommand(command, false, value);
    handleContentChange();
    editorRef.current?.focus();
  };

  // Format commands
  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleH1 = () => execCommand('formatBlock', '<h1>');
  const handleH2 = () => execCommand('formatBlock', '<h2>');
  const handleH3 = () => execCommand('formatBlock', '<h3>');
  const handleParagraph = () => execCommand('formatBlock', '<p>');
  const handleBulletList = () => execCommand('insertUnorderedList');
  const handleNumberList = () => execCommand('insertOrderedList');
  const handleQuote = () => execCommand('formatBlock', '<blockquote>');
  const handleCode = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    
    if (selectedText) {
      const codeElement = `<pre><code>${selectedText}</code></pre>`;
      execCommand('insertHTML', codeElement);
    } else {
      execCommand('formatBlock', '<pre>');
    }
  };
  const handleAlignLeft = () => execCommand('justifyLeft');
  const handleAlignCenter = () => execCommand('justifyCenter');
  const handleAlignRight = () => execCommand('justifyRight');

  // Insert link
  const handleLinkInsert = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${selection}</a>`;
      execCommand('insertHTML', linkHtml);
      setIsLinkDialogOpen(false);
      setLinkUrl('');
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-muted/30 border-b">
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBold}
            className="h-8 w-8 p-0"
            title="Bold"
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleItalic}
            className="h-8 w-8 p-0"
            title="Italic"
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleUnderline}
            className="h-8 w-8 p-0"
            title="Underline"
            type="button"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-8" />
        
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleH1}
            className="h-8 px-2 text-xs font-bold"
            title="Heading 1"
            type="button"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleH2}
            className="h-8 px-2 text-xs font-bold"
            title="Heading 2"
            type="button"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleH3}
            className="h-8 px-2 text-xs font-bold"
            title="Heading 3"
            type="button"
          >
            H3
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleParagraph}
            className="h-8 px-2 text-xs"
            title="Paragraph"
            type="button"
          >
            P
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-8" />
        
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBulletList}
            className="h-8 w-8 p-0"
            title="Bullet List"
            type="button"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNumberList}
            className="h-8 w-8 p-0"
            title="Numbered List"
            type="button"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-8" />
        
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsLinkDialogOpen(true)}
            className="h-8 w-8 p-0"
            title="Insert Link"
            type="button"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onImageUploadRequest}
            className="h-8 w-8 p-0"
            title="Insert Image"
            type="button"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onVideoInsertRequest}
            className="h-8 w-8 p-0"
            title="Insert Video"
            type="button"
          >
            <Video className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-8" />
        
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleQuote}
            className="h-8 w-8 p-0"
            title="Blockquote"
            type="button"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCode}
            className="h-8 w-8 p-0"
            title="Code Block"
            type="button"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-8" />
        
        <div className="flex items-center gap-0.5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAlignLeft}
            className="h-8 w-8 p-0"
            title="Align Left"
            type="button"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAlignCenter}
            className="h-8 w-8 p-0"
            title="Align Center"
            type="button"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAlignRight}
            className="h-8 w-8 p-0"
            title="Align Right"
            type="button"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="p-2 border-b bg-background flex items-center gap-2">
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <Button size="sm" onClick={handleLinkInsert} type="button">Insert</Button>
          <Button size="sm" variant="outline" onClick={() => setIsLinkDialogOpen(false)} type="button">Cancel</Button>
        </div>
      )}
      
      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        className={cn(
          "min-h-[200px] max-h-[600px] p-4 overflow-y-auto focus:outline-none prose prose-sm dark:prose-invert max-w-none",
          "prose-headings:mt-4 prose-headings:mb-2",
          "prose-p:my-2 prose-p:leading-relaxed",
          "prose-blockquote:border-l-4 prose-blockquote:border-muted prose-blockquote:pl-4 prose-blockquote:italic",
          "prose-code:bg-muted prose-code:p-1 prose-code:rounded",
          "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded",
          "prose-img:my-4 prose-img:rounded-md",
          "[&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-4 [&_iframe]:rounded-md"
        )}
        placeholder={placeholder}
        suppressContentEditableWarning
      ></div>
      
      <style jsx>{`
        [contentEditable=true]:empty:before {
          content: attr(placeholder);
          color: gray;
          cursor: text;
        }
        
        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          margin: 1rem 0;
        }
        
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
