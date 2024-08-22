import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Logo } from "../Logo";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

export function Header() {
    const { signed, loadingAuth } = useContext(AuthContext);

    return (
        <header className="h-16 w-full flex mb-6 items-center 
        bg-white drop-shadow">
            <div className="px-4 flex items-center justify-between w-full max-w-7xl m-auto">
                <Link to={"/"}>
                    <Logo className="text-xl cursor-pointer" />
                </Link>
                <Link to={"/dashboard"}>
                    {!loadingAuth && signed ? (
                        <AiOutlineUser size={32} className="text-zinc-600 hover:text-pink-700
                duration-300 cursor-pointer border border-zinc-500 rounded-full p-1 h-8 w-8
                hover:border-pink-700" />
                    ) : (
                        <Link to={"/login"}
                        className="font-poppins text-zinc-600 hover:text-pink-700 duration-300">
                            Login
                        </Link>
                    )}
                </Link>
            </div>
        </header>
    )
}