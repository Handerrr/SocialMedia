import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;

  border-radius: 10px;
  border: 1px solid #ddd;

  font-size: 16px;

  margin-bottom: 20px;
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px;

  border: 1px solid #eee;
  border-radius: 12px;

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  object-fit: cover;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  background: #111;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: bold;
`;
