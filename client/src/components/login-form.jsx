
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      const errors = {
        "auth/invalid-credential": "ইমেইল অথবা পাসওয়ার্ড ভুল।",
        "auth/user-not-found": "এই ইমেইলে অ্যাকাউন্ট নেই।",
        "auth/wrong-password": "পাসওয়ার্ড ভুল।",
        "auth/invalid-email": "সঠিক ইমেইল দিন।",
        "auth/too-many-requests": "পরে আবার চেষ্টা করুন।",
        "auth/network-request-failed": "ইন্টারনেট সংযোগ পরীক্ষা করুন।",
        "auth/operation-not-allowed": "Firebase Email/Password চালু করুন।",
      };

      setError(errors[err.code] || "লগইন হয়নি। Firebase সেটিংস পরীক্ষা করুন।");
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
