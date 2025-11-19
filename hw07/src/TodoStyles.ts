import styled from "styled-components";

// 전체 페이지 레이아웃
export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
`;

// 상단 타이틀
export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #111827;
`;

// 카드 리스트 영역
export const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// "할 일이 없습니다." 메시지
export const Message = styled.p`
  text-align: center;
  padding: 24px 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  color: #6b7280;
`;

// 마지막 업데이트 시간
export const UpdatedTime = styled.p`
  margin-top: 16px;
  font-size: 0.875rem;
  color: #6b7280;
`;

// Todo 카드
export const TodoCard = styled.div<{ completed: boolean }>`
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ completed }) => (completed ? "#dcfce7" : "#ffffff")};
  border: 1px solid ${({ completed }) => (completed ? "#22c55e" : "#e5e7eb")};
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
    background: ${({ completed }) => (completed ? "#bbf7d0" : "#f9fafb")};
  }
`;

// Todo 제목
export const TodoTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
  margin-right: 12px;
  flex: 1;
`;

// 완료 여부 뱃지
export const TodoStatus = styled.span<{ completed: boolean }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ completed }) => (completed ? "#166534" : "#9ca3af")};
  background: ${({ completed }) => (completed ? "#bbf7d0" : "#f3f4f6")};
`;
