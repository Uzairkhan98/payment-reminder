export const ForgetPasswordForm = ({ setForgetPassword }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-slate-700 ">
        Reset Password
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
          />
        </div>

        <div className="mt-16">
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900"
            onClick={() => setForgetPassword((s) => !s)}
          >
            Back
          </button>
        </div>
        <div className="mt-4">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600">
            Send Reset Email
          </button>
        </div>
      </form>
    </>
  );
};
