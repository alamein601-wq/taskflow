
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/lib/api";

export function SignupForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("নাম অন্তত ২ অক্ষরের হতে হবে।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });

      const { token, user } = response.data.data || {};

      if (!token || !user) {
        throw new Error("Invalid registration response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("Signup failed:", err.response?.status);

      setError(
        err.response?.data?.message ||
        "অ্যাকাউন্ট তৈরি হয়নি। আবার চেষ্টা করুন।"
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-500">
            TaskFlow AI অ্যাকাউন্ট তৈরি করুন
          </CardTitle>
          <CardDescription className="text-slate-400">
            টাস্ক অর্গানাইজ করা শুরু করতে আপনার তথ্য দিন
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandle}>
            <div className="flex flex-col gap-6">

              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-800 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-300">
                  পূর্ণ নাম
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  autoComplete="name"
                  maxLength={80}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">
                  ইমেইল ঠিকানা
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-300">
                  পাসওয়ার্ড
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-slate-400">
              ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
              <Link
                to="/login"
                className="text-blue-400 underline underline-offset-4"
              >
                লগইন করুন
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
