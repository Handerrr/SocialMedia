import styled from 'styled-components';
import { breakpoints } from './Breakpoint';

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 30px;
  border-bottom: 1px solid #e5e5e5;
  background: white;

  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 16px;
  }
`;

export const Logo = styled.h2`
  cursor: pointer;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
    font-size: 14px;
  }
`;

export const User = styled.span`
  font-weight: bold;
`;

export const Logout = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
`;
