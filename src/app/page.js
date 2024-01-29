"use client";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import UserProfile from "@/components/UserProfile";
import { Link } from "@chakra-ui/next-js";
import { Button, ButtonGroup, Container, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <>
      <Container maxW="container.lg">
        <Navbar />
        <Text fontSize="4xl" textAlign="center" my="4">
          Search Users on Github
        </Text>
        <Search
          setUserData={(res) => setUserData(res)}
          setLoading={setLoading}
        />
        {userData && <UserProfile userData={userData} />}
      </Container>
    </>
  );
}
