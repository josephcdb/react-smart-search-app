import { useState, useEffect, useMemo, useTransition } from 'react'
import './App.css'

function App() {
  return (
    <>
      <UseStateHook />
      <UseEffectHook />
      <UseMemoHook />
      <UseTransitionHook />
    </>
  )
}

// UseState Hook to store the input
function UseStateHook() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h3>Use State Hook Example</h3>
      <label htmlFor="search-input-1">Enter: </label>
      <input
        id="search-input-1"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
      />
      <p>Searching for: {query}</p>
    </div>
  );
}

// UseEffect Hook to fetch data and filter results
// This works, but it can get slow with big data
function UseEffectHook() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  // Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h3>Use Effect and State Hook to filter the user</h3>
      <label htmlFor="search-input-2">Enter: </label>
      <input htmlFor="search-input-2" onChange={e => setQuery(e.target.value)} />
      <p>{users.length} users loaded</p>
      <p>Searching User for: {query}</p>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// UseMemo Hook to fetch data and filter results
// This will filter only runs when needed
function UseMemoHook() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [users, query]);

  // Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h3>Use Memo Hook to filter the user</h3>
      <label htmlFor="search-input-3">Enter: </label>
      <input htmlFor="search-input-3" onChange={e => setQuery(e.target.value)} />
      <p>{users.length} users loaded</p>
      <p>Searching User for: {query}</p>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Use this hook if the performance is slow e.g. fetch too many data
// If not, then useMemo or useEffect is fine
// UseTransition Hook to type smoothly
// This keeps responsive even with heavy filtering
function UseTransitionHook() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

  const [users, setUsers] = useState([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    const value = e.target.value;

    // urgent update (input stays responsive)
    setInputValue(value);

    // non-urgent update (filter update)
    startTransition(() => {
      setQuery(value);
    });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h3>UseTransition Hook</h3>

      <input onChange={handleChange} value={inputValue} />

      {isPending && <p>Searching...</p>}

      <p>{users.length} users loaded</p>

      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
