import styled from 'styled-components';

export const Container = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const TodoCard = styled.div<{ completed: boolean }>`
  padding: 16px;
  border-radius: 10px;
  background: ${({ completed }) => (completed ? '#d4f8d4' : '#ffffff')};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  h4 {
    margin: 0 0 6px 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }
`;

export const LastUpdated = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
  text-align: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const ControlButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #4c6ef5;
  color: white;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #3b5bdb;
  }
`;
