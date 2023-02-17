import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterUserForm } from "../components/RegisterUserForm";

export const Login = () => {
  const [registerUser, setRegisterUser] = useState(false);

  const content = registerUser ? (
    <RegisterUserForm setRegisterUser={setRegisterUser} />
  ) : (
    <LoginForm setRegisterUser={setRegisterUser} />
  );

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden w-full bg-slate-600">
      <div className="w-11/12 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl drop-shadow-2xl">
        {content}
      </div>
    </div>
  );
};
