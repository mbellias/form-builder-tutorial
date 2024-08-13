'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImShare } from 'react-icons/im';
import { toast } from 'sonner';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Input
        value={shareLink}
        readOnly
      />
      <Button
        className='[250px]'
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast.info('Copied link to clipboard');
        }}
      >
        <ImShare className='my-2 h-4 w-4' />
      </Button>
    </div>
  );
}

export default FormLinkShare;
