import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getDoc, doc, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Swiper, SwiperSlide } from 'swiper/react';

interface CarProps {
    id: string;
    name: string;
    price: string | number;
    km: string | number;
    description: string;
    model: string;
    city: string;
    year: string | number;
    created: string;
    owner: string;
    uid: string;
    phone: string | number | undefined;
    images: CarImagesProps[];
}

interface CarImagesProps {
    uid: string;
    name: string;
    url: string;
}

export function CarDetail() {
    const { id } = useParams();
    const [car, setCar] = useState<CarProps>();
    const [sliderPreview, setSliderPreview] = useState<number>(2);

    const navigate = useNavigate();

    useEffect(() => {
        const loadCar = async () => {
            if (!id) { return };
            const docRef = doc(db, "cars", id);
            getDoc(docRef)
                .then((snapshot: DocumentSnapshot<DocumentData>) => {

                    if (!snapshot.data()) navigate("/");

                    setCar({
                        id: snapshot.id,
                        name: snapshot.data()?.name,
                        year: snapshot.data()?.year,
                        price: snapshot.data()?.price,
                        model: snapshot.data()?.model,
                        phone: snapshot.data()?.phone,
                        owner: snapshot.data()?.owner,
                        city: snapshot.data()?.city,
                        uid: snapshot.data()?.uid,
                        description: snapshot.data()?.description,
                        created: snapshot.data()?.created,
                        km: snapshot.data()?.km,
                        images: snapshot.data()?.images,
                    })
                })
                .catch(() => {

                })
        }
        loadCar();
    }, [id]);

    useEffect(() => {
        const handleResized = () => {
            if (window.innerWidth < 720) {
                setSliderPreview(1);
            } else {
                setSliderPreview(2);
            }
        }

        window.addEventListener("resize", handleResized);

        return () => {
            window.removeEventListener("resize", handleResized);
        }

    }, []);

    return (
        <Container>
            {car && (
                <Swiper
                    slidesPerView={sliderPreview}
                    pagination={{ clickable: true }}
                    navigation={true}
                >
                    {car?.images.map(image => (
                        <SwiperSlide key={image.name}>
                            <img
                                src={image.url}
                                className="w-full h-96 object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {car && (
                <main className="w-full bg-white rounded-lg px-6 py-6 sm:py-6 mt-4 space-y-8">
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-between
                    sm:items-baseline w-full space-y-8 sm:space-y-2">
                        <div className="flex flex-col">
                            <p className="font-bold text-4xl font-poppins
                            text-pink-700">{car?.name.toLocaleUpperCase()}</p>
                            <p className="font-light text-lg font-poppins text-zinc-400">{car?.model}</p>
                        </div>
                        <p className="text-lg sm:text-xl font-light font-poppins text-zinc-400
                        sm:font-base">
                            {car?.price ? Number(car?.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : ""}
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8 font-poppins">
                        <div>
                            <p className="text-zinc-400 font-light">Cidade</p>
                            <p className="font-normal text-zinc-600">{car?.city}</p>
                        </div>

                        <div>
                            <p className="text-zinc-400 font-light">KMs</p>
                            <p className="text-zinc-600">{Number(car?.km).toLocaleString("pt-BR")}</p>
                        </div>

                        <div>
                            <p className="text-zinc-400 font-light">Ano</p>
                            <p className="text-zinc-600">{car?.year}</p>
                        </div>
                    </div>

                    <div className="font-poppins w-full flex flex-col">
                        <p className="text-zinc-400 font-light">Descrição</p>
                        <span className="text-zinc-600 break-words">{car?.description}</span>
                    </div>

                    <div className="font-poppins">
                        <p className="text-zinc-400 font-light">Telefone/Whatsapp</p>
                        <span className="text-zinc-600">{car?.phone}</span>
                    </div>

                    <a className="flex items-center gap-x-2 bg-green-400 px-4 py-2 w-full justify-center
                    rounded-md hover:bg-green-500 duration-500" href={`https://api.whatsapp.com/send?phone=${car?.phone}&text=
                    Olá, estou aqui pelo ${car?.name} que você anunciou no https://webcarros.com.br.`}
                        target="_blank">
                        <FaWhatsapp color="white" size={26} />
                        <p className="text-white font-medium font-poppins text-base sm:text-lg">
                            Conversar com o Vendedor
                        </p>
                    </a>
                </main>
            )}
        </Container>
    )
}