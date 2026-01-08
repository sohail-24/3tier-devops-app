import React, { useState } from "react";

function App() {
  // ===============================
  // STATE
  // ===============================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const [backendStatus, setBackendStatus] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  // ===============================
  // SIGNUP
  // ===============================
  const signup = async () => {
    setMessage("Creating account...");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🟢 Signup successful. Please login.");
        setIsSignup(false);
      } else {
        setMessage(`🔴 ${data.message}`);
      }
    } catch {
      setMessage("🔴 Backend not reachable");
    }
  };

  // ===============================
  // LOGIN
  // ===============================
  const login = async () => {
    setMessage("Checking credentials...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setMessage("🟢 Login successful");
      } else {
        setMessage(`🔴 ${data.message}`);
      }
    } catch {
      setMessage("🔴 Backend not reachable");
    }
  };

  // ===============================
  // BACKEND HEALTH
  // ===============================
  const checkBackend = async () => {
    try {
      const res = await fetch("/api/health", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setBackendStatus("🟢 OK");
        setBackendMessage(data.message);
      } else {
        setBackendStatus("🔴 DOWN");
        setBackendMessage(data.message);
      }
    } catch {
      setBackendStatus("🔴 DOWN");
      setBackendMessage("Backend not reachable");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <h1>🚀 8-Tier React Application</h1>
        <p>Frontend • Backend • Database</p>
      </header>

      {!token ? (
        <section style={styles.card}>
          <h2>{isSignup ? "📝 Signup" : "🔐 Login"}</h2>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={isSignup ? signup : login}
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          <p style={{ marginTop: "10px" }}>{message}</p>

          <p style={styles.link} onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already have an account? Login"
              : "New user? Signup"}
          </p>
        </section>
      ) : (
        <section style={styles.dashboard}>
          <h2>📊 Dashboard</h2>

          <button style={styles.button} onClick={checkBackend}>
            Check Backend Health
          </button>

          {backendStatus && (
            <div style={{ marginTop: "20px" }}>
              <p><strong>Status:</strong> {backendStatus}</p>
              <p><strong>Message:</strong> {backendMessage}</p>
            </div>
          )}
        </section>
      )}

      <footer style={styles.footer}>
        <p>© 2026 • Sohail DevOps 3-Tier Project</p>
      </footer>
    </div>
  );
}

// ===============================
// STYLES (FIXES WHITE SCREEN ISSUE)
// ===============================
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #020617, #020617)",
    color: "#e5e7eb",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hero: {
    padding: "40px 20px",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#020617",
    padding: "30px",
    borderRadius: "14px",
    textAlign: "center",
    border: "1px solid #1e293b",
  },
  dashboard: {
    width: "100%",
    maxWidth: "600px",
    background: "#020617",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    border: "1px solid #1e293b",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#e5e7eb",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },
  link: {
    marginTop: "15px",
    color: "#60a5fa",
    cursor: "pointer",
  },
  footer: {
    marginTop: "auto",
    padding: "20px",
    fontSize: "14px",
    color: "#94a3b8",
  },
};

export default App;

