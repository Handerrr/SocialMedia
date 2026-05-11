import { api } from '../../services/api';
import { useState } from 'react';

type Props = {
  postId: number;
  initialLikes: number;
};

function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  async function toggleLike() {
    try {
      const res = await api.post(`posts/${postId}/like/`);

      if (res.data.message === 'Like Added') {
        setLikes((prev: number) => prev + 1);
        setLiked(true);
      } else {
        setLikes((prev: number) => prev - 1);
        setLiked(false);
      }
    } catch {
      alert('Erro ao curtir');
    }
  }

  return (
    <span
      onClick={toggleLike}
      style={{ cursor: 'pointer', color: liked ? 'blue' : 'gray' }}
    >
      ❤️ {likes}
    </span>
  );
}

export default LikeButton;
