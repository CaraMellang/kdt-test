'use client';
import io from 'socket.io-client';
import React from 'react';

export default function TestPage() {
  React.useEffect(() => {
    const socketIoClient = io('http://localhost:5000');
    socketIoClient.on('connect', () => {
      console.log('연결완료 ');
      console.log(socketIoClient);
    });
    socketIoClient.emit('hi', { message: '내 마음을 받아줘' }, (data: any) => {
      console.log('넌 나가라', data);
    });
    socketIoClient.on('hi', (res) => {
      console.log('res 입니당', res);
    });
  }, []);

  return <div>gdgd</div>;
}
