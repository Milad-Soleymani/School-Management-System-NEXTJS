"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const faLocalization = {
  formFieldError: {
    identifier: {
      invalid_email_address: "ایمیل وارد شده معتبر نیست",
      invalid_username: "نام کاربری معتبر نیست",
      not_found: "این کاربر وجود ندارد",
    },
    password: {
      incorrect_password: "رمز عبور اشتباه است",
      too_short: "رمز عبور خیلی کوتاه است",
    },
  },
  globalError: {
    default: "خطای ناشناخته‌ای رخ داده است، دوباره تلاش کنید.",
  },
};

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-blueSkyLight text-right">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            سامانه مدیریت مدرسه
            <Image src="/logo.png" alt="" width={24} height={24} />
          </h1>
          <h2 className="text-gray-400">وارد حساب کاربری خود شوید</h2>
          <Clerk.GlobalError className="text-sm text-red-400" 
          
          
          />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              نام کاربری
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              رمز عبور
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            ورود
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;