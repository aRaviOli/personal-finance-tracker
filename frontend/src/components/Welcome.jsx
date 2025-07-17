import { useEffect, useState } from "react";
import "./Welcome.css"; // for animation styles

function Welcome({ onLogin }) {
  const [mode, setMode] = useState("login"); // or "register"
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    document.title = (mode === "login" ? "Login" : "Register") + " | Fintrack";
  }, [mode]);

  const handleToggle = () => {
    setError("");
    setAnimating(true);
    setTimeout(() => {
      setMode((prev) => (prev === "login" ? "register" : "login"));
      setAnimating(false);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password } = form;
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass || (mode === "register" && !name.trim())) {
      return setError("All fields are required.");
    }

    if (mode === "register") {
      if (localStorage.getItem(`user_${trimmedUser}`)) {
        return setError("Username already exists.");
      }
      localStorage.setItem("finance_user", trimmedUser);
      localStorage.setItem(`user_${trimmedUser}`, JSON.stringify({
        name: name.trim(),
        password: trimmedPass,
      }));
      onLogin(trimmedUser);
    } else {
      const existing = JSON.parse(localStorage.getItem(`user_${trimmedUser}`));
      if (!existing) return setError("User not found.");
      if (existing.password !== trimmedPass) return setError("Incorrect password.");

      localStorage.setItem("finance_user", trimmedUser);
      onLogin(trimmedUser);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border animate-fadeSlideUp">
        {/* Logo + Title */}
        <div className="flex items-center justify-center mb-6 space-x-2">
          <span className="text-3xl">💸</span>
          <h1 className="text-2xl font-bold text-indigo-700">Fintrack</h1>
        </div>

        {/* Toggle Mode Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleToggle}
            className="text-sm text-indigo-600 underline hover:text-indigo-800 transition"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

        {/* Form */}
        <form
          className={`space-y-4 transition-opacity duration-300 ${
            animating ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onSubmit={handleSubmit}
        >
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}


export default Welcome