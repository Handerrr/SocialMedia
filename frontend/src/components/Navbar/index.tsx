import { useNavigate } from 'react-router-dom';
import * as S from '../../Styles/Navbar';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

type User = {
  username: string;
};

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get('profile/');
        setUser(res.data);
      } catch {
        console.log('Erro ao carregar o user');
      }
    }
    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <S.Nav>
      <S.Logo onClick={() => navigate('/feed')}>Social</S.Logo>
      <S.Menu>
        <span onClick={() => navigate('/feed')}>Feed</span>
        <span onClick={() => navigate('/profile')}>Perfil</span>
        <span onClick={() => navigate('/search')}>Search</span>
        {user && <S.User>@{user.username}</S.User>}
        <S.Logout onClick={handleLogout}>Logout</S.Logout>
      </S.Menu>
    </S.Nav>
  );
}

export default Navbar;
