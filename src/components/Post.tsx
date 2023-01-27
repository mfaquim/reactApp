import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';


interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}



// estado = variáveis que eu quero que o componente escute

export function Post({ author, publishedAt, content }: PostProps) {
  const [comment, setComment] = useState([
    'O Diego fala tão rápido que parece latim hahahah'
  ])

  const [newTextComment, setNewTextcomment] = useState('')

  const formattedPublishedDate = format(
    publishedAt, 
    "d 'de' LLLL 'às' HH:mm'h'", 
    {
    locale: ptBR,
    }
  )

  const relativeToNowPublishDate = formatDistanceToNow(
    publishedAt,
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');  
    setNewTextcomment(event.target.value);
  }

  function deleteComment (deletedComment: string) {
    const afterDeletionCommentlist = comment.filter(comment => {
      return comment !== deletedComment;
    });

    setComment(afterDeletionCommentlist);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    //imutabilidade
    setComment([...comment, newTextComment]);
    setNewTextcomment('');
  };

  function handleInvalidComment (event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório')    
  }

  const invalidNewCommentInput = newTextComment.length === 0;
 
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div> 
        </div>


        <time title={formattedPublishedDate} dateTime={publishedAt.toISOString()}>
          {relativeToNowPublishDate}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type ==='paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          else if (line.type === 'link'){
              return <p key={line.content}><a href="#">{line.content}</a></p>
          }
          })}
      </div>

        <form onSubmit={handleCreateNewComment} className={styles.form}>
          <strong>Deixe seu feedback</strong>

          <textarea
            name='comment'
            placeholder='Deixe um comentário'
            onChange={handleNewCommentChange}
            value={newTextComment}
            required
            onInvalid={handleInvalidComment}
          />

          <footer>
            <button type='submit' disabled={invalidNewCommentInput}>
              Publicar
            </button>
          </footer>
                    
        </form>

        <div className={styles.commentList}>
          {comment.map(comment => {
            return (<Comment 
                key={comment} 
                content={comment} 
                onDeleteComment={deleteComment}/>)
          })}
        </div>
    </article>
  )
}

