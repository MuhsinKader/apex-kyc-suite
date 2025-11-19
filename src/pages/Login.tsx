import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User as UserIcon, Shield, CheckCircle2, Zap, Database, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ userCode?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { userCode?: string; password?: string } = {};
    
    if (!userCode.trim()) {
      newErrors.userCode = "User code is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log("Login attempt:", { userCode, password, rememberMe });
    navigate("/kyc");
  };

  return (
    <div className="kyc-page min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-glow/10 rounded-full blur-3xl" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>

      {/* CRITICAL: Max-width container (1440px) to prevent stretching on large monitors */}
      <div className="kyc-layout mx-auto max-w-[1440px] relative z-10 px-4 md:px-8 py-4 md:py-6 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
          
          {/* LEFT COLUMN - Hero Section - Shows on desktop (md+ which is 768px+) */}
          <div className="hidden md:flex flex-col gap-[clamp(12px,2vh,20px)] animate-fade-in">
            
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="relative p-3 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-xl shadow-[0_8px_32px_rgba(33,96,253,0.4)]">
                <Shield className="h-9 w-9 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tl from-transparent to-white/10" />
              </div>
              <div>
                <h1 className="text-[clamp(1.4rem,2vw,1.75rem)] font-bold text-foreground tracking-tight leading-tight">Consumer Profile Bureau</h1>
                <p className="text-[clamp(0.65rem,0.8vw,0.75rem)] text-muted-foreground font-bold uppercase tracking-wider">KYC Portal</p>
              </div>
            </div>

            {/* Hero Heading & Description */}
            <div className="flex flex-col gap-[clamp(8px,1.5vh,16px)] max-w-[540px]">
              <h2 className="text-[clamp(2.2rem,3vw,3.2rem)] font-bold text-foreground leading-[1.15]">
                Secure Identity
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Verification Portal
                </span>
              </h2>
              <p className="text-[clamp(0.9rem,1.1vw,1rem)] text-muted-foreground leading-relaxed">
                Access comprehensive KYC verification services with industry-leading security and real-time processing capabilities.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-col gap-[clamp(10px,1.5vh,14px)] max-w-[540px]">
              {/* Card 1: Bank-Grade Security */}
              <div className="group flex items-center gap-4 px-5 py-[clamp(12px,1.8vh,16px)] bg-card/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(33,96,253,0.12)] hover:border-primary/40 transition-all duration-300">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/10 group-hover:from-primary/30 group-hover:to-primary-glow/20 transition-all duration-300">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-bold text-foreground">Bank-Grade Security</h3>
                  <p className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-muted-foreground">Enterprise-level encryption and compliance</p>
                </div>
              </div>

              {/* Card 2: Instant Verification */}
              <div className="group flex items-center gap-4 px-5 py-[clamp(12px,1.8vh,16px)] bg-card/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(33,96,253,0.12)] hover:border-primary/40 transition-all duration-300">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                  <Zap className="h-5 w-5 text-accent" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-bold text-foreground">Instant Verification</h3>
                  <p className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-muted-foreground">Real-time processing and validation</p>
                </div>
              </div>

              {/* Card 3: Comprehensive Data */}
              <div className="group flex items-center gap-4 px-5 py-[clamp(12px,1.8vh,16px)] bg-card/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(33,96,253,0.12)] hover:border-primary/40 transition-all duration-300">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                  <Database className="h-5 w-5 text-primary" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[clamp(0.95rem,1.1vw,1.05rem)] font-bold text-foreground">Comprehensive Data Access</h3>
                  <p className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-muted-foreground">Complete profile verification suite</p>
                </div>
              </div>
            </div>

            {/* Metrics Row - Hidden on very short screens to prevent scrolling */}
            <div className="hidden lg:flex xl:flex items-center gap-6 pt-2 metrics-row">
              <div>
                <div className="text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold text-foreground">99.9%</div>
                <div className="text-[clamp(0.75rem,0.9vw,0.8rem)] text-muted-foreground">Uptime</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold text-foreground">24/7</div>
                <div className="text-[clamp(0.75rem,0.9vw,0.8rem)] text-muted-foreground">Support</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold text-foreground">ISO</div>
                <div className="text-[clamp(0.75rem,0.9vw,0.8rem)] text-muted-foreground">Certified</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - Login Card (CRITICAL: max-width 420px to prevent stretching) */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[420px] login-card">
              <div className="relative bg-card rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.15)] overflow-hidden backdrop-blur-xl border border-border/60 animate-scale-in">
                
                {/* Gradient Header */}
                <div className="relative px-6 py-[clamp(16px,2.5vh,24px)] bg-gradient-to-r from-primary via-primary-glow to-accent overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                  
                  <div className="relative z-10">
                    <h2 className="text-[clamp(1.4rem,1.8vw,1.6rem)] font-bold text-white mb-1">Welcome Back</h2>
                    <p className="text-[clamp(0.85rem,1vw,0.9rem)] text-white/80">Sign in to start or continue KYC checks</p>
                  </div>
                </div>

                {/* Form Body */}
                <div className="px-6 py-[clamp(20px,3vh,32px)]">
                  <form onSubmit={handleLogin} className="space-y-[clamp(16px,2.5vh,20px)]">
                    
                    {/* User Code Field */}
                    <div className="space-y-2">
                      <label className="text-[clamp(0.85rem,1vw,0.9rem)] font-bold text-foreground">CPB User Code</label>
                      <p className="text-[clamp(0.75rem,0.9vw,0.8rem)] text-muted-foreground mb-2">Provided by your organisation admin</p>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Enter your user code"
                          value={userCode}
                          onChange={(e) => setUserCode(e.target.value)}
                          className={`pl-10 pr-10 h-[clamp(42px,6vh,48px)] text-[clamp(0.85rem,1vw,0.9rem)] ${errors.userCode ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                        >
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                      {errors.userCode && (
                        <p className="text-xs text-destructive">{errors.userCode}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-[clamp(0.85rem,1vw,0.9rem)] font-bold text-foreground">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`pl-10 pr-20 h-[clamp(42px,6vh,48px)] text-[clamp(0.85rem,1vw,0.9rem)] ${errors.password ? 'border-destructive' : ''}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button
                            type="button"
                            className="p-1 hover:bg-muted rounded"
                          >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-destructive">{errors.password}</p>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <label
                          htmlFor="remember"
                          className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-muted-foreground cursor-pointer"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-primary hover:underline font-medium"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    {/* Sign In Button */}
                    <Button
                      type="submit"
                      className="w-full h-[clamp(44px,6vh,50px)] text-[clamp(0.9rem,1.1vw,1rem)] font-semibold bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-[0_8px_24px_rgba(33,96,253,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Sign In
                    </Button>

                    {/* MFA Info */}
                    <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                      <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-[clamp(0.75rem,0.9vw,0.8rem)] text-muted-foreground leading-relaxed">
                        Your account is protected with multi-factor authentication
                      </p>
                    </div>

                    {/* Support Footer */}
                    <div className="pt-2 text-center space-y-1">
                      <p className="text-[clamp(0.8rem,0.95vw,0.85rem)] text-muted-foreground">
                        Need assistance?{" "}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Contact Support
                        </a>
                      </p>
                      <p className="text-[clamp(0.7rem,0.85vw,0.75rem)] text-muted-foreground/70">
                        Email: support@cpb.com • Phone: 24/7 • Chat: Available now
                      </p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Hero Section (shown below form on mobile) */}
      <div className="lg:hidden px-4 pb-8 space-y-6 relative z-10">
        <div className="flex items-center gap-3 justify-center">
          <div className="relative p-3 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-xl shadow-[0_8px_32px_rgba(33,96,253,0.4)]">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">Consumer Profile Bureau</h1>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">KYC Portal</p>
          </div>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-card/60 backdrop-blur-xl rounded-xl border border-border/60">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Bank-Grade Security</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-card/60 backdrop-blur-xl rounded-xl border border-border/60">
            <Zap className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-foreground">Instant Verification</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-card/60 backdrop-blur-xl rounded-xl border border-border/60">
            <Database className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Comprehensive Data</span>
          </div>
        </div>
      </div>

      {/* Height-based styles for compact layouts on short screens */}
      <style>{`
        /* Ensure two-column layout shows on medium+ screens */
        @media (min-width: 768px) {
          .kyc-page {
            overflow-y: hidden;
          }
        }

        /* Short desktop heights (700-800px, e.g. 1366×768) */
        @media (min-width: 768px) and (max-height: 800px) {
          .kyc-layout {
            padding-top: 16px;
            padding-bottom: 16px;
          }
          .metrics-row {
            display: none !important;
          }
        }

        /* Very short desktop heights (< 720px) */
        @media (min-width: 768px) and (max-height: 720px) {
          .kyc-layout {
            padding-top: 12px;
            padding-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}
