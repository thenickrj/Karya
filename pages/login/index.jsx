import { useState } from "react";
import "./style.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import client from "@/api/client";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isBtnScaled, setIsBtnScaled] = useState(false);

  const handleOverlayClick = () => {
    setIsRightPanelActive((prev) => !prev);
    setIsBtnScaled(false);
    requestAnimationFrame(() => {
      setIsBtnScaled(true);
    });

    console.log(isBtnScaled);
  };

  async function signUpNewUser() {
    const { data, error } = await client.auth.signUp({
      email: "valid.email@supabase.io",
      password: "example-password",
    });

    if (error) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
      return;
    }

    console.log("Signup successful:", data);
    alert("Signup successful! Check your email for confirmation.");
  }

  async function signInWithEmail() {
    const { data, error } = await client.auth.signInWithPassword({
      email: email,
      // email: "valid.email@supabase.io",

      password: password,
    });

    if (error) {
      console.error("Signin failed:", error);
      alert(`Signin failed: ${error.message}`);
    } else {
      console.log("Signin successful:", data);
      alert("Signin successful! Check your email for confirmation.");
    }
  }
  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <button onClick={() => console.log("user", isActive)}>Test</button>

      <div className={`container-inner ${isActive ? "active" : ""}`}>
        <h1>Login Page</h1>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                {/* <i className="fa-brands fa-google-plus-g"></i> */}
                <FcGoogle />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
                className="hidden"
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
                className={`hidden ${isBtnScaled ? "btnScaled" : ""}`}
                id="overlayBtn"
                onClick={() => {
                  handleOverlayClick();
                  setIsActive(true);
                  console.log("Sign Up button clicked");
                }}
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
