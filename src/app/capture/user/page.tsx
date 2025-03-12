import Render from "@/app/_components/Render";
import { api } from "@/trpc/server";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const username = (await searchParams).username
    if (!username) {
        return (
            <div>Username not found</div>
        )
    }
    const { data: { user } } = await api.instagram.getProfile({ username: username.toString() });

    return (
        <div className="min-w-fit">
            <Render user={user} />
        </div>
    )
}