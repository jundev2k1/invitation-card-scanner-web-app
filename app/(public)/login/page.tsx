// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const {
    isLoading,
    loginButtonRef,
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error
  } = useLoginPage();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Background decorative orbs - using standard Tailwind blur + opacity */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-48 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
        <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mx-auto w-full max-w-md border border-slate-700 bg-slate-900/80 backdrop-blur-lg shadow-2xl transition-all hover:shadow-purple-500/20 hover:border-purple-500/40">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-md">
              <span className="text-3xl font-bold tracking-tight">NT</span>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-400">
              Welcome back! Please enter your credentials to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-950/70 px-4 py-3 text-sm text-red-300 border border-red-800/50">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Email or Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="you@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                  autoFocus
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-700 bg-slate-950 pr-10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-200 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="h-auto px-0 text-sm text-purple-400 hover:text-purple-300"
                  >
                    Forgot password?
                  </Button>
                </div>
              </div>
            </div>

            <Button
              ref={loginButtonRef}
              onClick={handleLogin}
              disabled={isLoading}
              className={cn(
                "w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/30 transition-all",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-slate-800 pt-6 text-sm text-slate-400">
            Don't have an account?{" "}
            <Button onClick={() => redirect('/register')} variant="link" className="ml-1.5 text-purple-400 hover:text-purple-300">
              Sign up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
