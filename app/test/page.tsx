'use client';
import io from 'socket.io-client';
import React, { useRef } from 'react';

// const socketIoClient = io('http://localhost:5000');

export default function TestPage() {
  const [어쩔, 어쩔라요] = React.useState<string[]>([]);
  const { current: socketIoClient } = useRef(io('http://localhost:5000/chat'));
  React.useEffect(() => {
    socketIoClient.on('connect', () => {
      console.log('연결완료 ');
      console.log(socketIoClient);
    });
    socketIoClient.emit('hi', { message: '내 마음을 받아줘' }, (data: any) => {
      console.log('넌 나가라', data);
    });
  }, []);

  React.useEffect(() => {
    if (!socketIoClient.hasListeners('hi')) {
      socketIoClient.on('hi', (res) => {
        console.log('res 입니당', res);
        어쩔라요([...어쩔, res.message]);
      });
    }
    if (socketIoClient.hasListeners('hi')) {
      socketIoClient.off('hi');

      socketIoClient.on('hi', (res) => {
        console.log('res 입니당', res);
        어쩔라요([...어쩔, res.message]);
      });
    }
  }, [어쩔]);

  const arr = ['아아아아이', '집에가자', '즐거운 리액트', '끼룩끼룩'];
  const handleRandomMessageClick = () => {
    const randomCount = Math.round((Math.random() * 10) / 2);
    socketIoClient.emit('hi', { message: '아이우에요' + (arr[randomCount] || '어쩔') });
  };

  return (
    <div>
      <div>안녕하세요 저는 재밌는 소켓이라고 해요 한판해요~~^^</div>
      <button onClick={handleRandomMessageClick}>랜덤으로 문자보내야징</button>
      <div>
        {어쩔?.map((r) => (
          <div>{r}</div>
        ))}
      </div>
    </div>
  );
}
