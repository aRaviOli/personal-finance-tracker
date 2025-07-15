import './App.css'
import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("finance_user");
    if (saved) setUser(saved);
  }, []);

  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <Welcome onLogin={(name) => setUser(name)} />
  );
}

export default App
