import { PageAction } from "@/types";
import EventDetailLayout from "./_overview/EventDetail";

interface EventDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EventDetail({ params, searchParams }: EventDetailPageProps) {
  const { id } = await params;
  const { action } = await searchParams;
  const mode = (typeof action === "string" && Object.values(PageAction).includes(action as PageAction))
    ? action as PageAction
    : PageAction.VIEW;

  return <EventDetailLayout id={id} action={mode} />
}
