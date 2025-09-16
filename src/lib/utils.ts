import { auth } from "@clerk/nextjs/server";

// تابع async برای گرفتن رول کاربر
export const getUserRole = async () => {
  const { userId,sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role || "";
  return {
    role,
    currentUserId: userId
  }
};
