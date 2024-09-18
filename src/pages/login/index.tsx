import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/wallpaper-login.svg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

const schema = z.object({
    email: z.string().email("Insira um email válido."),
    password: z.string().nonempty("O campo 'senha' é obrigatório."),
})

type FormData = z.infer<typeof schema>;


export function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [type, setType] = useState("password");
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    useEffect(() => {
        const handleLogout = async () => {
            await signOut(auth);
        }
        handleLogout();
    }, []);

    const handleToggle = () => {
        if (type === "password") {
            setType("text");
            setIsPasswordVisible(true)
        } else {
            setType("password")
            setIsPasswordVisible(false);
        }
    }

    const onSubmit = (data: FormData) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate("/dashboard", { replace: true });
            })
            .catch((error) => {
                setWarning(true);
                console.log(`Erro: ${error}`)
            })
    }

    return (
        <div className="px-4 h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgImg})` }}>
            <section className="space-y-3 w-full sm:w-[32rem]">
                <div className="flex flex-col items-center -space-y-1">
                    <p className="text-pink-700 font-poppins font-semibold text-3xl">
                        Web
                        <span className="text-white">Carros</span>
                    </p>
                    <span className="font-poppins text-white">Faça seu Login</span>
                </div>

                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                    <Input
                        type="email"
                        placeholder="Digite seu email..."
                        name="email"
                        error={errors.email?.message}
                        register={register} />

                    <div
                        className="rounded-md flex justify-between">
                        <Input
                            type={type}
                            placeholder="Digite sua senha..."
                            name="password"
                            error={errors.password?.message}
                            register={register} />
                        <div className="px-4 mt-2.5">
                            {!isPasswordVisible ? (
                                <FaRegEyeSlash size={22} color="white" className="cursor-pointer"
                                    onClick={handleToggle} />
                            ) : (
                                <FaRegEye size={22} color="white" className="cursor-pointer"
                                    onClick={handleToggle} />
                            )}
                        </div>
                    </div>
                    <button className="h-10 w-full bg-pink-700 rounded-md font-semibold text-white
                    hover:bg-pink-800 duration-300">
                        Entrar
                    </button>
                </form>
                {warning && (
                    <p className="text-red-900
                    text-center">Credenciais incorretas, verifique-as e tente novamente.</p>
                )}
                <p className="text-center text-zinc-300">
                    Ainda não possui uma conta? <Link to={"/cadastro"} className="font-bold text-zinc-200
                    hover:text-white underline">
                        Cadastre-se!
                    </Link>
                </p>
            </section>
        </div>
    )
}