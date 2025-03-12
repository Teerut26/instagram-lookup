/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import Button from "@/app/_components/Button";
import Render from "@/app/_components/Render"
import { api } from "@/trpc/react";
import { IconArrowLeft, IconCaretLeft, IconDownload } from '@tabler/icons-react';
import { type User } from "types/InstagramResponse.type"
import { saveAs } from 'file-saver';

interface Props {
    user: User
}

export default function RenderWrapper(props: Props) {
    const exportImage = api.export.image.useMutation()

    const onDownloadImage = () => {
        exportImage.mutate({ username: props.user.username }, {
            onSuccess: (data) => {
                saveAs(data, `${props.user.username}.png`);
            },
            onError: (error) => {
                alert(error.message)
            }
        })
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <Button leftIcon={<IconCaretLeft size={24} />}>
                    Back
                </Button>
                <Button onClick={onDownloadImage} loading={exportImage.isPending}>
                    <IconDownload size={24} />
                </Button>
            </div>
            <Render user={props.user} />
        </div>
    )
}