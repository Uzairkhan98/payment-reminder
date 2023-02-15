import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { logInWithEmailAndPassword } from "../firebase";

export const LoginForm = ({ setForgetPassword, setRegisterUser }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const LoginUser = async () => {
    const res = await logInWithEmailAndPassword(
      emailRef.current,
      passwordRef.current
    );
    console.log(emailRef.current, passwordRef.current, res);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-slate-700 ">
        Sign in
      </h1>
      <form className="mt-6">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border-2 rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
            defaultValue={emailRef.current}
            onChange={(e) => (emailRef.current = e.target.value)}
            minLength={5}
            maxLength={30}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border-2 rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
            defaultValue={passwordRef.current}
            onChange={(e) => (passwordRef.current = e.target.value)}
            minLength={3}
            maxLength={30}
          />
        </div>
        <a
          href="#"
          className="text-sm text-slate-600 hover:underline"
          onClick={() => setForgetPassword((s) => !s)}
        >
          Forget Password?
        </a>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            onClick={() => LoginUser()}
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-8 text-sm font-300 text-center text-gray-700">
        {" "}
        Don't have an account?{" "}
        <a
          href="#"
          className="font-medium text-slate-600 hover:underline"
          onClick={() => setRegisterUser((s) => !s)}
        >
          Sign up
        </a>
      </p>
    </>
  );
};
