import { Container } from "../../components/Container";
import { IoSearchSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import {
    collection, query, addDoc, orderBy, getDocs, QuerySnapshot,
    where, DocumentData
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarsProps {
    uid: string;
    id: string;
    name: string;
    price: string | number;
    images: CarImageProps[];
}

interface CarImageProps {
    name: string;
    uid: string;
    url: string;
}

export function Home() {
    const [cars, setCars] = useState<CarsProps[]>([]);
    const [loadingImages, setLoadingImages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = () => {
        const carsRef = collection(db, "cars");
        const queryRef = query(carsRef, orderBy("created", "desc"));

        getDocs(queryRef)
            .then((snapshot: QuerySnapshot<DocumentData>) => {
                let listCars = [] as CarsProps[];

                snapshot.forEach(doc => {
                    listCars.push({
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        images: doc.data().images,
                        uid: doc.data().uid,
                    })
                })
                setCars(listCars);
            })
            .catch(() => {

            })
    }

    const handleSearchCar = async () => {
        if (input === "") {
            loadCars();
            return;
        }

        setCars([]);
        setLoadingImages([]);

        const q = query(collection(db, "cars"),
            where("name", ">=", input.toUpperCase()),
            where("name", "<=", input.toUpperCase() + "\uf8ff"),
        );

        const querySnapshot = await getDocs(q);

        let listCars = [] as CarsProps[];

        querySnapshot.forEach((doc) => {
            listCars.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                images: doc.data().images,
                uid: doc.data().uid,
            })
        })

        setCars(listCars);


    }

    return (
        <Container>
            <section className="flex items-center bg-white justify-between h-14 sm:h-16 sm:px-4 px-2
            rounded-md gap-x-12 mb-6">
                <div className="flex items-center gap-x-4 w-2 sm:flex-1">
                    <IoSearchSharp size={22} className="text-zinc-300 hidden md:flex" />
                    <input type="text" placeholder="Digite o nome do carro..." value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="placeholder-zinc-300 outline-none flex-1" />
                </div>
                <div className="w-px bg-zinc-200 h-6 hidden md:flex"></div>
                <button className="bg-pink-700 text-white font-semibold w-[4.5rem] sm:w-32 h-10 rounded-md
                hover:bg-pink-800 duration-300" onClick={handleSearchCar}>Buscar</button>
            </section>

            <h1 className="text-center font-poppins
            text-xl text-zinc-600 mb-6">Encontre o seu carro ideal</h1>

            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
                {cars.map(car => (
                    <Link key={car.id} to={`/carro/${car.id}`}>
                        <section className="relative w-full h-full hover:scale-[1.02] duration-1000 cursor-pointer">
                            <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                            </div>
                            <img src={car.images[0].url} alt="Carro" className="rounded-xl m-auto h-full w-full" />
                            <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">{car.name}</p>
                            <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">{Number(car.price).toLocaleString("pt-BR", {
                                style:
                                    "currency", currency: "BRL"
                            })}</span>
                        </section>
                    </Link>
                ))}
            </main>
        </Container>
    )
}