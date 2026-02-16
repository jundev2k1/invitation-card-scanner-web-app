"use client";

import { PageAction } from "@/types";
import UserDetailLayout from "./_overview/userDetail";

interface UserDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function UserDetailPage({ params, searchParams }: UserDetailPageProps) {
  const { id } = await params;
  const { action } = await searchParams;
  const mode = (typeof action === "string" && Object.values(PageAction).includes(action as PageAction))
    ? action as PageAction
    : PageAction.VIEW;

  return <UserDetailLayout id={id} action={mode} />
}
