import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: #1e293b;
  border-radius: 16px;
  padding: 32px;
  color: white;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const AvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

export const DefaultAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #334155;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const FileInput = styled.input`
  color: white;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    font-size: 14px;
  }

  input,
  textarea {
    background: #334155;
    border: none;
    border-radius: 8px;
    padding: 12px;
    color: white;
    font-size: 14px;
  }

  textarea {
    min-height: 100px;
    resize: none;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

export const BackButton = styled.button`
  flex: 1;
  background: #475569;
  border: none;
  border-radius: 8px;
  padding: 12px;
  color: white;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  flex: 1;
  background: #2563eb;
  border: none;
  border-radius: 8px;
  padding: 12px;
  color: white;
  cursor: pointer;
`;
