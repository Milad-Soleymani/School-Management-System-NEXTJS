"use client";

import { UserButton } from "@clerk/nextjs";

export default function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-9 h-9",
        },
      }}
    />
  );
}