import { useRef, useEffect } from "react";

import Input from "../../shared/ui/Input";

interface TodoFormProps {
  createTodo: (task: { title: string; content: string }) => Promise<void>;
}

function TodoForm({ createTodo }: TodoFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextAreatRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  //TODO: 입력필드 제한
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInputRef.current && contentTextAreatRef.current) {
      createTodo({
        title: titleInputRef.current.value,
        content: contentTextAreatRef.current.value,
      });

      titleInputRef.current.value = "";
      contentTextAreatRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="title" ref={titleInputRef} />
      <textarea name="content" ref={contentTextAreatRef} />
      <button type="submit">추가하기</button>
    </form>
  );
}
export default TodoForm;
