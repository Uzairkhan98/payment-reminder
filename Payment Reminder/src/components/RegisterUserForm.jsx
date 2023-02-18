import { useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { registerWithEmailAndPassword, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const RegisterUserForm = ({ setRegisterUser }) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) console.log("user has been regitered and logged in");
    if (error) console.error(error);
  }, [user, loading, error]);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!nameRef.current) alert("Please enter name");
    const res = await registerWithEmailAndPassword(
      nameRef.current,
      emailRef.current,
      passwordRef.current
    );
    if (!!res?.path) navigate("Dashboard");
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-slate-700 ">
        Sign Up
      </h1>
      <form className="mt-6" onSubmit={(e) => registerUser(e)}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            type="name"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border-2 rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
            defaultValue={nameRef.current}
            onChange={(e) => (nameRef.current = e.target.value)}
            minLength={3}
            maxLength={30}
          />
        </div>
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
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900"
            onClick={() => setRegisterUser((s) => !s)}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
};
