"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define what a User looks like
interface User {
  name: string;
  email: string;
  role: "candidate" | "recruiter";
}

// Define what the Context provides
interface AuthContextType {
  user: User | null;
  login: (role: "candidate" | "recruiter") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 1. Check LocalStorage when the app loads (so you stay logged in on refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Login Function
  const login = (role: "candidate" | "recruiter") => {
    const mockUser = {
      name: role === "recruiter" ? "John Recruiter" : "Jane Candidate",
      email: "test@example.com",
      role: role,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Redirect based on role
    if (role === "recruiter") {
      router.push("/recruiter");
    } else {
      router.push("/jobs");
    }
  };

  // 3. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to use the Context easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}