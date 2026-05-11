import styled from 'styled-components';
import { breakpoints } from './Breakpoint';

export const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 20px;
    font-size: 32px;
  }

  span {
    color: #777;
    margin-top: 5px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    h1 {
      font-size: 24px;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 140px;
  height: 140px;

  border-radius: 50%;
  object-fit: cover;
`;

export const DefaultAvatar = styled.div`
  width: 140px;
  height: 140px;

  border-radius: 50%;
  background: #111;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 52px;
  font-weight: bold;
`;

export const Stats = styled.div`
  display: flex;
  gap: 30px;

  margin-top: 25px;

  button,
  div {
    border: none;
    background: transparent;

    font-size: 16px;
    cursor: pointer;
  }

  strong {
    margin-right: 5px;
  }
`;

export const EditButton = styled.button`
  margin-top: 25px;

  padding: 12px 30px;

  border: 1px solid #111;
  background: transparent;

  border-radius: 8px;

  font-weight: bold;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #111;
    color: white;
  }
`;

export const ListBox = styled.div`
  margin-top: 40px;

  border-top: 1px solid #ddd;

  padding-top: 20px;

  h3 {
    margin-bottom: 15px;
  }

  p {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
`;

export const UserRow = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  span {
    font-size: 15px;
    font-weight: 500;
  }
`;

export const Page = styled.div`
  min-height: 100vh;
  background: #fff;
`;

export const PostCard = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #eee;
`;

export const PostHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PostAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SmallAvatar = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 50%;
  background: #111;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: bold;
`;

export const PostText = styled.p`
  margin-top: 12px;
  line-height: 1.5;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
`;

export const CommentButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: gray;
`;

export const PostDate = styled.div`
  font-size: 13px;
  color: gray;
`;

export const DeleteButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #e63946;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
  }
`;
