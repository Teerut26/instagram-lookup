import getImageProxy from "@/utils/getImageProxy"
import clsx from "clsx"
import numeral from "numeral"
import { type User } from "types/InstagramResponse.type"

interface Props {
    user: User
}

export default function Render(props: Props) {
    const { user } = props
    return (
        <div className="border rounded-3xl px-5 py-5 w-fit bg-white" id="capture">
            <div className="flex flex-col max-w-[25rem] w-full gap-2">
                <div className="flex gap-3">
                    <img  src={getImageProxy(user.profile_pic_url_hd)} alt="" className="h-[5rem] w-[5rem] rounded-full" />
                    <div className="flex flex-col gap-1 justify-center -translate-y-2">
                        <div>{user.username}</div>
                        <div className="flex justify-between gap-8">
                            <div className="flex flex-col leading-[1.2rem]">
                                <div className="font-bold">{user.edge_owner_to_timeline_media.count}</div>
                                <div className="text-sm">posts</div>
                            </div>
                            <div className="flex flex-col leading-[1.2rem]">
                                <div className="font-bold">{numeral(user.edge_followed_by.count ?? 0).format('0a')}</div>
                                <div className="text-sm">followers</div>
                            </div>
                            <div className="flex flex-col leading-[1.2rem]">
                                <div className="font-bold">{user.edge_follow.count}</div>
                                <div className="text-sm">following</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="leading-[1.2rem] text-sm">
                    {String(user.biography).split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
                    {user.edge_owner_to_timeline_media.edges.slice(0, 9).map(({ node }, index) => (
                        <div key={index} className="flex justify-center">
                            <img className={clsx("h-[10.5rem] w-[130px] object-cover object-center",
                                 user.edge_owner_to_timeline_media.edges.length === 1 ? "rounded-2xl" : user.edge_owner_to_timeline_media.edges.length === 2 ? "rounded-2xl" : "")} src={getImageProxy(node.display_url)} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}