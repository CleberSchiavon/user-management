"use client";
import { useState } from "react";
import Image from "next/image";
import BackgroundImage from "../assets/images/login-background.jpg";
import { Button } from "@/components/Button";
import { LoginCard } from "../components";

export type AuthCardType = "login" | "register";

const Homepage = () => {
  const [authCard, setAuthCard] = useState<AuthCardType>("login");
  return (
    <section className="flex justify-center content-center items-center h-full">
        {authCard === "login" ? <LoginCard setAuthCard={setAuthCard} /> : <div>Oi</div>}
    </section>
  );
};

export default Homepage;
