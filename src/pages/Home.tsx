import { useEffect, useRef } from "react";
import { useAuth } from "../app/useAuth";
import Input from "../shared/ui/Input";
import { useNavigate } from "react-router-dom";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, signin, signout } = useAuth();
  const navigate = useNavigate();

  console.log(user, signin, signout);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      console.log(inputRef.current.value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input ref={inputRef} />
        <button type="submit">추가하기</button>
      </form>
      <button onClick={() => navigate("/todos")}>Todo 페이지로 이동</button>
    </>
  );
}

export default Home;
