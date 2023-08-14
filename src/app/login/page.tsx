"use client";
import Link from "next/link";
import React from "react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabeled, setButtonDisabeled] = React.useState(false); //buttonDisabeled
  const [loading, setLoading] = React.useState(false); //loading
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      toast.success("Login successfull");
      console.log(res.data);
    
      router.push("/profile");
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
    } finally {
      setLoading(false);


      toast.success("Login successfull");

    }

    }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabeled(false);
    } else {
      setButtonDisabeled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-2xl font-semibold">
        {loading ? "Loading..." : "Login"}
      </h1>
        <hr />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border-2 border-gray-500 rounded-md p-2 m-2 text-left text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        className="border-2 border-gray-500 rounded-md p-2 m-2 text-left text-black"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onLogin}>
        Login
      </button>
      <Link href="/signup"
        className=" text-white hover:text-blue-800	hover:invert font-bold py-2 px-4 rounded">Register here</Link>
    </div>
  );
}
