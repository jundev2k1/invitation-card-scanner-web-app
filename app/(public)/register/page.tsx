"use client";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "@/app/components/icons";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RegisterRequest } from "@/services/auth/auth.type";
import { Sex } from "@/types/enum/sex.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "./register.schema";
import { useRegisterPage } from "./useRegisterPage";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema)
  });
  const {
    registerButtonRef,
    showPassword,
    setShowPassword,
    onSubmit,
  } = useRegisterPage({ isSubmitting });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Background decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-48 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
        <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mx-auto w-full max-w-lg border border-slate-700 bg-slate-900/80 backdrop-blur-lg shadow-2xl transition-all hover:shadow-purple-500/20 hover:border-purple-500/40">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-md">
              <span className="text-3xl font-bold tracking-tight">NT</span>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Join us today! Fill in your details to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Username - required */}
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-slate-200">
                      Username <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="user01"
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      autoFocus
                      autoComplete="username"
                      required
                      {...register("username")}
                    />
                  </div>
                  {errors.username && <span className="text-xs text-red-400">{errors.username.message}</span>}
                </div>

                {/* Email - required */}
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user01@example.com"
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      autoComplete="email"
                      required
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="space-y-2 md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-200">
                      Password <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="border-slate-700 bg-slate-950 pr-10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                        autoComplete="new-password"
                        required
                        {...register("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-200 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                  {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
                </div>

                {/* Nickname */}
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-slate-200">
                      Nickname
                    </Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="User 01"
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      autoComplete="name"
                      {...register("nickname")}
                    />
                  </div>
                  {errors.nickname && <span className="text-xs text-red-400">{errors.nickname.message}</span>}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-slate-200">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="0123456789"
                      className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
                      autoComplete="tel"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-xs text-red-400">{errors.phoneNumber.message}</span>}
                </div>

                {/* Sex - Radio Group */}
                <div className="space-y-2 md:col-span-2">
                  <div className="space-y-2">
                    <Label className="text-slate-200">Gender</Label>
                    <RadioGroup
                      className="flex gap-3"
                      defaultValue={Sex.MALE}
                      {...register("sex")}
                    >
                      {Object.entries(Sex).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <RadioGroupItem
                            id={`sex-${value}`}
                            value={value}
                            className="border-slate-600 text-purple-500 focus:ring-purple-500 p-1!"
                          />
                          <Label htmlFor={`sex-${value}`} className="text-slate-200 cursor-pointer">{key}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  {errors.sex && <span className="text-xs text-red-400">{errors.sex.message}</span>}
                </div>

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-slate-200">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Example bio."
                      className="min-h-20 border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all resize-none"
                      maxLength={280}
                      {...register("bio")}
                    />
                  </div>
                  {errors.bio && <span className="text-xs text-red-400">{errors.bio.message}</span>}
                </div>
              </div>

              <Button
                type="submit"
                ref={registerButtonRef}
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/30 transition-all mt-2",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting && <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />}
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-slate-800 pt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Button variant="link" className="ml-1.5 text-purple-400 hover:text-purple-300" asChild>
              <a href="/login">Sign in</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
