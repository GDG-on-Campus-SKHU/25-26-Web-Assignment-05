import React from 'react';
import { TodoCard } from '../styles/todoStyles';

interface Props {
  title: string;
  completed: boolean;
}

export default function TodoItem({ title, completed }: Props) {
  return (
    <TodoCard completed={completed}>
      <h4>{title}</h4>
      <p>{completed ? '완료됨 ✔️' : '미완료 ❗️'}</p>
    </TodoCard>
  );
}
