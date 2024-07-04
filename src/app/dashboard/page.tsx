"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FarmerDashboard from "./farmer";
import ExpertDashboard from "./expert";

function Page() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState(0);

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
      if (JSON.parse(user).role === "expert") {
        setExp(JSON.parse(user).exp);
      }
    }
  }, []);

  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/";
  };

  if (role === "farmer")
    return (
      <FarmerDashboard
        name={name}
        email={email}
        role={role}
        signOut={signOut}
      />
    );
  else if (role === "expert")
    return (
      <ExpertDashboard
        name={name}
        email={email}
        role={role}
        exp={exp}
        signOut={signOut}
      />
    );
}

export default Page;
