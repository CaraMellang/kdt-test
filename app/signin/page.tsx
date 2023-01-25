'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { v4 as uuidv4 } from 'uuid';

export default function SigninPage() {
  const router = useRouter();
  const signIn = useStore((state) => state.signin);
  const getUsername = useStore((state) => state.id);
  const allData = useStore((state) => state);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formTarget = e.target as HTMLFormElement;
    const username = (formTarget.elements.namedItem('username') as HTMLFormElement).value;
    const email = (formTarget.elements.namedItem('email') as HTMLFormElement).value;
    const password = (formTarget.elements.namedItem('password') as HTMLFormElement).value;
    console.log(formTarget);
    console.log(username);
    console.log(email);
    console.log(password);
    const uniqueId = uuidv4();
    signIn({ id: uniqueId, username, email, password });
    // if (!getUsername) return window.alert('나가 ');
    // router.push('/chat');
  };

  useEffect(() => {
    if (allData.id) {
      router.push('/chat');
    }
  }, [allData]);
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '4px' }} onSubmit={handleSubmit}>
        <input id="username" />
        <input id="email" />
        <input id="password" />
        <button type={'submit'}>아몰랑 로그인 ㅎㅎ</button>
      </form>
    </div>
  );
}
