import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('네트워크 응답이 정상이 아닙니다.');
      }
      const data: Todo[] = await res.json();
      setTodos(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('API 호출 중 오류 발생:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 처음 마운트될 때 한 번 호출
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 5초마다 자동 갱신 + unmount 시 clearInterval
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchTodos]);

  return (
    <PageWrapper>
      <Card>
        <Title>Todo 정보 관리 프로그램</Title>

        {loading && <Message>불러오는 중...</Message>}

        {!loading && todos.length === 0 && (
          <Message>할 일이 없습니다.</Message>
        )}

        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} $completed={todo.completed}>
              <TodoTitle>{todo.title}</TodoTitle>
              <TodoStatus completed={todo.completed}>
                {todo.completed ? '완료' : '미완료'}
              </TodoStatus>
            </TodoItem>
          ))}
        </TodoList>

        <Footer>
          {lastUpdated
            ? `마지막 업데이트: ${lastUpdated}`
            : '아직 업데이트된 기록이 없습니다.'}
        </Footer>
      </Card>
    </PageWrapper>
  );
};

export default App;

/* styled-components (타입 포함) */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
`;

const Card = styled.div`
  width: 480px;
  max-width: 90vw;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 28px 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
`;

const Message = styled.p`
  margin: 8px 0;
  text-align: center;
  color: #6b7280;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface TodoItemProps {
  $completed: boolean;
}

const TodoItem = styled.li<TodoItemProps>`
  padding: 12px 14px;
  border-radius: 10px;
  background-color: ${(props) => (props.$completed ? '#d1fae5' : '#ffffff')};
  border: 1px solid ${(props) => (props.$completed ? '#6ee7b7' : '#e5e7eb')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
    background-color: ${(props) =>
      props.$completed ? '#a7f3d0' : '#f9fafb'};
  }
`;

const TodoTitle = styled.span`
  flex: 1;
  margin-right: 8px;
  font-size: 15px;
`;

interface TodoStatusProps {
  completed: boolean;
}

const TodoStatus = styled.span<TodoStatusProps>`
  font-size: 13px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: ${(props) => (props.completed ? '#10b981' : '#9ca3af')};
  color: white;
`;

const Footer = styled.div`
  margin-top: 6px;
  font-size: 12px;
  text-align: right;
  color: #6b7280;
`;
