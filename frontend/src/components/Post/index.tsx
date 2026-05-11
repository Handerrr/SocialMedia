import { useState } from 'react';
import { api } from '../../services/api';

function CreatePost({ onPostCreated }: any) {
  const [content, setContent] = useState('');

  async function handleCreate() {
    if (!content) return;

    try {
      await api.post('posts/', {
        content,
      });

      setContent('');
      onPostCreated();
    } catch {
      alert('Erro ao criar Post');
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <textarea
        placeholder="O que você está pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleCreate}>Postar</button>
    </div>
  );
}

export default CreatePost;
