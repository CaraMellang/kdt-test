'use client';

import { useStore } from '@/store';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';
import initSwc, { transformSync } from '@swc/wasm-web';
import { loadPyodide } from 'pyodide';
<<<<<<< HEAD
import { instanceOf } from 'prop-types';
=======
>>>>>>> d420be9a8e8e64c1932e35005cdf74d6dc157b28

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

  const handleCompile = async () => {
    if (!initailized) return window.alert('initialized가 되지 않았습니다.');
    const result = transformSync(
      // `(function(){console.log('야',localStorage.getItem('site_course_type')); return localStorage.getItem('site_course_type');})();`,
      'console.log("하ㅣㅇ")',
      {},
    );
    console.log('야이', result.code);
    const hi = eval(result.code);
    // console.log(new Function(result.code)());
    const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/' });
    const code = `
        def Func():
            print("함수실행")
            return 1 + 2313123
        Func()
            
        `;
    const hihihihihihi = await pyodide.runPythonAsync(code);

    console.log(hihihihihihi);

    console.log('이거 됨?', hi);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //자바 어셈블리어를 구동하기 위한 햄들러
    //@ts-ignore
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuf = fileReader.result;
      if (!(arrayBuf instanceof ArrayBuffer)) return;
      console.log('어렐벞', arrayBuf);

      const Uint8 = new Uint8Array(arrayBuf);

      console.log(Uint8);

      const wasmModule = new WebAssembly.Module(Uint8);
      console.log('이거 방탄유리야', wasmModule);
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div>결과값좀 알려줏겜</div>
      <button style={{ background: 'salmon', color: 'white' }} onClick={handleCompile}>
        버튼임 눌러바
      </button>
      <input id={'어쩔'} type="file" onChange={handleFileChange} />
      <label htmlFor={'어쩔'}>인풋ㄱ임</label>
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
