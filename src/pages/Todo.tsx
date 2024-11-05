import { useEffect, useState } from "react";

import api from "../shared/lib/api";
import format from "../shared/lib/format";
import TodoForm from "../features/todo/TodoForm";

interface ApiResponse<T> {
  data: T;
}

interface ITodo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const { data } = await api.get<ApiResponse<ITodo[]>>("todos").json();

    setTodos(data);
  };

  const createTodo = async (task: { title: string; content: string }) => {
    const { data: newTodo } = await api
      .post<ApiResponse<ITodo>>("todos", {
        json: {
          ...task,
        },
      })
      .json();

    setTodos((prev) => [...prev, newTodo]);
  };

  const selectTodo = (todo: ITodo) => {
    setSelectedTodo(todo);
  };

  return (
    <section>
      <h3>TODO-LIST</h3>
      <TodoForm createTodo={createTodo} />

      <ul>
        {todos.map((todo) => (
          <li key={todo.createdAt} onClick={() => selectTodo(todo)}>
            <b>{todo.title}</b>
          </li>
        ))}
      </ul>

      <br />
      <br />

      {selectedTodo && (
        <span>
          {selectedTodo.title} <br />
          {selectedTodo.content}
          <br />
          <p
            style={{
              color: "lightgray",
              fontSize: "10px",
              textAlign: "right",
            }}
          >
            작성일: {format.todoDate(selectedTodo.createdAt)}
            <br />
            최종 수정일: {format.todoDate(selectedTodo.updatedAt)}
          </p>
        </span>
      )}
    </section>
  );
}

export default Todo;
