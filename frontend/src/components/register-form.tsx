"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { ChangeEvent, useState } from "react"
import { registerUser } from "@/lib/api/(auth)/auth"
import { toast } from "./ui/toast"
import { useRouter } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));

  }

  const togglePassword = () => {
    setShowPwd((prev) => ({...prev, showPassword: !prev.showPassword}))
  }

  const toggleConfirmPassword = () => {
    setShowPwd((prev) => ({...prev, showConfirmPassword: !prev.showConfirmPassword}))
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_URL}/auth/google`
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if(formData.password !== formData.password_confirmation) {
      toast.add({
        title: "Passwords Mismatch!",
        description: "The passwords don not match!"
      })
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(formData);
      if(!data || data.success === false) {
        toast.add({
          title: "Registration Failed",
          description: data?.message || "An unexpected error occurred",
        })
        setLoading(false);
        return;
      }
      toast.add({
        title: "Registration Successful",
        description: "Please check your email to verify your account",
      })
      router.push(`/verify-form?email=${encodeURIComponent(formData.email)}`);
    } catch(err: any) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred"
      toast.add({
        title: "Registration Failed",
        description: errorMessage
      })
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Register with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Register with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="name">UserName</FieldLabel>
                </div>
                <Input
                  id="name" 
                  name="name"
                  type="text"
                  value={formData.name} 
                  onChange={handleChange}
                  disabled={loading}
                  required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <div className="relative w-full">
                  <Input id="passowrd" name="password" type={showPwd.showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} disabled={loading} required />
                  <button
                    type="button"
                    onClick={togglePassword}                      
                    className='absolute right-3 top-2 text-purple-300 hover:text-purple-100 transition-colors'
                    aria-label={showPwd.showPassword ? "Hide Password" : "Show Password"}
                    >
                    {showPwd.showPassword ? <FiEyeOff  className='h-4 w-4' /> : <FiEye className='h-4 w-4' />}
                  </button>
                  </div>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                </div>
                <div className="relative w-full">
                  <Input id="password_confirmation" name="password_confirmation" type={showPwd.showConfirmPassword ? 'text' : 'password'} value={formData.password_confirmation} onChange={handleChange} disabled={loading} required />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}                      
                    className='absolute right-3 top-2 text-purple-300 hover:text-purple-100 transition-colors'
                    aria-label={showPwd.showConfirmPassword ? "Hide Password" : "Show Password"}
                    >
                    {showPwd.showConfirmPassword ? <FiEyeOff className='h-4 w-4' /> : <FiEye className='h-4 w-4' />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Log In</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
