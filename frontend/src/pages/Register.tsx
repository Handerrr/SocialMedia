import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import * as S from '../Styles/Login';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      await api.post('register/', {
        username,
        password,
        email,
      });

      alert('Conta criada com sucesso!');
      navigate('/');
    } catch (error: any) {
      console.log(error.response?.data);
      alert('Erro ao cadastrar');
    }
  }

  return (
    <S.Container>
      <S.Box>
        <S.Title>Cadastro</S.Title>
        <S.Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <S.Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button onClick={handleRegister}>Cadastrar</S.Button>

        <S.LinkText onClick={() => navigate('/')}>
          Ja tem conta? Fazer Login
        </S.LinkText>
      </S.Box>
    </S.Container>
  );
}

export default Register;
