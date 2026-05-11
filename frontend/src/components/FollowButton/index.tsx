import { useState } from 'react';
import { api } from '../../services/api';

type Props = {
  userId: number;
  initialFollowing: boolean;
};

function FollowButton({ userId, initialFollowing }: Props) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  async function toggleFollow() {
    try {
      await api.post(`users/${userId}/follow/`);
      setIsFollowing(!isFollowing);
    } catch {
      alert('Erro ao seguir');
    }
  }

  return (
    <button onClick={toggleFollow}>
      {isFollowing ? 'Deixar de seguir' : 'Seguir'}
    </button>
  );
}

export default FollowButton;
