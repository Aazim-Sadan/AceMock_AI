import { useAuth, UserButton } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const ProfileContainer = () => {

    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return (
            <div className="flex items-center">
                <Loader className="min-w-6 min-h-6 animate-spin text-emerald-500" />
            </div>
        )
    }

    return (
        <div className="flex items-center gap-6">
            {isSignedIn ? (
                <div className="scale-120">
                    <UserButton afterSignOutUrl="/" />
                </div>
            ) : (
                <Link to={"/signin"}>
                    <Button size={"sm"}>Get Started</Button>
                </Link>
            )}
        </div>
    )
}

export default ProfileContainer