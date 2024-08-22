interface BoxProps {
    className?: string;
}

export function Logo({ className }: BoxProps) {
    return (
        <div className={ className }>
            <p className="text-pink-700 font-poppins font-semibold">
                Web
                <span className="text-zinc-600">Carros</span>
            </p>
        </div>
    )
}