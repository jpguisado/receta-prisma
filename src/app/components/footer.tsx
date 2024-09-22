'use client';

import { HomeIcon, PlusIcon, MenuIcon, ShoppingCartIcon, CalendarIcon } from "lucide-react";;
import NavElement from "./nav-element";
import { usePathname } from "next/navigation";

export default function Footer() {
    const path = usePathname();
    return (
        <footer className='h-[10%] flex items-center text-center bg-slate-50'>
            <div className='w-full'>
                <div className='justify-center flex'>
                    <NavElement
                        href="/"
                        icon={<HomeIcon stroke={`${path === '/' ? '#60a5fa' : 'black' }`} />}
                    />
                    <NavElement
                        href="/weekly-planner"
                        icon={<CalendarIcon stroke={`${path === '/weekly-planner' ? '#60a5fa' : 'black' }`} />}
                    />
                    <NavElement
                        href="/dish-designer"
                        icon={<PlusIcon stroke={`${path === '/dish-designer' ? '#60a5fa' : 'black' }`} />}
                    />
                    <NavElement
                        href="/inventory"
                        icon={<MenuIcon stroke={`${path === '/inventory' ? '#60a5fa' : 'black' }`} />}
                    />
                    <NavElement
                        href="/shopping-day"
                        icon={<ShoppingCartIcon stroke={`${path === '/shopping-day' ? '#60a5fa' : 'black' }`} />}
                    />
                </div>
            </div>
        </footer>
    )
}