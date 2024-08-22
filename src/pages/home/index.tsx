import { Container } from "../../components/Container";
import { IoSearchSharp } from "react-icons/io5";


export function Home() {
    return (
        <Container>
            <section className="flex items-center bg-white justify-between h-14 sm:h-16 sm:px-4 px-2
            rounded-md gap-x-12 mb-6">
                <div className="flex items-center gap-x-4 w-2 sm:flex-1">
                    <IoSearchSharp size={22} className="text-zinc-300 hidden md:flex" />
                    <input type="text" placeholder="Digite o nome do carro..."
                        className="placeholder-zinc-300 outline-none flex-1" />
                </div>
                <div className="w-px bg-zinc-200 h-6 hidden md:flex"></div>
                <button className="bg-pink-700 text-white font-semibold w-[4.5rem] sm:w-32 h-10 rounded-md
                hover:bg-pink-800 duration-300">Buscar</button>
            </section>

            <h1 className="text-center font-poppins
            text-xl text-zinc-600 mb-6">Encontre o seu carro ideal</h1>

            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>

                <section className="relative hover:scale-[1.02] duration-1000 cursor-pointer">
                    <div className="w-full h-full absolute bg-transparent hover:bg-zinc-800 opacity-30 duration-1000 rounded-xl">
                    </div>
                    <img src="https://www.webmotors.com.br/wp-content/uploads/2024/08/19174622/toyota-corolla-1.8-vvti-hybrid-flex-altis-premium-cvt-wmimagem16440392740.webp
                    " alt="Carro" className="rounded-xl" />
                    <p className="absolute left-4 bottom-2 text-white text-base font-semibold font-poppins">BMW 320i</p>
                    <span className="absolute right-4 bottom-2 text-white text-base font-semibold font-poppins">R$ 399,990</span>
                </section>
            </main>
        </Container>
    )
}