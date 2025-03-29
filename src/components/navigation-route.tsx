import { MainRoutes } from "@/lib/helper"
import { cn } from "@/lib/utils"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

interface NavigationRoutesProps {
    isMobile?: boolean
}

const NavigationRoutes = ({ isMobile = false }: NavigationRoutesProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (href: string) => {
        if (href.startsWith("#")) {
            const sectionId = href.substring(1);
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            } else if (location.pathname !== "/") {
                // If user is on another page, navigate to home and scroll after load
                navigate("/");
                setTimeout(() => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }, 300); // Delay to ensure page loads
            }
        } else {
            navigate(href);
        }
    };

    return <ul className={cn("flex items-center gap-6", isMobile && "items-start flex-col gap-8")}>
        {MainRoutes.map(route => (
            <li key={route.href}>
                <button
                    onClick={() => handleNavigation(route.href)}
                    className="text-base text-neutral-600 hover:text-neutral-900 font-medium"
                >
                    {route.label}
                </button>
            </li>
        ))}
    </ul>
}

export default NavigationRoutes