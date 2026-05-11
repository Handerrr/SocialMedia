import styled from 'styled-components';
import { breakpoints } from './Breakpoint';

export const Container = styled.footer`
  margin-top: 60px;
  border-top: 1px solid #e5e5e5;
  background: #fff;
`;

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 18px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 24px 16px;
    gap: 14px;
  }
`;

export const Logo = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const Links = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  span {
    color: #666;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: black;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 14px;

    span {
      font-size: 14px;
    }
  }
`;

export const Copy = styled.p`
  color: #888;
  font-size: 14px;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
`;
