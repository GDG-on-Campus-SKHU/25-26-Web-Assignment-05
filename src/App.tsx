import { useEffect, useState } from "react";
import styled from "styled-components";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("API 호출 실패");
      const data: Todo[] = await res.json();
      setTodos(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Todo 불러오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // 초기 로드

    const timer = setInterval(fetchTodos, 5000); // 5초마다 자동 갱신

    return () => clearInterval(timer); // 언마운트 시 정리
  }, []);

  return (
    <PageWrapper>
      <CardContainer>
        <Header>
          <Title>Todo 정보 관리 프로그램</Title>
          <RefreshButton disabled={isLoading} onClick={fetchTodos}>
            {isLoading ? "로딩중..." : "새로고침"}
          </RefreshButton>
        </Header>

        {todos.length === 0 && !isLoading && (
          <EmptyMessage>할 일이 없습니다.</EmptyMessage>
        )}

        <TodoList>
          {todos.map((todo) => (
            <TodoCard completed={todo.completed} key={todo.id}>
              <TodoTitle>{todo.title}</TodoTitle>
              <TodoStatus completed={todo.completed}>
                {todo.completed ? "완료" : "미완료"}
              </TodoStatus>
            </TodoCard>
          ))}
        </TodoList>

        <UpdatedTime>
          {lastUpdated
            ? `마지막 업데이트: ${lastUpdated.toLocaleTimeString("ko-KR")}`
            : "업데이트 기록 없음"}
        </UpdatedTime>
      </CardContainer>
    </PageWrapper>
  );
}

export default App;

/* ---------------- styled-components ---------------- */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 480px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const RefreshButton = styled.button`
  background: #1976d2;
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #1560ac;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoCard = styled.li<{ completed: boolean }>`
  background: ${(p) => (p.completed ? "#d7f5d4" : "#ffffff")};
  border: 1px solid #e0e0e0;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  transition: 0.2s;

  &:hover {
    background: ${(p) => (p.completed ? "#c5edc0" : "#f5f7fa")};
  }
`;

const TodoTitle = styled.span`
  font-size: 14px;
  flex: 1;
`;

const TodoStatus = styled.span<{ completed: boolean }>`
  padding: 4px 10px;
  border-radius: 8px;
  background: ${(p) => (p.completed ? "#c8e6c9" : "#ffcdd2")};
  color: ${(p) => (p.completed ? "#1b5e20" : "#b71c1c")};
  font-size: 12px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
`;

const UpdatedTime = styled.p`
  margin-top: 12px;
  text-align: right;
  font-size: 12px;
  color: #666;
`;

