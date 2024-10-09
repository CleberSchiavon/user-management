"use client";
import { useState } from "react";
import { LoginCard, RegisterCard } from "../components";

export type AuthCardType = "login" | "register";

const Homepage = () => {
  const [authCard, setAuthCard] = useState<AuthCardType>("login");
  return (
    <section className="flex justify-center content-center items-center h-full">
      {authCard === "login" ? (
        <LoginCard setAuthCard={setAuthCard} />
      ) : (
        <RegisterCard setAuthCard={setAuthCard} />
      )}
    </section>
  );
};

export default Homepage;
