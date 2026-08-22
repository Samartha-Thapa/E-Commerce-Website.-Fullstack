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
import Link from "next/link"
import { ChangeEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { resetPasswordUser } from "@/lib/api/(auth)/auth"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      password_confirmation: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPwd, setShowPwd] = useState({
      showPassword: false,
      showConfirmPassword: false,
    });
    const email = searchParams.get("email");

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if(formData.password !== formData.password_confirmation) {
          setError("Passwords do not match!");
          return;
        }

        try {

          const payload = {
            ...formData, 
            email: email || ""
          }
          const data = await resetPasswordUser(payload);
          if(!data) {
            setError("Something unexpected error occurred!");
            setLoading(false);
            return;
          }
          router.push('/');
        } catch (err) {
          console.error(err);
          setError('An unexpected Error occurred!');
        } finally {
          setLoading(false);
        }

    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>

        <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>
                    Enter a new Password
                </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">

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
                <Button type="submit" disabled={loading}>{loading ? "Reseting..." : "Reset Password"}</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href='/login' className="text-muted-foreground hover:text-primary underline underline-offset-4">
                Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
