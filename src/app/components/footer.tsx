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
                        icon={<HomeIcon fill={`${path === '/' ? '#60a5fa' : 'white' }`} />}
                    />
                    <NavElement
                        href="/weekly-planner"
                        icon={<CalendarIcon fill={`${path === '/weekly-planner' ? '#60a5fa' : 'white' }`} />}
                    />
                    <NavElement
                        href="/dish-designer"
                        icon={<PlusIcon fill={`${path === '/dish-designer' ? '#60a5fa' : 'white' }`} />}
                    />
                    <NavElement
                        href="/inventory"
                        icon={<MenuIcon fill={`${path === '/inventory' ? '#60a5fa' : 'white' }`} />}
                    />
                    <NavElement
                        href="/shopping-day"
                        icon={<ShoppingCartIcon fill={`${path === '/shopping-day' ? '#60a5fa' : 'white' }`} />}
                    />
                </div>
            </div>
        </footer>
    )
}