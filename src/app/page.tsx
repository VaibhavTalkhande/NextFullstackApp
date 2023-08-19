import Image from 'next/image'
import User from "@/models/userModel";
import React from 'react';
import Link from "next/link";
import { connect } from '@/dbConfig/dbConfig';
connect();
export default async function Home() {
  const user= await User.find({});
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <hr />
      <p className="text-4xl">User List</p>
      <hr />
      <Link href="/login"> 
      <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
        Login
      </button>
      </Link>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2 text-white" >{user.username}</td>
              <td className="border px-4 py-2" >{user.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

