"use client";

import { useEffect, useState } from "react";
import { IDecodedToken } from "./teacher.types";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import TeacherDashboard from "@/components/dashboard/teacher-dashboard";

function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      try {
        const decoded: IDecodedToken = jwtDecode(token);

        if (decoded.role !== "teacher") {
          redirect("/auth/login");
        }
      } catch (error) {
        console.log(error);
        redirect("/auth/login");
      }
    } else {
      redirect("/auth/login");
    }
  }, []);
  if (!token) return <p>Loading...</p>;
  return <TeacherDashboard>{children}</TeacherDashboard>
}

export default TeacherLayout;
