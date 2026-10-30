
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function SignupForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("দয়া করে সব ঘরগুলো পূরণ করুন।");
      return;
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
      return;
    }

    setIsLoading(true);

    try {
      // ১. ফায়ারবেসে ইউজার তৈরি
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // ২. ইউজারের ডিসপ্লে নেম (Name) সেট করা
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      // ৩. ব্যাকআপ হিসেবে লোকাল স্টোরেজেও রাখতে পারেন
      const userData = { name: name.trim(), email: email.trim() };
      localStorage.setItem("taskflow_current_user", JSON.stringify(userData));

      setSuccess("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errors = {
        "auth/email-already-in-use": "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
        "auth/invalid-email": "সঠিক ইমেইল ঠিকানা দিন।",
        "auth/weak-password": "পাসওয়ার্ডটি দুর্বল, অন্তত ৬ অক্ষরের দিন।",
        "auth/network-request-failed": "ইন্টারনেট সংযোগ পরীক্ষা করুন।",
      };

      setError(
        errors[err.code] || "অ্যাকাউন্ট তৈরি হয়নি। ফায়ারবেস সেটিং চেক করুন।"
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
            Taskflow AI অ্যাকাউন্ট তৈরি করুন
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
              {success && (
                <div className="p-3 text-sm text-emerald-400 bg-emerald-950/50 border border-emerald-800 rounded-lg text-center">
                  {success}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-300">
                  পূর্ণ নাম
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="আপনার নাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  autoComplete="name"
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
                  placeholder="m@example.com"
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
