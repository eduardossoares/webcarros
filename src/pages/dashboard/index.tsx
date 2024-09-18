import { useState, useEffect, useContext } from "react";
import { Container } from "../../components/Container";
import { PainelHeader } from "../../components/PainelHeader";

import { FiTrash2 } from "react-icons/fi";

import { collection, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
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
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-6 mt-4">

                {cars.map(car => (
                    <section className="relative w-72 h-full duration-1000 cursor-pointer rounded bg-white px-1 pt-1
                    border border-pink-700">
                        <img src={car.images[0].url} alt="Carro" className="m-auto h-52 w-full rounded-sm" />
                        <div className="px-2 py-2">
                            <div className="flex justify-between items-center text-pink-700">
                                <div>
                                    <p className="text-md font-medium font-poppins">{car.name}</p>
                                    <span className="text-md font-bold font-poppins">{Number(car.price).toLocaleString("pt-BR", {
                                        style:
                                            "currency", currency: "BRL"
                                    })}
                                    </span>
                                </div>
                                <FiTrash2 color="#be185d
"                                className="text-3xl" onClick={() => handleDeletCar(car.id)} />
                            </div>
                        </div>
                    </section>
                ))}

            </main>
        </Container>
    )
}