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

  async function signOut() {
    const { error } = await client.auth.signOut({ scope: "local" });
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
    <div>
      <span className="text" onClick={() => console.log("Clicked!")}>
        Tes
      </span>
      <button onClick={() => console.log(showSession())}>Test</button>
      {/* {session.user && <p>Welcome, {session.user.email}!</p>} */}
      <button onClick={() => signUpNewUser()}>USer</button>

      <div className="bg-red-500 p-10 text-5xl font-bold text-white">
        TEST TAILWIND
      </div>
      {loading ? <h1>Loading</h1> : <h1>Loading done...</h1>}

      <div>
        <div className="absolute right-4 top-4 text-red-900 p-2">
          <div className="container fx-layer">
            <div className="top">
              <Link href="/login">
                <div
                  className="box start-btn"
                  onClick={signOut}
                  style={
                    {
                      "--w": "260px",
                      "--h": "75px",
                      "--tr": "15%",
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="text"
                    onClick={() => console.log("Clicked!")}
                  >
                    {session ? "Sign Out" : "Get started"}
                    {/* <Link href="/login">
                    {session ? "Sign Out" : "Get started"}
                    Tes
                  </Link> */}
                  </span>
                  <div className="btn-icon">
                    <svg
                      className="svg"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M779.180132 473.232045 322.354755 16.406668c-21.413706-21.413706-56.121182-21.413706-77.534887 0-21.413706 21.413706-21.413706 56.122205 0 77.534887l418.057421 418.057421L244.819868 930.057421c-21.413706 21.413706-21.413706 56.122205 0 77.534887 10.706853 10.706853 24.759917 16.059767 38.767955 16.059767s28.061103-5.353938 38.767955-16.059767L779.180132 550.767955C800.593837 529.35425 800.593837 494.64575 779.180132 473.232045z"></path>
                    </svg>
                  </div>
                  <div className="circle-overlay"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <Link
        className="login-button absolute right-4 top-4 text-red-900 p-2"
        href="/login"
      >
        Logina
      </Link> */}
      <div className="flex flex-col items-center justify-center">
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
