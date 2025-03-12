import { api } from "@/trpc/server";
import Render from "../_components/Render";
import RenderWrapper from "./_components/RenderWrapper";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const username = (await searchParams).username
    if (!username) {
        return (
            <div>Username not found</div>
        )
    }
    const { data: { user } } = await api.instagram.getProfile({ username: username.toString() });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-10 pb-5 px-2">
            <RenderWrapper user={user} />
        </div>
    )
}