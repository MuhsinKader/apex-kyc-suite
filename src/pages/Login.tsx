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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-glow/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-card/40 backdrop-blur-2xl rounded-3xl shadow-[0_32px_96px_rgba(33,96,253,0.25),0_16px_48px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden hover:shadow-[0_40px_120px_rgba(33,96,253,0.35),0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500">
          {/* Enhanced Header with gradient */}
          <div className="relative bg-gradient-to-r from-primary via-primary-glow to-accent px-8 py-5 border-b border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
            <h1 className="relative text-xl font-bold text-white tracking-wide uppercase drop-shadow-lg">
              Bureau Suite Login
            </h1>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>

          {/* Form with enhanced styling */}
          <form onSubmit={handleLogin} className="p-8 space-y-6 bg-card/30 backdrop-blur-xl">
            {/* User Code Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex justify-between items-center">
                <span>User Code:</span>
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary z-10" />
                <Input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="relative pl-10 h-12 bg-card/50 backdrop-blur-sm border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-sm hover:shadow-md"
                  placeholder="Enter user code"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex justify-between items-center">
                <span>Password:</span>
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary z-10" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative pl-10 pr-10 h-12 bg-card/50 backdrop-blur-sm border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-sm hover:shadow-md"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
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
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-primary/50 data-[state=checked]:bg-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-foreground cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-bold text-primary hover:text-primary-glow transition-colors relative group"
              >
                <span className="relative">
                  Forgot Password?
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-glow transition-all group-hover:w-full" />
                </span>
              </a>
            </div>

            {/* Enhanced Login Button */}
            <Button
              type="submit"
              className="relative w-full h-12 bg-gradient-to-r from-primary via-primary-glow to-accent hover:from-primary-glow hover:via-accent hover:to-primary text-white font-bold shadow-[0_8px_24px_rgba(33,96,253,0.4)] hover:shadow-[0_12px_32px_rgba(33,96,253,0.6)] transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Bureau Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>

            {/* Application Version */}
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground font-semibold">
                Application Version: s1 2.12 (zd1)
              </p>
            </div>
          </form>

          {/* Enhanced Footer */}
          <div className="px-6 py-5 bg-card/20 backdrop-blur-sm border-t border-white/10 text-center space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Copyright © 2025{" "}
              <a
                href="https://bureausuite.co.za"
                className="text-primary hover:text-primary-glow transition-colors font-bold"
              >
                https://bureausuite.co.za
              </a>
              . All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tel: 010 590 9505 Address: Bureau place, Turnberry Office Park, 48
              Grosvenor Road, Bryanston, 2021
            </p>
            <a
              href="#"
              className="text-xs text-primary hover:text-primary-glow transition-colors font-bold inline-block relative group"
            >
              <span className="relative">
                Bureau House Privacy Policy
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-glow transition-all group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
