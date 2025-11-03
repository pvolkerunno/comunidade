
import type { User, Post } from './types';

export const CURRENT_USER_ID = 'u1';

export const USERS: User[] = [
  { id: 'u1', name: 'Você', username: 'seu_usuario', avatarUrl: 'https://picsum.photos/id/1005/200', bannerUrl: `https://picsum.photos/seed/u1/1000/400`, bio: 'Entusiasta de tecnologia e amante de café. Compartilhando minha jornada um post de cada vez.' },
  { id: 'u2', name: 'Ana Silva', username: 'anasilva', avatarUrl: 'https://picsum.photos/id/1011/200' },
  { id: 'u3', name: 'Bruno Costa', username: 'brunocosta', avatarUrl: 'https://picsum.photos/id/1012/200' },
  { id: 'u4', name: 'Carla Dias', username: 'carladias', avatarUrl: 'https://picsum.photos/id/1027/200' },
  { id: 'u5', name: 'Daniel Alves', username: 'danielalves', avatarUrl: 'https://picsum.photos/id/1062/200' },
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    user: USERS[1],
    content: 'Acabei de voltar de uma viagem incrível pelas montanhas! A vista era de tirar o fôlego. 🏔️ #viagem #natureza #aventura',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    timestamp: '2h',
    likes: 125,
    shares: 12,
    comments: [
      { id: 'c1', user: USERS[2], text: 'Que foto incrível!', timestamp: '1h' },
      { id: 'c2', user: USERS[3], text: 'Parece maravilhoso! Preciso ir aí um dia.', timestamp: '30m' },
    ],
  },
  {
    id: 'p2',
    user: USERS[2],
    content: 'Experimentando uma nova receita de café hoje. O resultado foi surpreendentemente bom! ☕ #café #receita #bomdia',
    timestamp: '5h',
    likes: 78,
    shares: 5,
    comments: [],
  },
  {
    id: 'p3',
    user: USERS[3],
    content: 'Refletindo sobre a importância da tecnologia no nosso dia a dia. É impressionante como tudo mudou em tão pouco tempo. O que vocês acham?',
    imageUrl: 'https://picsum.photos/id/2/600/400',
    timestamp: '1d',
    likes: 230,
    shares: 45,
    comments: [
      { id: 'c3', user: USERS[1], text: 'Concordo plenamente!', timestamp: '23h' },
      { id: 'c4', user: USERS[4], text: 'Ainda me surpreendo com os avanços.', timestamp: '22h' },
      { id: 'c5', user: USERS[2], text: 'É uma faca de dois gumes, mas o lado positivo é enorme.', timestamp: '21h' },
    ],
  },
  {
    id: 'p4',
    user: USERS[4],
    content: 'Dia produtivo de trabalho remoto. Adoro a flexibilidade que isso me dá! #remoto #produtividade #homeoffice',
    timestamp: '2d',
    likes: 95,
    shares: 8,
    comments: [],
  },
];