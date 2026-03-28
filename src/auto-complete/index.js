import React, { useState, useEffect } from "react";
import "./styles.css";

const AutocompleteSearch = () => {
  const [query, setQuery] = useState(""); //input value
  const [allUsers, setAllUsers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users once
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Debounced filtering
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        const filtered = allUsers.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(filtered);
      } else {
        setFilteredResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query, allUsers]);

  return (
    <div className="search-container" style={{ width: "300px", margin: "50px auto" }}>
      <label htmlFor="search" className="search-label">Search Users</label>

      <input
        id="search"
        type="text"
        value={query}
        placeholder="Type a name..."
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          border: "1px solid #ccc",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "5px",
          border: "1px solid #ccc",
          maxHeight: "200px",
          overflowY: "auto",
        }}
        className="search-list"
      >
        {loading && <li style={{ padding: "10px" }}>Loading...</li>}

        {!loading && query && filteredResults.length === 0 && (
          <li style={{ padding: "10px" }}>No results found</li>
        )}

        {filteredResults.map((user) => (
          <li
            key={user.id}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
            className="list-item"
            onClick={() => setQuery(user.name)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteSearch;