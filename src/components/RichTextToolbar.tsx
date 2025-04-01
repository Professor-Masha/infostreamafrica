
import React from 'react';
import { Image, Link2, List, ListOrdered, Bold, Italic, Heading, Quote, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextToolbarProps {
  onImageUpload: () => void;
}

export function RichTextToolbar({ onImageUpload }: RichTextToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 border-b pb-3">
      <Button variant="ghost" size="sm" onClick={onImageUpload}>
        <Image size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Link2 size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Bold size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Italic size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Heading size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <List size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <ListOrdered size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Quote size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Code size={16} />
      </Button>
    </div>
  );
}
