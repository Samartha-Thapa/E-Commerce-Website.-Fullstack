"use client"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { codeVerification } from '@/lib/api/(auth)/auth';

const VerifyForm = () => {
    const [code, setCode] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async () => {
        setLoading(true);
        setError("");

        console.log(email);

        try{
            const data = await codeVerification({email,code});
            // localStorage.setItem('token', data.token);

            if(!data) {
                setError(data.message || "Verification failed");
                setLoading(false);
                return;
            }
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
        catch(err){
            console.error(err);
            setError("Something went wrong. Please try again");
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Verify Your Email
                    </h1>
                    <p className="text-center text-gray-600 mt-2">
                        We sent a code to <span className="font-semibold">{email}</span>
                    </p>

                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            maxLength={6}
                        />
                    </div>

                    {error && (
                        <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
                    )}
                    {message && (
                        <p className="mt-3 text-sm text-green-600 text-center">{message}</p>
                    )}

                    <button
                        onClick={handleVerify}
                        disabled={loading || code.length !== 6}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
        </div>
        </div>
  )
}

export default VerifyForm