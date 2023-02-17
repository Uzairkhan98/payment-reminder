import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import Powerbutton from "../../src/power-icon.svg";
import { PaymentCard } from "../components/PaymentCard";
import { AddPaymentCard } from "../components/AddPaymentCard";

export const Home = () => {
  const [name, setName] = useState("");
  const [docId, setDocId] = useState("");
  const [payments, setPayments] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(() => data.name);
      setDocId(() => doc.docs[0].id);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchUserDocs = async () => {
    try {
      const q = query(collection(db, "payment"));
      const doc = await getDocs(q);
      let userDocs = doc.docs.filter(
        (d) => d.data().user === `/users/${docId}` && !d.data().isDeleted
      );
      userDocs = userDocs.map((d) => {
        const res = d.data();
        return { ...res, id: d.id };
      });
      setPayments((s) => [...userDocs]);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user documents");
    }
  };

  useEffect(() => {
    fetchUserDocs();
  }, [docId]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const handleClick = () => {
    const signout = confirm("Do you want to signout?");
    if (!!signout) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen	 absolute bg-slate-400">
      <header className="w-full bg-slate-800 py-2 text-lg text-gray-100 capitaliz flex justify-between items-center">
        <span className="pl-6">Welcome, {name.split(" ")[0]}</span>
        <button onClick={() => handleClick()}>
          <img
            className="my-4 mr-8"
            src={Powerbutton}
            alt="logout"
            width={25}
            height={25}
            style={{
              filter:
                "invert(100%) sepia(96%) saturate(15%) hue-rotate(307deg) brightness(106%) contrast(103%)",
            }}
          />
        </button>
      </header>
      <main className="w-full mb-4">
        {payments.length > 0 ? (
          <div className="w-10/12 mx-auto mt-4 flex gap-8 flex-wrap">
            {payments.map((payment) => (
              <PaymentCard
                props={payment}
                key={payment.id}
                fetchUserDocs={fetchUserDocs}
              />
            ))}
            <AddPaymentCard
              docId={`users/${docId}`}
              fetchUserDocs={fetchUserDocs}
            />
          </div>
        ) : (
          <div className="w-full absolute flex justify-center mt-60">
            <AddPaymentCard
              docId={`users/${docId}`}
              fetchUserDocs={fetchUserDocs}
            />
          </div>
        )}
      </main>
    </div>
  );
};
