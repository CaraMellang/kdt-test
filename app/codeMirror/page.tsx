'use client';

import { useStore } from '@/store';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';
import initSwc, { transformSync } from '@swc/wasm-web';

export default function CodeMirroPage() {
  const getUserId = useStore((state) => state.id);
  const codeMirrorParantRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!codeMirrorParantRef.current) return;
    const codeMirror = CodeMirror(codeMirrorParantRef.current, { value: '아나', mode: 'javascript' });
    // CodeMirror.fromTextArea()
  });

  const [initailized, setInitialized] = React.useState(false);

  useEffect(() => {
    (async function () {
      await initSwc();
      setInitialized(true);
      console.log('이니셜라이징이 성공했습니다.');
    })();
  }, []);

  const handleCompile = () => {
    if (!initailized) return window.alert('initialized가 되지 않았습니다.');
    const result = transformSync(
      `(function(){console.log('야',localStorage.getItem('site_course_type')); return localStorage.getItem('site_course_type');})();`,
      {},
    );
    const hi = eval(result.code);
    // console.log(new Function(result.code)());
    console.log('이거 됨?', hi);
  };

  return (
    <div>
      <div>결과값좀 알려줏겜</div>
      <button style={{ background: 'salmon', color: 'white' }} onClick={handleCompile}>
        버튼임 눌러바
      </button>
    </div>
  );

  if (getUserId)
    return (
      <div style={{ background: 'salmon' }}>
        <div>로그인 안된거 같은뎁쇼?</div>
        <Link href={'/signin'}>로그인하러가기</Link>
      </div>
    );

  // return <div ref={codeMirrorParantRef}></div>;
}
