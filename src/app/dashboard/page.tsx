"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Dashboard from "./home";
// import Component from "./home2";

function Page() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    if (!token || !user) {
      window.location.href = "/";
    } else {
      setToken(token);
      setName(JSON.parse(user).name);
      setEmail(JSON.parse(user).email);
      setRole(JSON.parse(user).role);
    }
  }, []);

  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/";
  };

  // return (
  //   <>
  //     <div>Dashboard</div>
  //     <h3>{name}</h3>
  //     <h3>{email}</h3>
  //     <h3>{role}</h3>
  //     <Button onClick={signOut}>Sign Out</Button>
  //   </>
  // );
  return <Dashboard name={name} email={email} role={role} signOut={signOut} />;
  // return <Component />;
}

export default Page;
