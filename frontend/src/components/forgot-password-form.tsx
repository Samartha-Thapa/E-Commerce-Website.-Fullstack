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
import { useState } from "react"
import { useRouter } from "next/navigation"
import { forgotPasswordUser } from "@/lib/api/(auth)/auth"
import { toast } from "./ui/toast"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{
          const data = await forgotPasswordUser(email);
          
          if(!data || data.success === false) {
            toast.add({
              title: "Failed to send password link",
              description: data?.message || "An unexpected error occurred!"
            })
            setLoading(false);
            return;
          }
        } catch(err: any) {
          const errorMessage = err.response?.data?.message || "An unexpected error occurred"
          console.error(err);
          toast.add({
            title: "Verify Failed",
            description: errorMessage
          })
        } finally{
          setLoading(false);
        }

    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>

        <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>
                    Enter your email to receive a password reset link
                </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</Button>
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
