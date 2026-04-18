import "./login-register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/context/useAuth";
import { useContext } from "react";

import Button from "../../../src/assets/components/button/button";
import Input from "../../../src/assets/components/input/input";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/home");
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await register(email, password, name);
        navigate("/home");
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Register"} failed:`, error);
      alert(`${isLogin ? "Login" : "Register"} failed. Please try again.`);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <Button type="submit" label={isLogin ? "Login" : "Register"} className={`login-btn ${email.length > 0 && password.length > 0 ? "active" : ""}`} />
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={toggleMode} className="toggle-button">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}