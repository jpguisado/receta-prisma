'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getWeekNumber } from '~/lib/utils';

export default function UpdatePlannedDates({ operation }: { operation: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function alterPlannedDates() {
        const params = new URLSearchParams(searchParams);
        const parsedParam = parseInt(searchParams.get('query') ?? getWeekNumber(new Date()).toString());
        const newWeek = operation === 'crecer' ? 7 + parsedParam : parsedParam - 7 ;
        params.set('query', newWeek.toString())
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <button onClick={() => { alterPlannedDates() }}>{operation}</button>
        </div>
    );
}

/**
 * 356 días
 * 52 semanas
 * nº semana = nº día del año / 7 >  
 * 
 */