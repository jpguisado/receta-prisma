export const RadioButton = ({
    name,
    value,
    children,
}: {
    name: string,
    value: Date,
    children: React.ReactNode;
}) => {

    return (
        <div className="text-md flex flex-col justify-center items-center relative">
            <input name={name} className="appearance-none checked:bg-slate-500 flex border active:bg-slate-600 hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center" type="radio" id={name} value={value} />
            <label className="absolute pointer-events-none font-bold z-99" htmlFor="huey">{children}</label>
        </div>
    )
}