import { HTTPError } from "ky";
import { useState } from "react";
import api from "../shared/lib/api";

import validator from "../shared/lib/validator";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../app/useAuth";

interface IAuthResponse {
  token: string;
  message: string;
}

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;

    setEmail(email);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    setPassword(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { token, message } = await api
        .post<IAuthResponse>("users/login", {
          json: {
            email,
            password,
          },
        })
        .json();

      toast.success(message);
      signin(token, () => navigate("/todos"));
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorMessage = await error.response.json();

        console.error("Error message:", errorMessage.details);
        toast.error(errorMessage.details);
      } else {
        console.error("Network error:", error);
      }
    }
  };

  const handleSignup = async () => {
    try {
      await api.post("users/create", {
        json: {
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorMessage = await error.response.json();
        console.error("Error message:", errorMessage.details);

        toast.error(errorMessage.details);
      } else {
        console.error("Network error:", error);
      }
    }
  };

  const isSubmitDisabled =
    !validator.isEmail(email) || !validator.isLength(password, { min: 8 });

  return (
    <div>
      <h3>로그인페이지</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          email
          <br />
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoFocus
            required
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          password
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          style={{
            backgroundColor: !isSubmitDisabled ? "#0073e5" : "lightgray",
            color: !isSubmitDisabled ? "white" : "gray",
            opacity: !isSubmitDisabled ? 1 : 0.5,
            border: "none",
            cursor: !isSubmitDisabled ? "pointer" : "not-allowed",
          }}
        >
          로그인
        </button>
      </form>
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Auth;
