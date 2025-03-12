import { IconLoader2 } from "@tabler/icons-react"
import clsx from "clsx"

interface Props {
    children?: React.ReactNode
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    loading?: boolean
    onClick?: () => void
    disabled?: boolean
}

export default function Button(props: Props) {
    return (
        <button disabled={props.disabled} className={clsx("flex border rounded-3xl px-3 py-2 gap-1 cursor-pointer text-zinc-500 hover:bg-zinc-100 hover:translate-y-[0.8px] transition-all items-center disabled:bg-zinc-200", !props.children && "pr-5")} onClick={props.onClick}>
            {props.loading ? <IconLoader2 className="animate-spin" size={24} /> : <>
                {props.leftIcon}
                {props.children}
                {props.rightIcon}
            </>}
        </button>
    )
}