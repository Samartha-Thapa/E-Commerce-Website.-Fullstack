"use client"
import { cn } from "@/lib/utils"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { codeVerification } from '@/lib/api/(auth)/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";

const VerifyForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
    const [code, setCode] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);

        console.log(email);

        try{
            const data = await codeVerification({email,code});

            if(!data || data.success === false) {
                toast.add({
                    title: "Verify Failed",
                    description: data?.message || "An unexpected error occurred",
                })
                setLoading(false);
                return;
            }
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
        catch(err: any){
            const errorMessage = err.response?.data?.message || "An unexpected error occurred"
            toast.add({
                title: "Verify Failed",
                description: errorMessage
            })
            console.error(err);
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className={cn("flex justify-center items-center min-h-screen", className)}>
            <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                        Verify Your Email
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600 mt-2">
                        We sent a code to <span className="font-semibold">{email}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup className="space-y-4">

                    <Field className="mt-6">
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            maxLength={6}
                            />
                    </Field>

                    <Field>
                        <Button
                            onClick={handleVerify}
                            disabled={loading || code.length !== 6}
                            className="mt-6 w-full py-2 rounded-lg font-semibold transition disabled:opacity-60"
                            >
                            {loading ? "Verifying..." : "Verify"}
                        </Button>
                    </Field>
                    </FieldGroup>
                </CardContent>
        </Card>
        </div>
  )
}

export default VerifyForm