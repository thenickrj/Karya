import { useState } from "react";
import "./style.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import client from "@/api/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signUpNewUser(e) {
    e.preventDefault();
    function validatePassword(password) {
      switch (true) {
        case !password:
          return "Password cannot be empty.";
        case password.length < 8:
          return "Password must be at least 8 characters long.";
        case !/[A-Z]/.test(password):
          return "Password must contain at least one uppercase letter.";
        case !/[a-z]/.test(password):
          return "Password must contain at least one lowercase letter.";
        case !/[0-9]/.test(password):
          return "Password must contain at least one number.";
        case !/[!@#$%^&*(),.?":{}|<>_]/.test(password):
          return "Password must contain at least one special character.";
        default:
          return "Valid password.";
      }
    }
    const { data, error } = await client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (error) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
      return;
    }

    console.log("Signup successful:", data);
    alert("Signup successful! Check your email for confirmation.");
  }

  function validateEmail(email) {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strictRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (true) {
      case !email:
        return "Email is empty.";
      case !email.includes("@"):
        return "Missing @ symbol.";
      case !basicRegex.test(email):
        return "Invalid email structure.";
      case !strictRegex.test(email):
        return "Email does not meet strict formatting rules.";
      default:
        return "Valid email address.";
    }
  }

  function validateSignIn(email, password) {
    // 1. Basic client-side sanity checks (Ensure fields aren't blank)
    console.log(email, password);
    switch (true) {
      case !email.trim():
        return "Please enter your email address";
      case !password:
        return "Please enter your password";
      default:
        // 2. Clear for submission
        return "CLEAR TO SUBMIT";
    }
  }
  async function signInWithEmail(e) {
    e.preventDefault();

    // precheck
    const emailValidation = await validateSignIn(email, password);

    if (emailValidation == "CLEAR TO SUBMIT") {
      const data = await client.auth
        .signInWithPassword({
          email: email,
          // email: "valid.email@supabase.io",

          password: password,
        })
        .then((response) => {
          console.log("Signin response:", response);
          if (response.error) {
            console.error("Signin failed:", response);
            console.log(`Signin failed: ${response.error.message}`);
            setErrorMessage(response.error.message);
            return;
          }

          setError(false);

          router.push("/");
        });
    } else {
      setErrorMessage(emailValidation);
      setError(true);
    }
    // if (error) {
    //   console.error("Signin failed:", error);
    //   alert(`Signin failed: ${error.message}`);
    //   return;
    // }

    // console.log("Signin successful:", data);
    // alert("Signin successful! Check your email for confirmation.");

    // router.push("/");
  }
  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={signUpNewUser}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FcGoogle size={20} />
            </a>
            <a href="#" className="icon">
              <FaFacebook color="#1877F2" size={20} />
            </a>
            <a href="#" className="icon">
              <FaGithub color="#000000" size={20} />
            </a>
            <a href="#" className="icon">
              <FaLinkedinIn color="#0077b5" size={20} />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={signInWithEmail}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FcGoogle size={20} />
            </a>
            <a href="#" className="icon">
              <FaFacebook color="#1877F2" size={20} />{" "}
            </a>
            <a href="#" className="icon">
              <FaGithub color="#000000" size={20} />
            </a>
            <a href="#" className="icon">
              <FaLinkedinIn color="#0077b5" size={20} />
            </a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            style={{
              border:
                error && errorMessage == "Please enter your email address"
                  ? "1px solid red"
                  : "none",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              border:
                error && errorMessage == "Please enter your password"
                  ? "1px solid red"
                  : "none",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <span className="mt-2 flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                !
              </span>
              {errorMessage}
            </span>
          )}
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle overlay */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              className="hidden_login"
              onClick={() => setIsActive(false)}
              type="button"
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button
              className="hidden_login"
              onClick={() => {
                setIsActive(true);
              }}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
