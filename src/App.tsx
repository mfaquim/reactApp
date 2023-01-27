import { Post }  from './components/Post';
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';
import './global.css';



const posts = [
// author: { avatar_url: "", name: "", role: "",}
//publishedAt: Date
//content: String 
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @ RocketSeat",
    },
    content: [    
      { type:'paragraph', content:  'Eaque sint illum maxime sequi similique praesentium unde recusandae corporis est numquam sunt expedita facilis nemo autem porro earum, dolore reprehenderit illo?' },
      { type:'paragraph', content: 'Sunt expedita facilis nemo autem porro earum, dolore reprehenderit illo?' },
      { type: 'link', content: 'diego.design/rocketseat' },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
    
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Um cara muito bacana @ RocketSeat",
    },
    content: [    
      { type:'paragraph', content:  'Eaque sint illum maxime sequi similique praesentium unde recusandae corporis est numquam sunt expedita facilis nemo autem porro earum, dolore reprehenderit illo?' },
      { type:'paragraph', content: 'Sunt expedita facilis nemo autem porro earum, dolore reprehenderit illo?' },
      { type: 'link', content: 'diego.design/rocketseat' },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  }
];
//iteração
export function App() {
  return (
   <div>
    <Header />

    <div className={styles.wrapper}>
      <Sidebar />
        <main>     
       {posts.map(post => {
        return (
            <Post 
            key={post.id}
            author={post.author}
            content={post.content}
            publishedAt={post.publishedAt}
          />
        )
       })}
        </main>
      </div>
    </div>
  )
}
 
