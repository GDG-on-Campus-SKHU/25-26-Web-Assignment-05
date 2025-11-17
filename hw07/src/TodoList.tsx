import React, { useEffect, useState } from "react";
import type { Todo } from "./todo";
import TodoItem from "./TodoItem";
import {
  AppContainer,
  Title,
  ListContainer,
  Message,
  UpdatedTime,
} from "./TodoStyles";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("네트워크 응답이 정상이 아닙니다.");
      }
      const data: Todo[] = await res.json();
      setTodos(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Todo 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    // 처음 마운트될 때 한 번 호출
    fetchTodos();

    // 5초마다 자동 갱신
    const intervalId = setInterval(fetchTodos, 5000);

    // 언마운트 시 clearInterval
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return "로드 중...";
    return date.toLocaleTimeString();
  };

  return (
    <AppContainer>
      <Title>Todo 정보 관리 프로그램</Title>

      <ListContainer>
        {todos.length === 0 ? (
          <Message>할 일이 없습니다.</Message>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ListContainer>

      <UpdatedTime>마지막 업데이트: {formatTime(lastUpdated)}</UpdatedTime>
    </AppContainer>
  );
};

export default TodoList;
