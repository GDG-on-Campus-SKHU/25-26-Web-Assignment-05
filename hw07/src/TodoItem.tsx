import React from "react";
import type { Todo } from "./todo";
import { TodoCard, TodoTitle, TodoStatus } from "./TodoStyles";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <TodoCard completed={todo.completed}>
      <TodoTitle>{todo.title}</TodoTitle>
      <TodoStatus completed={todo.completed}>
        {todo.completed ? "완료" : "미완료"}
      </TodoStatus>
    </TodoCard>
  );
};

export default TodoItem;

