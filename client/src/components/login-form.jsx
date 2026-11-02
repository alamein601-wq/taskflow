
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

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password
      });

      const { token, user } = response.data.data || {};

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("Login failed:", err.response?.status);

      setError(
        err.response?.data?.message ||
        "লগইন করা যায়নি। ইমেইল, পাসওয়ার্ড ও সার্ভার পরীক্ষা করুন।"
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
            লগইন করুন
          </CardTitle>
          <CardDescription className="text-slate-400">
            ইমেইল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">

              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-800 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">
                  ইমেইল ঠিকানা
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
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
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-slate-400">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                to="/signup"
                className="text-blue-400 underline underline-offset-4"
              >
                সাইন আপ করুন
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
