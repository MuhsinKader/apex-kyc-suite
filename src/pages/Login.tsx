import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { userCode, password, rememberMe });
    // Navigate to KYC form after login
    navigate("/kyc");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-2xl rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-border/30">
            <h1 className="text-lg font-bold text-white tracking-wide uppercase">
              Bureau Suite Login
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {/* User Code Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex justify-between items-center">
                <span>User Code:</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="pl-10 h-11 bg-background/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter user code"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex justify-between items-center">
                <span>Password:</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-background/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  Remember Me:
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Bureau Login
            </Button>

            {/* Application Version */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Application Version: s1 2.12 (zd1)
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border/40 text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              Copyright © 2025{" "}
              <a
                href="https://bureausuite.co.za"
                className="text-primary hover:text-primary-glow transition-colors font-semibold"
              >
                https://bureausuite.co.za
              </a>
              . All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Tel: 010 590 9505 Address: Bureau place, Turnberry Office Park, 48
              Grosvenor Road, Bryanston, 2021
            </p>
            <a
              href="#"
              className="text-xs text-primary hover:text-primary-glow transition-colors font-semibold inline-block"
            >
              Bureau House Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
