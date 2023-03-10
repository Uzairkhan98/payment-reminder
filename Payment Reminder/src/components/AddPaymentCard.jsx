import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useRef } from "react";

export const AddPaymentCard = ({ docId, fetchUserDocs }) => {
  const [showModal, setShowModal] = useState(false);
  const titleRef = useRef("");
  const descRef = useRef("");
  const paymentRef = useRef("");
  const dateRef = useRef("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    try {
      const res = await addDoc(collection(db, "payment"), {
        title: titleRef.current,
        description: descRef.current,
        paymentStatus: paymentRef.current === "paymentStatus" ? true : false,
        dueDate: new Date(dateRef.current),
        user: `/${docId}`,
        isDeleted: false,
      });
      fetchUserDocs();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-slate-700 hover:bg-slate-600 max-sm:w-11/12 max-md:w-5/12 max-lg:w-2/6 max-xl:w-2/6 max-2xl:w-3/12 2xl:w-3/12 flex flex-col border-2 border-black rounded p-4 gap-2"
      >
        <h1 className="text-xl uppercase font-extrabold mx-auto my-auto">
          add payment
        </h1>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto max-sm:w-11/12 mx-auto bg-gray-700 outline-none focus:outline-none"
                onSubmit={(e) => handleSubmit(e)}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t text-white">
                  <h3 className="text-3xl font-semibold mr-40">
                    Create a New Payment
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="title"
                      id="title"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="My First Payment"
                      required
                      ref={titleRef}
                      onChange={(e) => (titleRef.current = e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      type="description"
                      id="description"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Once upon a time in a descriptive payment land"
                      ref={descRef}
                      onChange={(e) => (descRef.current = e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Due Date
                    </label>
                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                        onChange={(e) => (dateRef.current = e.target.value)}
                        ref={dateRef}
                      />
                    </div>
                    <div className="text-white mt-4 -mb-10">
                      <input
                        type="checkbox"
                        name="payment"
                        value="paymentStatus"
                        onChange={(e) => (paymentRef.current = e.target.value)}
                        ref={paymentRef}
                      />
                      <label htmlFor="payment"> Payment Completed</label>
                    </div>
                    <br></br>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
