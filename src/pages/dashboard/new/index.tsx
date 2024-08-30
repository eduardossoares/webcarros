import { ChangeEvent, useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { Container } from "../../../components/Container";
import { PainelHeader } from "../../../components/PainelHeader";
import { Input } from "../../../components/Input";
import { AuthContext } from "../../../contexts/AuthContext";

import { storage, db } from "../../../services/firebaseConnection";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

import { FiUpload, FiTrash } from "react-icons/fi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { v4 as uuidV4 } from "uuid";

import { addDoc, collection } from "firebase/firestore";


const schema = z.object({
    name: z.string().nonempty("O campo 'Nome' é obrigatório."),
    model: z.string().nonempty("O campo 'Modelo' é obrigatório."),
    year: z.string().nonempty("O campo 'Ano do Carro' é obrigatório."),
    km: z.string().nonempty("O campo 'KMs Rodados' é obrigatório."),
    price: z.string().nonempty("O campo 'Preço' é obrigatório."),
    city: z.string().nonempty("O campo 'Cidade' é obrigatório."),
    phone: z.string().min(1, "O campo 'Telefone/Whatsapp' é obrigatório.").refine((value) =>
        /^(\d{10,11})$/.test(value), {
        message: "Número de Telefone Inválido."
    }),
    description: z.string().nonempty("O campo 'Descrição' é obrigatório.")
})

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

export function NewCar() {
    const { user } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

    const onSubmit = (data: FormData) => {
        if(carImages.length === 0) {
            alert("Envie alguma imagem deste carro!");
            return;
        }

        const cartListImages = carImages.map( car => {
            return {
                uid: car.uid,
                name: car.name,
                url: car.url
            }
        })

        addDoc(collection(db, "cars"), {
            name: data.name,
            model: data.model,
            price: data.price,
            phone: data.phone,
            km: data.km,
            city: data.city,
            year: data.year,
            description: data.description,
            created: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: cartListImages,
        })
        .then(() => {
            reset();
            setCarImages([]);
            console.log("Cadastrado com Sucesso!")
        })
        .catch((error) => {
            console.log(`Erro Ao Cadastrar: ${error}`);
        })
    }

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];

            if (img.type === 'image/jpeg' || img.type === 'image/png') {
                await handleUpload(img);
            } else {
                alert("Tipo de arquivo inválido. Tente uma imagem em JPEG ou PNG.");
                return;
            }
        }
    }

    const handleUpload = async (img: File) => {
        if (!user?.uid) {
            return
        }

        const currentUid = user?.uid;
        const uidImage = uuidV4();

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

        uploadBytes(uploadRef, img)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    const imageItem = {
                        name: uidImage,
                        uid: currentUid,
                        previewUrl: URL.createObjectURL(img),
                        url: downloadUrl,
                    }

                    setCarImages((images) => [...images, imageItem])
                })
            })
            .catch((error) => {
                console.log(`Erro: ${error}`);
            })
    }

    const handleDelet = async (item: ImageItemProps) => {
        const imagePath = `images/${item.uid}/${item.name}`;
        const imageRef = ref(storage, imagePath);
        try {
            await deleteObject(imageRef);
            setCarImages(carImages.filter((car) => car.url !== item.url))
        } catch(error) {
            console.log(`Erro: ${error}`)
        }
    }

    return (
        <Container>
            <PainelHeader />
            <div className="bg-white mt-4 rounded-sm h-24 sm:h-48 flex items-center
            px-8 gap-x-2">
                <button className="border-2 text-zinc-300 hover:text-pink-700 duration-700
                hover:border-pink-700 durat w-24 h-16 sm:w-48 sm:h-32 rounded-lg flex items-center justify-center">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={32} />
                    </div>
                    <div className="cursor-pointer">
                        <input className="cursor-pointer sm:h-32 sm:w-48
                        w-24 h-16 opacity-0" type="file" accept="image/*"
                            onChange={handleFile} />
                    </div>
                </button>
                {carImages.map(item => (
                    <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                        <FiTrash size={32} className="absolute text-white cursor-pointer" onClick={() => handleDelet(item)} />
                        <img src={item.previewUrl} alt="Foto do Carro" className="
                        rounded-md w-full h-16 sm:h-32 object-cover" />
                    </div>
                ))}
            </div>

            <div className="bg-white mt-4 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-sm flex flex-col gap-y-4">
                    <div>
                        <label className="text-zinc-400 font-poppins">Nome do Carro:</label>
                        <Input
                            type="text"
                            register={register}
                            name="name"
                            error={errors.name?.message}
                            placeholder="Ex: Onix 1.0..."
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 font-poppins">Modelo do Carro:</label>
                        <Input
                            type="text"
                            register={register}
                            name="model"
                            error={errors.model?.message}
                            placeholder="Ex: 1.0 Flex Plus LT Manual..."
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 font-poppins">Ano do Carro:</label>
                        <Input
                            type="text"
                            register={register}
                            name="year"
                            error={errors.year?.message}
                            placeholder="Ex: 2016..."
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 font-poppins">Preço do Carro:</label>
                        <Input
                            type="text"
                            register={register}
                            name="price"
                            error={errors.price?.message}
                            placeholder="Ex: 43900..."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:gap-x-6 gap-y-4 md:gap-y-0">
                        <div className="flex-1">
                            <label className="text-zinc-400 font-poppins">Telefone/Whatsapp para Contato:</label>
                            <Input
                                type="text"
                                register={register}
                                name="phone"
                                error={errors.phone?.message}
                                placeholder="Ex: 21 999191923..."
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:gap-x-6 gap-y-4 md:gap-y-0">
                        <div className="flex-1">
                            <label className="text-zinc-400 font-poppins">Cidade:</label>
                            <Input
                                type="text"
                                register={register}
                                name="city"
                                error={errors.city?.message}
                                placeholder="Ex: Porto Alegre, RS..."
                            />
                        </div>

                        <div className="flex-1">
                            <label className="text-zinc-400 font-poppins">KMs Rodados:</label>
                            <Input
                                type="text"
                                register={register}
                                name="km"
                                error={errors.km?.message}
                                placeholder="Ex: 23.900..."
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-zinc-400 font-poppins">Descrição Completa:</label>
                        <textarea className="h-24 border rounded-md outline-none p-4
                        placeholder-zinc-300 placeholder:font-thin resize-none text-zinc-400"
                            {...register("description")}
                            name="description"
                            id="description"
                            placeholder="Digite a descrição completa sobre o carro..."

                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description?.message}</p>}
                    </div>

                    <button className="w-full bg-zinc-500 hover:bg-zinc-700
                    duration-300 text-white h-14 rounded-sm text-lg font-semibold">
                        Cadastrar Carro
                    </button>
                </form>
            </div>
        </Container>
    )
}