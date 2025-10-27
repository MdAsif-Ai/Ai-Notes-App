/**
 * Authentication Modal Component
 * Handles login and registration with smooth transitions
 */
import { useState } from "react";
import { useAuth } from "./FirebaseAuth";
import { auth } from "../firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: UserData) => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedDate: string;
}

export default function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("analyst");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use Firebase email sign-in
    signInWithEmail(loginEmail, loginPassword)
      .then(() => {
        const fu = auth.currentUser;
        if (fu) {
          const mapped: UserData = {
            id: fu.uid,
            name: fu.displayName || fu.email?.split("@")[0] || "User",
            email: fu.email || loginEmail,
            role: "analyst",
            avatar: fu.photoURL || undefined,
            joinedDate: fu.metadata?.creationTime || new Date().toISOString(),
          };

          // Ensure user stored in localStorage for app features
          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const existing = users.find(
            (u: UserData) => u.email === mapped.email
          );
          if (!existing) {
            users.push(mapped);
            localStorage.setItem("users", JSON.stringify(users));
          }

          onLogin(mapped);
          toast.success(`Welcome back, ${mapped.name}! 🎉`);
          onClose();
        }
      })
      .catch((err) => {
        console.warn(
          "Firebase email sign-in failed, falling back to local demo:",
          err?.message || err
        );
        // Fallback: demo/localStorage login (keeps previous behaviour)
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: UserData) => u.email === loginEmail);
        if (user) {
          onLogin(user);
          toast.success(`Welcome back, ${user.name}! 🎉 (demo)`);
          onClose();
        } else {
          toast.error(err?.message || "Invalid credentials.");
        }
      });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Use Firebase create user (email/password)
    signUpWithEmail(registerEmail, registerPassword)
      .then(() => {
        const fu = auth.currentUser;
        if (fu) {
          // Update displayName if missing
          if (!fu.displayName && registerName) {
            fu.updateProfile?.({ displayName: registerName });
          }

          const mapped: UserData = {
            id: fu.uid,
            name:
              registerName ||
              fu.displayName ||
              fu.email?.split("@")[0] ||
              "User",
            email: fu.email || registerEmail,
            role: registerRole,
            avatar: fu.photoURL || undefined,
            joinedDate: fu.metadata?.creationTime || new Date().toISOString(),
          };

          const users = JSON.parse(localStorage.getItem("users") || "[]");
          users.push(mapped);
          localStorage.setItem("users", JSON.stringify(users));

          onLogin(mapped);
          toast.success(
            `Account created successfully! Welcome, ${mapped.name}! 🎉`
          );
          onClose();
        }
      })
      .catch((err) => {
        console.warn(
          "Firebase register failed, falling back to local demo:",
          err?.message || err
        );
        // Fallback: local demo registration
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some((u: UserData) => u.email === registerEmail)) {
          toast.error("Email already registered. Please login instead.");
          return;
        }
        const newUser: UserData = {
          id: `user-${Date.now()}`,
          name: registerName,
          email: registerEmail,
          role: registerRole,
          joinedDate: new Date().toISOString(),
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        onLogin(newUser);
        toast.success(
          `Account created successfully! Welcome, ${registerName}! 🎉 (demo)`
        );
        onClose();
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        const fu = auth.currentUser;
        if (fu) {
          const mapped: UserData = {
            id: fu.uid,
            name: fu.displayName || fu.email?.split("@")[0] || "Google User",
            email: fu.email || "unknown",
            role: "analyst",
            avatar: fu.photoURL || undefined,
            joinedDate: fu.metadata?.creationTime || new Date().toISOString(),
          };

          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const existing = users.find(
            (u: UserData) => u.email === mapped.email
          );
          if (!existing) {
            users.push(mapped);
            localStorage.setItem("users", JSON.stringify(users));
          }

          onLogin(mapped);
          toast.success(`Signed in as ${mapped.name}`);
          onClose();
        }
      })
      .catch((err) => {
        console.warn(
          "Firebase Google sign-in failed, falling back to local demo:",
          err?.message || err
        );
        // Fallback: simulate Google Sign-In locally
        const googleUser: UserData = {
          id: `google-${Date.now()}`,
          name: "Google User",
          email: "user@gmail.com",
          role: "analyst",
          joinedDate: new Date().toISOString(),
          avatar: "https://lh3.googleusercontent.com/a/default-user",
        };
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const existingUser = users.find(
          (u: UserData) => u.email === googleUser.email
        );
        if (existingUser) {
          onLogin(existingUser);
          toast.success(`Welcome back, ${existingUser.name}! 🎉 (demo)`);
        } else {
          users.push(googleUser);
          localStorage.setItem("users", JSON.stringify(users));
          onLogin(googleUser);
          toast.success(
            `Account created with Google! Welcome, ${googleUser.name}! 🎉 (demo)`
          );
        }
        onClose();
      });
  };

  // Hooked Firebase auth helpers
  const {
    signInWithEmail: signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
  } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Welcome to AI Knowledge Hub
          </DialogTitle>
          <DialogDescription className="text-center">
            Login or create an account to access your knowledge base
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 animate-slide-up">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full hover:scale-[1.02] transition-transform"
              >
                Sign In
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                  OR
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full hover:scale-[1.02] transition-transform border-2"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Demo: Use any registered email or create a new account
              </p>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-4 animate-slide-up">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-role">Role</Label>
                <select
                  id="register-role"
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg bg-white"
                >
                  <option value="executive">Executive</option>
                  <option value="analyst">Analyst</option>
                  <option value="developer">Developer</option>
                  <option value="researcher">Researcher</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full hover:scale-[1.02] transition-transform"
              >
                Create Account
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                  OR
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full hover:scale-[1.02] transition-transform border-2"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
