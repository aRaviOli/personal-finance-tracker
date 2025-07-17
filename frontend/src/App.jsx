import './App.css'
import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("finance_user");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (username) => setUser(username);
  const handleLogout = () => {
    localStorage.removeItem("finance_user");
    setUser(null);
  };

  return (
    <Layout showHeader={!!user} onTitleClick={() => setUser(user)}>
      {!user ? (
        <Welcome onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </Layout>
  );
}

export default App
