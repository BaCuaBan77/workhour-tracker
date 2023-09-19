"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Home = () => {
  const { push } = useRouter();
  const { user } = useAuth();
  React.useEffect(() => {
    if (!user) {
      push("/login");
    }
  }, [user, push]);
  return <></>;
};

export default Home;
