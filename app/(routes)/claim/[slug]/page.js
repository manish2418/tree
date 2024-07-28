"use client"

import ClaimDetails from "@/app/components/ClaimDetails";
import { getClaimById } from "@/app/lib/fetch/claims";
import { Skeleton, message } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page({ params: { slug: claimId } }) {
    const { status, data } = useSession();

    const router = useRouter()

    if (status === "unauthenticated") {
        router.replace("/login")
    }

    const [isClaimDataLoading, setIsClaimDataLoading] = useState(true)
    const [claim, setClaim] = useState(null)

    useEffect(() => {
        getClaimById({ claimId }).then(res => {
            setIsClaimDataLoading(false)
            if (res.result) {
                setClaim(res.result)
            } else if (res.error) {
                message.error(res.error?.message || "Something went wrong")
            }
        })
    }, [])

    if (isClaimDataLoading || status === "loading") {
        return <Skeleton />
    } else {
        // Show claim details
        // based on the user role and assigned status, show the
        return <ClaimDetails claimInfo={claim} loggedInUserMailAndId={data?.user} />
    }
}
