'use client';

import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function UpdateQueryParams({param, placeholder}: {param: string, placeholder: string}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const updateQuery = (query: string) => {
        const searchParams = new URLSearchParams(params);
        if (query) {
            searchParams.set(param, query);
        } else {
            searchParams.delete(param);
        }
        void router.replace(`${pathname}?${searchParams.toString()}`);
    }
    return (
        <Input
            className="h-12"
            placeholder={placeholder}
            onChange={(e) => {
                updateQuery(e.target.value);
            }}
            defaultValue={params.get(param)?.toString()}
        />
    )
}