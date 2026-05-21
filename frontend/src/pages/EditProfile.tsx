import { useState, useEffect, type ChangeEvent } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import * as S from '../Styles/EditProfile';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await api.get('profile/');
      setUsername(res.data.username);
      setBio(res.data.bio || '');

      if (res.data.profile_pic_url) {
        setPreview(res.data.profile_pic_url);
      }
    }
    load();
  }, []);

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  }

  async function updateProfile() {
    try {
      const formData = new FormData();

      formData.append('username', username);
      formData.append('bio', bio);

      if (password) {
        formData.append('password', password);
      }

      if (profilePic) {
        formData.append('profile_pic', profilePic);
      }

      await api.put('profile/update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Perfil atualizado!');
    } catch {
      alert('Erro ao atualizar');
    }
  }

  return (
    <S.Container>
      <S.Card>
        <S.Title>Edit Profile</S.Title>

        <S.AvatarSection>
          {preview ? (
            <S.AvatarPreview src={preview} />
          ) : (
            <S.DefaultAvatar>
              {username.charAt(0).toUpperCase()}
            </S.DefaultAvatar>
          )}

          <S.FileInput type="file" onChange={handleImage} />
        </S.AvatarSection>

        <S.InputGroup>
          <label>Username</label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </S.InputGroup>

        <S.InputGroup>
          <label>Bio</label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Digite sua bio aqui"
          />
        </S.InputGroup>

        <S.InputGroup>
          <label>New password (Optional)</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
        </S.InputGroup>

        <S.Buttons>
          <S.BackButton onClick={() => navigate('/profile')}>Back</S.BackButton>

          <S.SaveButton onClick={updateProfile}>Save</S.SaveButton>
        </S.Buttons>
      </S.Card>
    </S.Container>
  );
}

export default EditProfile;
