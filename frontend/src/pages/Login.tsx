import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import * as S from '../Styles/Login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post('token/', {
        username,
        password,
      });

      console.log(response.data);

      localStorage.setItem('token', response.data.access);

      alert('Login feito com sucesso!');
      navigate('/feed');
    } catch (error) {
      alert('Erro no login');
    }
  }

  return (
    <S.Container>
      <S.Box>
        <S.Title>Login</S.Title>

        <S.Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <S.Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <S.Button onClick={handleLogin}>Entrar</S.Button>
        <S.LinkText onClick={() => navigate('/register')}>
          Não tem conta? Cadastre-se
        </S.LinkText>
      </S.Box>
    </S.Container>
  );
}

export default Login;
