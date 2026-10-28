import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("দয়া করে ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    setIsLoading(true);

    // সার্ভারের ঝামেলা ছাড়াই লোকাল স্টোরেজ দিয়ে ইনস্ট্যান্ট লগইন চেক
    setTimeout(() => {
      const savedUser = localStorage.getItem('taskflow_current_user');

      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.email === email) {
          setSuccess("লগইন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...");
          setIsLoading(false);
          setTimeout(() => {
            navigate('/dashboard'); // ড্যাশবোর্ডে রিডাইরেক্ট
          }, 1000);
          return;
        }
      }

      // যদি ইউজার আগে রেজিস্টার করা না থাকে, তবুও যেন আটকে না যায় (ডামি লগইন পারমিশন)
      const dummyUser = { email, password };
      localStorage.setItem('taskflow_current_user', JSON.stringify(dummyUser));
      setSuccess("লগইন সফল হয়েছে!");
      setIsLoading(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    }, 500);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-500">Taskflow AI এ লগইন করুন</CardTitle>
          <CardDescription className="text-slate-400">
            আপনার একাউন্ট তথ্য দিয়ে প্রবেশ করুন
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
              {success && (
                <div className="p-3 text-sm text-emerald-400 bg-emerald-950/50 border border-emerald-800 rounded-lg text-center">
                  {success}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">ইমেইল ঠিকানা</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  {/* এখানে আগে ছোট হাতের classname ছিলো, যা ঠিক করে className করা হয়েছে */}
                  <Label htmlFor="password" className="text-slate-300">পাসওয়ার্ড</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white"
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white" disabled={isLoading}>
                {isLoading ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-slate-400">
              একাউন্ট নেই?{" "}
              <Link to="/signup" className="text-blue-400 underline underline-offset-4">
                সাইন আপ করুন
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
