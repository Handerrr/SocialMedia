import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as S from '../../Styles/Comments';
import { useNavigate } from 'react-router-dom';
import type { Comment } from '../../types';

dayjs.extend(relativeTime);

type Props = {
  postId: number;
  postAuthor: string;
};

function Comments({ postId, postAuthor }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyUsername, setReplyUsername] = useState('');
  const navigate = useNavigate();

  async function loadComments() {
    const response = await api.get(`posts/${postId}/comments/`);
    setComments(response.data.results);
  }

  async function sendComment() {
    if (!content.trim()) return;

    await api.post(`posts/${postId}/comments/`, {
      content,
      parent: replyingTo,
    });

    setContent('');
    setReplyingTo(null);
    setReplyUsername('');

    loadComments();
  }

  async function likeComment(commentId: number) {
    await api.post(`comments/${commentId}/like/`);
    loadComments();
  }

  useEffect(() => {
    loadComments();
  }, []);

  const renderComments = (parentId: number | null = null, level = 0) => {
    return comments
      .filter((comment) => comment.parent === parentId)
      .map((comment) => (
        <S.CommentWrapper key={comment.id} $level={level}>
          <S.NestedCommentCard $nested={level > 0}>
            {comment.user.profile_pic_url ? (
              <S.ProfileImage src={comment.user.profile_pic_url} />
            ) : (
              <S.Avatar>
                {comment.user.username.charAt(0).toUpperCase()}
              </S.Avatar>
            )}

            <S.CommentContent>
              <div>
                <S.Username
                  onClick={() => navigate(`/users/${comment.user.id}`)}
                >
                  {comment.user.username}
                </S.Username>

                <S.Date>{dayjs(comment.created_at).fromNow()}</S.Date>
              </div>

              <S.Text>{comment.content}</S.Text>

              <S.Actions>
                <button onClick={() => likeComment(comment.id)}>
                  ❤️ {comment.likes_count}
                </button>

                <button
                  onClick={() => {
                    setReplyingTo(comment.id);
                    setReplyUsername(comment.user.username);
                  }}
                >
                  Responder
                </button>
              </S.Actions>
            </S.CommentContent>
          </S.NestedCommentCard>

          {renderComments(comment.id, level + 1)}
        </S.CommentWrapper>
      ));
  };

  return (
    <S.Container>
      <S.InputContainer>
        <div>
          <S.ReplyingTo>
            Respondendo a <strong>@{replyUsername || postAuthor}</strong>
          </S.ReplyingTo>

          <S.Input
            placeholder={
              replyingTo
                ? 'Respondendo comentário...'
                : 'Escreva um comentário...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <S.Button onClick={sendComment}>
          {replyingTo ? 'Responder' : 'Enviar'}
        </S.Button>
      </S.InputContainer>

      {replyingTo && (
        <S.CancelReply
          onClick={() => {
            setReplyingTo(null);
            setReplyUsername('');
          }}
        >
          Cancelar resposta
        </S.CancelReply>
      )}

      <S.CommentsList>{renderComments()}</S.CommentsList>
    </S.Container>
  );
}

export default Comments;
