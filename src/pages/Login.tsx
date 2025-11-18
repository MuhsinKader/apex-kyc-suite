import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User as UserIcon, Shield, CheckCircle2, Zap, Database } from "lucide-react";
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
    navigate("/kyc");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-glow/10 rounded-full blur-3xl" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Hero Section */}
          <div className="space-y-8 animate-fade-in">
            {/* Logo/Brand */}
            <div className="flex items-center gap-4">
              <div className="relative p-4 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-2xl shadow-[0_8px_32px_rgba(33,96,253,0.4)]">
                <Shield className="h-12 w-12 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-transparent to-white/10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Consumer Profile Bureau</h1>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">KYC Portal</p>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Secure Identity
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Verification Portal
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Access comprehensive KYC verification services with industry-leading security and real-time processing capabilities.
              </p>

              {/* Feature highlights */}
              <div className="grid gap-4 pt-4">
                {[
                  { icon: CheckCircle2, text: "Bank-Grade Security" },
                  { icon: Zap, text: "Instant Verification" },
                  { icon: Database, text: "Comprehensive Data Access" }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/60 backdrop-blur-xl rounded-xl border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(33,96,253,0.15)] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</div>
              </div>
              <div className="h-12 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Support</div>
              </div>
              <div className="h-12 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">ISO</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Certified</div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="relative w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary-glow/30 to-accent/30 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-border/50 overflow-hidden hover:shadow-[0_32px_96px_rgba(33,96,253,0.2)] transition-all duration-500">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary via-primary-glow to-accent px-8 py-6 border-b border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative space-y-1">
                  <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h2>
                  <p className="text-white/80 text-sm">Sign in to access your dashboard</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="p-8 space-y-6">
                {/* User Code Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">
                    User Code
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 blur transition-opacity duration-300" />
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10 transition-transform group-focus-within:scale-110" />
                    <Input
                      type="text"
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="relative pl-11 h-12 bg-background/60 backdrop-blur-sm border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-sm hover:shadow-md"
                      placeholder="Enter your user code"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 blur transition-opacity duration-300" />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10 transition-transform group-focus-within:scale-110" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="relative pl-11 pr-11 h-12 bg-background/60 backdrop-blur-sm border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-sm hover:shadow-md"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                      className="border-border/60"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary via-primary-glow to-accent text-white font-bold text-base shadow-[0_8px_24px_rgba(33,96,253,0.3)] hover:shadow-[0_12px_32px_rgba(33,96,253,0.5)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">Sign In</span>
                </Button>

                {/* Additional options */}
                <div className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need assistance?{" "}
                    <button type="button" className="font-semibold text-primary hover:text-primary-glow transition-colors">
                      Contact Support
                    </button>
                  </p>
                </div>
              </form>

              {/* Footer */}
              <div className="px-8 py-5 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border-t border-border/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Version 2.4.1</span>
                  <span>© 2025 Consumer Profile Bureau</span>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Privacy Policy
                  </button>
                  <span className="text-border">•</span>
                  <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Terms of Service
                  </button>
                  <span className="text-border">•</span>
                  <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
