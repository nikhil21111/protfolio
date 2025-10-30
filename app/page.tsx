"use client";

import { useState, useEffect } from "react";
import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [userName, setUserName] = useState("User");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Try to get user name from localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    // Boot sequence takes 4 seconds
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  if (isBooting) {
    return <BootScreen userName={userName} />;
  }

  return <Desktop userName={userName} />;
}
