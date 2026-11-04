import React, { useState } from "react";
import { SignupForm } from "@/components/signup-form"; // আপনার সঠিক পাথ অনুযায়ী

export function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-black">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}

export default SignupPage; // <--- এই ডিফল্ট এক্সপোর্টটি থাকা বাধ্যতামূলক
