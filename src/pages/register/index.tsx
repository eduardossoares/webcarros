import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/wallpaper-login.svg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { Input } from "../../components/Input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";

const schema = z.object({
    name: z.string().nonempty("O campo 'nome' é obrigatório."),
    email: z.string().email("Insira um email válido."),
    password: z.string().min(6, "A senha deve contar no mínimo 6 caracteres.").nonempty("O campo 'senha é obrigatório.'")
})

type FormData = z.infer<typeof schema>;


export function Register() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [type, setType] = useState("password");
    const { handleInfoUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    })

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

    const onSubmit = async (data: FormData) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
            displayName: data.name,
        })

        handleInfoUser({
            name: data.name,
            email: data.email,
            uid: user.user.uid,
        })
        navigate("/dashboard", { replace: true })
      })
      .catch((error) => {
        console.log(`Erro: ${error}`);
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
                    <span className="font-poppins text-white">Registre sua conta</span>
                </div>

                <form action="" className="flex flex-col gap-y-2"
                onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        placeholder="Digite seu nome completo..."
                        name="name"
                        error={errors.name?.message}
                        register={register}
                    />
                    <Input
                        type="email"
                        placeholder="Digite seu email..."
                        name="email"
                        error={errors.email?.message}
                        register={register} />
                    <div className="rounded-md flex justify-between">
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
                    <button className="h-8 w-full bg-pink-700 rounded-md font-semibold text-white
                    hover:bg-pink-800 duration-300">
                        Cadastrar
                    </button>
                </form>
                <p className="text-center text-zinc-300">
                    Já possui uma conta? <Link to={"/login"} className="font-bold text-zinc-200
                    hover:text-white underline">
                        Faça seu login!
                    </Link>
                </p>
            </section>
        </div>
    )
}