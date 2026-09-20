"use client";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import client from "@/api/client";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [session, setSession] = useState<any | null>(null);
  // const { data, error } = client.auth.getSession();

  // if (!loading && user) {
  //   // router.push("/todo");
  //   return null;
  // }

  useEffect(() => {
    // 1. Get initial session from storage
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  function showSession() {
    console.log("Current session:", session.user.email);
  }

  async function signUpNewUser() {
    const { data, error } = await client.auth.signUp({
      email: "nikhilbangalor@gmail.com",
      password: "123456",
    });

    if (error) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
    } else {
      console.log("Signup successful:", data);
      alert("Signup successful! Check your email for confirmation.");
    }
  }
  return (
    <div className="relative min-h-screen">
      <button onClick={() => console.log(showSession())}>Test</button>
      {/* {session.user && <p>Welcome, {session.user.email}!</p>} */}
      <button onClick={() => signUpNewUser()}>USer</button>
      {loading ? <h1>Loading</h1> : <h1>Loading done...</h1>}
      <Link
        className="login-button absolute right-4 top-4 text-red-900 p-2"
        href="/login"
      >
        Login
      </Link>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
          Karya
        </h1>
        <h4>What Matters Now</h4>
        <a
          href="/todo"
          className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-base px-5 py-3 focus:outline-none"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
