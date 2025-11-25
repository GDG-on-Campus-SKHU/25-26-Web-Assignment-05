import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import {
  Container,
  Header,
  TodoWrapper,
  LastUpdated,
  ButtonRow,
  ControlButton,
} from '../styles/todoStyles';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filter, setFilter] = useState<'all' | 'done' | 'not'>('all');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // ---------------------------
  // API 요청 함수
  // ---------------------------
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await res.json();
      setTodos(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('네트워크 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // 처음 로드 시 API 호출
  // ---------------------------
  useEffect(() => {
    fetchTodos();
  }, []);

  // ---------------------------
  // 자동 갱신 (5초마다)
  // ---------------------------
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => clearInterval(timer);
  }, [autoRefresh]);

  // ---------------------------
  // 필터링 처리
  // ---------------------------
  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.completed;
    if (filter === 'not') return !todo.completed;
    return true;
  });

  return (
    <Container>
      <Header>📌 자동 업데이트 Todo List</Header>

      {/* 버튼 모음 */}
      <ButtonRow>
        <ControlButton onClick={() => fetchTodos()}>즉시 새로고침</ControlButton>

        <ControlButton onClick={() => setAutoRefresh(prev => !prev)}>
          {autoRefresh ? '자동 갱신 끄기' : '자동 갱신 켜기'}
        </ControlButton>

        <ControlButton onClick={() => setFilter('all')}>전체</ControlButton>
        <ControlButton onClick={() => setFilter('done')}>완료</ControlButton>
        <ControlButton onClick={() => setFilter('not')}>미완료</ControlButton>
      </ButtonRow>

      {/* 로딩 표시 */}
      {loading ? (
        <p>불러오는 중...</p>
      ) : filteredTodos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <TodoWrapper>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </TodoWrapper>
      )}

      {/* 최근 업데이트 시간 */}
      <LastUpdated>최근 업데이트: {lastUpdated || '---'}</LastUpdated>
    </Container>
  );
}
