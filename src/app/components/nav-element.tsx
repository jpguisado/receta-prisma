import Link from "next/link";

const NavElement = ({ href, icon }: { href: string, icon: React.ReactNode }) => {
    return (
        <div className={`justify-center flex w-full`}>
            <Link href={href}>
                {icon}
            </Link>
        </div>
    )
}

export default NavElement;