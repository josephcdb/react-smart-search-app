import { useState, useTransition } from "react";

export function useSearch(users) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value); // instant UI

    startTransition(() => {
      setQuery(value); // deferred filtering trigger
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    inputValue,
    handleChange,
    filteredUsers,
    isPending
  };
}