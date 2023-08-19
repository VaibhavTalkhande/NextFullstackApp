"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabeled, setButtonDisabeled] = React.useState(false); //buttonDisabeled
  const [loading, setLoading] = React.useState(false); //loading
  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);

      console.log(res.data);
      toast("Signup successfull");

      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
      toast.success("Signup successfull");
    }
  };
  useEffect(() => {
    if (
      user.email.length > 5 &&
      user.password.length > 8 &&
      user.username.length > 3
    ) {
      setButtonDisabeled(false);
    } else {
      setButtonDisabeled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      
      <h1 className="text-2xl font-semibold">
        {loading ? "Loading..." : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username" className="mr-20">
        Username
      </label>
      <input
        type="text"
        placeholder="username"
        name="username"
        className="border-2 border-gray-500 rounded-md p-2 m-2 text-left text-black"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email"
        name="email"
        className="border-2 border-gray-500 rounded-md p-2 m-2 text-left text-black"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        className="border-2 border-gray-500 rounded-md p-2 m-2 text-left text-black"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-2 border-gray-500 m-2"
        onClick={onSignup}
      >
        {buttonDisabeled ? "Please fill all fields" : "Signup"}
      </button>
      <hr />
      <p>Already have an account?</p>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
