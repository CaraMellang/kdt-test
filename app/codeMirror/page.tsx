'use client';

import { useStore } from '@/store';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';

export default function CodeMirroPage() {
  const getUserId = useStore((state) => state.id);
  const codeMirrorParantRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!codeMirrorParantRef.current) return;
    const codeMirror = CodeMirror(codeMirrorParantRef.current, { value: '아나', mode: 'javascript' });
    // CodeMirror.fromTextArea()
  });

  if (!getUserId) return;
  return (
    <div style={{ background: 'salmon' }}>
      <div>로그인 안된거 같은뎁쇼?</div>
      <Link href={'/signin'}>로그인하러가기</Link>
    </div>
  );
  return <div ref={codeMirrorParantRef}></div>;
}
