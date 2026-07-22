import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
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
