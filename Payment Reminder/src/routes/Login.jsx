import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterUserForm } from "../components/RegisterUserForm";
import { ForgetPasswordForm } from "../components/ForgetPasswordForm";

export const Login = () => {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [registerUser, setRegisterUser] = useState(false);

  const content = forgetPassword ? (
    <ForgetPasswordForm setForgetPassword={setForgetPassword} />
  ) : registerUser ? (
    <RegisterUserForm setRegisterUser={setRegisterUser} />
  ) : (
    <LoginForm
      setForgetPassword={setForgetPassword}
      setRegisterUser={setRegisterUser}
    />
  );

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden w-full bg-slate-600">
      <div className="w-11/12 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl drop-shadow-2xl">
        {content}
      </div>
    </div>
  );
};
