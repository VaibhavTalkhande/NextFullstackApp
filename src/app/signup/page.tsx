"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {on } from "events";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabeled, setButtonDisabeled] = React.useState(false);//buttonDisabeled
  const onSignup = async () => {
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-2xl font-semibold">Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="username" className="border-2 border-gray-500 rounded-md p-2 m-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email" className="border-2 border-gray-500 rounded-md p-2 m-2"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password" className="border-2 border-gray-500 rounded-md p-2 m-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSignup}>
       login
      </button>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
