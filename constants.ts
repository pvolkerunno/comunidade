
import type { User, Post } from './types';

export const CURRENT_USER_ID = 'u1';

export const USERS: User[] = [
  { id: 'u1', name: 'Você', username: 'seu_usuario', avatarUrl: 'https://picsum.photos/id/1005/200', bannerUrl: `https://picsum.photos/seed/u1/1000/400`, bio: 'Em constante jornada de autoconhecimento. Compartilhando reflexões e descobertas sobre crescimento pessoal.' },
  { id: 'u2', name: 'Ana Silva', username: 'anasilva', avatarUrl: 'https://picsum.photos/id/1011/200', bio: 'Praticante de mindfulness e meditação. Acredito no poder da introspecção para transformar vidas.' },
  { id: 'u3', name: 'Bruno Costa', username: 'brunocosta', avatarUrl: 'https://picsum.photos/id/1012/200', bio: 'Coach de desenvolvimento pessoal. Ajudando pessoas a descobrirem seu potencial através do autoconhecimento.' },
  { id: 'u4', name: 'Carla Dias', username: 'carladias', avatarUrl: 'https://picsum.photos/id/1027/200', bio: 'Psicóloga especializada em autoestima e crescimento pessoal. Compartilhando ferramentas de transformação.' },
  { id: 'u5', name: 'Daniel Alves', username: 'danielalves', avatarUrl: 'https://picsum.photos/id/1062/200', bio: 'Escritor e palestrante sobre inteligência emocional. Explorando os caminhos do autodesenvolvimento.' },
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    user: USERS[1],
    content: 'Hoje dediquei 20 minutos para uma caminhada contemplativa na natureza. É incrível como esse momento de conexão comigo mesma me trouxe clareza sobre decisões importantes. 🌿 #autoconhecimento #mindfulness #natureza',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    timestamp: '2h',
    likes: 125,
    shares: 12,
    comments: [
      { id: 'c1', user: USERS[2], text: 'A natureza é mesmo um espelho da nossa alma!', timestamp: '1h' },
      { id: 'c2', user: USERS[3], text: 'Que inspirador! Vou experimentar essa prática também.', timestamp: '30m' },
    ],
  },
  {
    id: 'p2',
    user: USERS[2],
    content: 'Comecei minha manhã com 10 minutos de meditação e journaling. Escrever meus pensamentos me ajuda a processar emoções e identificar padrões. ✍️ #meditação #journaling #crescimentopessoal',
    timestamp: '5h',
    likes: 78,
    shares: 5,
    comments: [],
  },
  {
    id: 'p3',
    user: USERS[3],
    content: 'Refletindo sobre como nossas crenças limitantes moldam nossa realidade. Quando questionamos esses padrões mentais, abrimos espaço para transformações profundas. Qual crença você gostaria de ressignificar? 🧠✨ #crenças #transformação #autodesenvolvimento',
    imageUrl: 'https://picsum.photos/id/2/600/400',
    timestamp: '1d',
    likes: 230,
    shares: 45,
    comments: [
      { id: 'c3', user: USERS[1], text: 'Trabalho muito isso em terapia. É libertador!', timestamp: '23h' },
      { id: 'c4', user: USERS[4], text: 'Identificar essas crenças é o primeiro passo para a mudança.', timestamp: '22h' },
      { id: 'c5', user: USERS[2], text: 'A consciência é o início de toda transformação genuína.', timestamp: '21h' },
    ],
  },
  {
    id: 'p4',
    user: USERS[4],
    content: 'Hoje pratiquei o exercício de gratidão e percebi como isso muda minha perspectiva sobre os desafios. Reconhecer o que temos nos conecta com a abundância interior. 🙏 #gratidão #abundância #inteligênciaemocional',
    timestamp: '2d',
    likes: 95,
    shares: 8,
    comments: [],
  },
];