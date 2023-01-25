'use client';
import io from 'socket.io-client';
import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useStore } from '@/store';
import Link from 'next/link';

// const socketIoClient = io('http://localhost:5000');

export default function TestPage() {
  const getUserId = useStore((state) => state.id);
  const getUsername = useStore((state) => state.username);
  const allData = useStore((state) => state);
  const { current: socketIoClient } = useRef(io('http://localhost:5000/chat'));
  const [joinRoomId, setJoinRoomId] = React.useState<string>(''); //입장할 방 입력
  const [currentRoomid, setCurrentRoomId] = React.useState<string>(); //입장한 방 아이디
  const [value, setValue] = React.useState<{ type: 'create' | 'join' | 'joined' | 'leave' | 'msg'; message: string }>(); //소켓으로 받아온 메시지들
  const [arr, setArr] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!socketIoClient.hasListeners('createRoom')) {
      socketIoClient.on('createRoom', (res) => {
        console.log('createRoom', res);
        setCurrentRoomId(res.roomId);
        setValue({ type: 'create', message: res.message });
      });
    }

    if (!socketIoClient.hasListeners('joinedRoom')) {
      socketIoClient.on('joinedRoom', (res) => {
        console.log('joinedRoom', res);
        setCurrentRoomId(res.roomId);
        setValue({ type: 'joined', message: res.message });
      });
    }

    if (!socketIoClient.hasListeners('joinRoom')) {
      socketIoClient.on('joinRoom', (res) => {
        console.log('joinRoom', res);
        setCurrentRoomId(res.roomId);
        setValue({ type: 'join', message: res.message });
      });
    }

    if (!socketIoClient.hasListeners('leaveRoom')) {
      socketIoClient.on('leaveRoom', (res) => {
        console.log(res);
        setValue({ type: 'leave', message: res });
      });
    }
    if (!socketIoClient.hasListeners('msg')) {
      socketIoClient.on('msg', (res) => {
        console.log('msg', res);
        setValue({ type: 'msg', message: res.message });
      });
    }

    return () => {
      socketIoClient.off('createRoom');
      socketIoClient.off('joined');
      socketIoClient.off('join');
      socketIoClient.off('leaveRoom');
      socketIoClient.disconnect();
      socketIoClient.close();
    };
  }, []);

  React.useEffect(() => {
    setArr((prev) => [...prev, value?.message || '']);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinRoomId(e.target.value);
  };

  const handleCreateRoomClick = () => {
    socketIoClient.emit('createRoom', { roomId: getUserId });
  };

  const handleJoinRoomClick = () => {
    socketIoClient.emit('joinRoom', { roomId: joinRoomId, username: getUsername });
  };

  const handleLeaveRoomClick = () => {
    socketIoClient.emit('leaveRoom', { roomId: joinRoomId, username: getUsername });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTarget = e.target as HTMLFormElement;
    const getText = (currentTarget.elements.namedItem('textman') as HTMLFormElement).value;
    if (!getText) return window.alert('출입금지!');
    socketIoClient.emit('msg', { roomId: currentRoomid, message: getText });
  };

  if (!getUserId)
    return (
      <div style={{ background: 'salmon' }}>
        <div>로그인 안된거 같은뎁쇼?</div>
        <Link href={'/signin'}>로그인하러가기</Link>
      </div>
    );

  if (currentRoomid)
    return (
      <div>
        <div>현재 방의 아이디는 {currentRoomid} 입니다.</div>
        <button style={{ background: 'salmon' }} onClick={handleLeaveRoomClick}>
          나갈래요
        </button>

        <div style={{ margin: '12px 0', background: 'salmon', display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={handleSubmit}>
            <input id="textman" />
            <button type={'submit'}>아잉</button>
          </form>
        </div>

        <div>
          {arr.map((r) => (
            <div key={r}>{r}</div>
          ))}
        </div>
      </div>
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
      <div>안녕하세요 저는 재밌는 소켓이라고 해요 한판해요~~^^</div>
      <div>{getUsername}님 안녕하세요~~</div>
      <input onChange={handleChange} />
      <button onClick={handleJoinRoomClick}>입장하기</button>
      <button onClick={handleCreateRoomClick}>방 생성하기(호스트)</button>
    </div>
  );
}

// const 헤이쿼리 = useQuery(
//     '',
//     () =>
//         fetch('https://api.bonobono.dev/api/v1/post?boardType=TYPE_NOTICE&page=0', {
//           method: 'get',
//         }).then((res) => res.json()),
//     // async () => {
//
//     //axios사용시
//     // const data = await axios
//     //   .get('https://api.bonobono.dev/api/v1/post', { params: { boardType: 'TYPE_NOTICE', page: 0 } })
//     //   .then((res) => res);
//
//     //내장 fetch 사용시
//     //   const data = await fetch('https://api.bonobono.dev/api/v1/post?boardType=TYPE_NOTICE&page=0', {
//     //     method: 'get',
//     //   }).then((res) => res.json());
//     //   console.log(data, '아 좀내놔');
//     //   return data;
//     // }
// );
// console.log(헤이쿼리);
