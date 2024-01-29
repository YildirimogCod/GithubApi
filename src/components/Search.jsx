"use client";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Search = ({ setUserData, setLoading }) => {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setUserData(null);
    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      const data = await res.json();
      if (data.message) {
        return toast({
          title: "Error",
          description:
            data.message === "Not Found" ? "User Not Found" : data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setUserData(data);
      addUserToLocalStorage(data, query);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const addUserToLocalStorage = (data, username) => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    const userExists = users.find((user) => user.id === username);

    if (userExists) {
      users.splice(users.indexOf(userExists), 1);
    }
    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url,
    });

    localStorage.setItem("github-users", JSON.stringify(users));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        mt={4}
        variant="outline"
        placeholder="Type a username 
      (i.e yildirimogCod)"
        focusBorderColor="green.500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        size="md"
        colorScheme="whatsapp"
        mt={2}
        disabled={!query}
        opacity={!query ? 0.5 : 1}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
