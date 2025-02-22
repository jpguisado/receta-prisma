'use client'; 

import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { Button } from "../ui/button";
import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getWeekStartDate } from "~/lib/utils";

export default function ActiveControls({ isPending, mode }: { isPending: boolean, mode: string }) {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const checkActiveDate = () => {
        // If there are any params in URLSearchParams
        if (params.has('d') && params.has('m') && params.has('y')) {
            const d = parseInt(params.get('d')!);
            const m = parseInt(params.get('m')!);
            const y = parseInt(params.get('y')!);
            const currentDateInParams = new Date(y, m, d);
            if (mode === 'week') {
                const firstDayFromParams = getWeekStartDate(currentDateInParams);
                return firstDayFromParams;
            } else {
                return currentDateInParams;
            }
        } else {
            const currentDate = new Date();
            const firstDayOnServer = getWeekStartDate(currentDate);
            return firstDayOnServer;
        }
    }
    function updateSearchParams(newDate: Date) {
        const params = new URLSearchParams();
        params.set('d', newDate.getDate().toString());
        params.set('m', newDate.getMonth().toString());
        params.set('y', newDate.getFullYear().toString());
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }
    function adjustCurrentWeek(direction: string) {
        const currentDate = checkActiveDate();
        if (direction === 'next') {
            if (mode === 'week') {
                const oneWeekMoreInMilis = currentDate.getTime() + (86400000 * 7);
                const oneWeekMoreDate = new Date(oneWeekMoreInMilis);
                updateSearchParams(new Date(oneWeekMoreDate));
            } else {
                const oneMoreDayInMilis = currentDate.getTime() + 86400000;
                const oneDayMoreDate = new Date(oneMoreDayInMilis);
                updateSearchParams(new Date(oneDayMoreDate));
            }
        } else if (direction === 'previous') {
            if(mode === 'week') {
                const oneWeekLessInMilis = currentDate.getTime() - (86400000 * 7);
                const oneWeekLessDate = new Date(oneWeekLessInMilis);
                updateSearchParams(new Date(oneWeekLessDate));
            } else {
                const oneLessDayInMilis = currentDate.getTime() - 86400000;
                const oneDayLessDate = new Date(oneLessDayInMilis);
                updateSearchParams(new Date(oneDayLessDate));
            }
        } else {
            updateSearchParams(new Date());
        }
    }

    return (
        <div className="flex justify-between items-center gap-1 h-12">
            <Button
                variant={"outline"}
                disabled={isPending}
                onClick={(() => adjustCurrentWeek('previous'))}
            >
                <ChevronLeftCircle />
            </Button>
            <Button
                variant={"outline"}
                disabled={isPending}
                onClick={(() => adjustCurrentWeek(''))}
            >
                Hoy
            </Button>
            <Button
                variant={"outline"}
                disabled={isPending}
                onClick={(() => adjustCurrentWeek('next'))}
            >
                <ChevronRightCircle />
            </Button>
        </div>
    )
}