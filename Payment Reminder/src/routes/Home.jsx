import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import Powerbutton from "../../src/power-icon.svg";

export const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(() => data.name);
      setEmail(() => data.email);
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
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
    <div className="w-full h-full absolute bg-slate-400">
      <header className="w-full bg-slate-800 py-4 text-lg text-gray-100 capitaliz flex justify-between items-center">
        <span className="pl-6">Welcome {name.split(" ")[0]}</span>
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
    </div>
  );
};
