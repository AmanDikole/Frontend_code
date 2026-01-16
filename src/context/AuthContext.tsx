"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. Define the User to match the JAVA BACKEND response exactly
interface User {
  id: string;
  fullName: string; // Changed from 'name' to match Java
  email: string;
  role: string;     // Java sends a string (candidate/recruiter)
}

// 2. Update the Context functions
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void; // Now accepts the real user object
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load from LocalStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 3. Real Login Function
  // We don't fetch here; we just save the data passed from the Login Page
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Optional: Redirect based on role if not handled in the page
    if (userData.role === "recruiter") {
      router.push("/post-job");
    } else {
      router.push("/profile");
    }
  };

  // 4. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh(); // Forces the Navbar to update immediately
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}