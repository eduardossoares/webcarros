import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

export function PainelHeader() {
    
    const handleLogout = async () => {
      await signOut(auth);
    }

    return (
        <nav className="bg-pink-700 h-8 sm:h-10 rounded-md text-white flex items-center
        justify-between flex-row px-4 text-sm sm:text-base font-semibold">
            <div className="flex gap-x-4">
                <Link className="hover:scale-[1.03] duration-300" to={"/dashboard"}>Meus Anúncios</Link>
                <Link className="hover:scale-[1.03] duration-300" to={"/dashboard/novo-carro"}>Criar Anúncio</Link>
            </div>
            <span className="hover:scale-[1.03] duration-300 cursor-pointer" onClick={ handleLogout }>
                Sair
            </span>
        </nav>
    )
}