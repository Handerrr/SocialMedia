import styled from 'styled-components';
import { breakpoints } from './Breakpoint';

export const Page = styled.div`
  background: #fff;
  min-height: 100vh;
  color: #111;
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 0 12px;
    margin-top: 15px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 15px 0;
`;

export const Post = styled.div`
  display: flex;
  gap: 12px;
  padding: 18px 0;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  color: #555;

  flex-shrink: 0;
`;

export const PostContent = styled.div`
  flex: 1;
`;

export const Username = styled.span`
  font-weight: bold;
`;

export const Handle = styled.span`
  color: gray;
  margin-left: 6px;
  font-size: 14px;
`;

export const Text = styled.p`
  margin: 5px 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

export const CreatePostBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const Input = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
`;

export const Button = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`;

export const CommentButton = styled.button`
  background: transparent;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: black;
  }
`;
