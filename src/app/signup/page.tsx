"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signup } from "../utils/signup";

export default function Login() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSame, setPasswordSame] = useState("");
  const [experience, setExperience] = useState("0");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [loadState, setLoadState] = useState("hidden");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoadState("");
    if (password != passwordSame) {
      setError("Password is not same");
    } else {
      const result = await signup(
        name,
        email,
        password,
        role,
        experience,
        hourlyRate
      );

      if (result.status !== "success") {
        setError(result.message || "Wrong email or password");
      } else {
        setError("");
      }
    }
    setLoadState("hidden");
  };

  return (
    <>
      <div
        className={
          loadState +
          " flex items-center justify-center text-center h-full w-full z-999 fixed top-0 left-0 bg-black bg-opacity-75 text-white"
        }
      >
        <ClipLoader color="#00eaff" loading speedMultiplier={1} />
      </div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Image */}
        <div className="hidden bg-muted lg:block">
          <Image
            src="/signup_farmer.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* Sign up */}
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your details below to sign up
              </p>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Baburao Mahale"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="baburaomahale@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repassword">Re-Enter Password</Label>
                </div>
                <Input
                  id="repassword"
                  type="password"
                  required
                  value={passwordSame}
                  onChange={(e) => setPasswordSame(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(e) => setRole(e)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmer">Farmer</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role === "Expert" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="Enter your experience"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hourlyRate">Hourly Rate</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="Enter your experience"
                      required
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>
                </>
              )}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
