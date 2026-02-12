"use client";

import UserDetailView from "./overview/userDetail";

interface UserDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function UserDetailPage({ params, searchParams }: UserDetailPageProps) {
  const { id } = await params;
  const { action } = await searchParams;
  const mode = action === "edit" ? "edit" : "view";

  return <UserDetailView id={id} action={mode} />
}