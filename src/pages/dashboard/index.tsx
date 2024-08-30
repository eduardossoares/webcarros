import { useState, useEffect, useContext } from "react";
import { Container } from "../../components/Container";
import { PainelHeader } from "../../components/PainelHeader";

import { FiTrash2 } from "react-icons/fi";

import { collection, getDocs, where, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
    uid: string;
    id: string;
    name: string;
    price: string;
    images: ImageCarProps[];
}

interface ImageCarProps {
    name: string;
    uid: string;
    url: string;
}

export function Dashboard() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const loadCars = () => {
            if (!user) return;

            const carsRef = collection(db, "cars");
            const queryRef = query(carsRef, where("uid", "==", user.uid));

            getDocs(queryRef)
                .then((snapshot) => {
                    let listCars = [] as CarProps[];

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
                .catch((error) => {
                    console.log(error);
                })
        }
        loadCars();
    }, [user]);

    const handleDeletCar = async (id: string) => {
        const docRef = doc(db, "cars", id);
        await deleteDoc(docRef);
        setCars(cars.filter(car => car.id !== (id)));
    }

    return (
        <Container>
            <PainelHeader />
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6 mt-4">

                {cars.map(car => (
                    <section className="relative w-full h-full duration-1000 cursor-pointer">
                        <button className="absolute text-4xl top-2 right-2 bg-white h-12 w-12 flex items-center
                        justify-center rounded-full text-red-600 z-50 hover:scale-110 duration-500 hover:drop-shadow-md
                        lg:h-10 lg:w-10 lg:text-2xl" onClick={() => handleDeletCar(car.id)}>
                            <FiTrash2 />
                        </button>
                        <img src={car.images[0].url} alt="Carro" className="rounded-xl m-auto h-full" />
                        <div className="h-8 absolute bg-zinc-300 w-full bottom-0 flex items-center
                         justify-between px-4 rounded-b-xl text-zinc-700">
                            <p className="left-4 bottom-2 text-base font-semibold font-poppins">{car.name}</p>
                            <span className="right-4 bottom-2 text-base font-semibold font-poppins">{Number(car.price).toLocaleString("pt-BR", {
                                style:
                                    "currency", currency: "BRL"
                            })}</span>
                        </div>
                    </section>
                ))}

            </main>
        </Container>
    )
}