import styled from 'styled-components';
import { breakpoints } from './breakpoint';

export const Container = styled.div`
  margin-top: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;

  > div {
    flex: 1;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 0 16px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 14px;
    font-size: 13px;
  }
`;

export const Button = styled.button`
  border: none;
  background: black;
  color: white;

  padding: 0 18px;

  height: 44px;

  border-radius: 999px;

  cursor: pointer;

  font-size: 14px;
  font-weight: bold;

  white-space: nowrap;

  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentWrapper = styled.div<{
  $level: number;
}>`
  margin-left: ${(props) => props.$level * 25}px;
  margin-top: 12px;
`;

export const CommentCard = styled.div`
  display: flex;
  gap: 10px;
`;

export const NestedCommentCard = styled(CommentCard)<{
  $nested: boolean;
}>`
  background: ${(props) => (props.$nested ? '#f7f7f7' : 'white')};

  border-radius: 12px;
  padding: 10px;
`;

export const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;

  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  background: #f5f5f5;
  padding: 10px 14px;
  border-radius: 16px;
  flex: 1;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Username = styled.span`
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;

  transition: 0.2s;
`;

export const Date = styled.span`
  color: gray;
  font-size: 13px;
`;

export const Text = styled.p`
  margin-top: 6px;
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 8px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: gray;
    font-size: 13px;
    transition: 0.2s;

    &:hover {
      color: black;
    }
  }
`;

export const ReplyingTo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;

  strong {
    color: #1d9bf0;
  }
`;

export const CancelReply = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;

  width: fit-content;

  transition: 0.2s;

  &:hover {
    color: black;
  }
`;
