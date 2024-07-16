'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function UpdatePlannedDates({ operation }: { operation: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    /**
     * Adds or removes seven days to a given date (current or passed by param)
     * @param operation add | remove seven days to current date
     * @returns updated date in miliseconds
     */
    const weekOperation = (operation: string) => {
        const dateToBeUpdated = searchParams.get('dateInMilis') === null ? new Date().getTime().toString() : searchParams.get('dateInMilis')!;
        const timeInMilis = operation === 'add' ? parseInt(dateToBeUpdated, 10) + (86400000 * 7) : parseInt(dateToBeUpdated, 10) - (86400000 * 7);
        return new Date(timeInMilis).getTime();
    }

    /**
     * Sets query-params after update
     */
    function setDateInParam(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set('dateInMilis', weekOperation(operation).toString())
        replace(`${pathname}?${params.toString()}`);
    }

    const showOperationIcon = (operation: string) => {
        if (operation === 'add') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            )

        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            )
        }
    }

    return (
        <Button className='p-1' variant="outline" onClick={(e) => { setDateInParam(e) }}>{showOperationIcon(operation)}</Button>
    );
}