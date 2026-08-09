export default function StatCard({
    title,
    value,
    percentage,
    icon }
) {

    return (
        <div className=" bg-slate-900  border border-slate-800  rounded-2xl  p-6  shadow-lg hover:border-slate-700 transition">

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>
                    <h2 className="text-4xl font-bold mt-2">
                        {value}
                    </h2>
                </div>
                <div className="  w-12 h-12 rounded-xl bg-slate-800 flex  items-center justify-center text-xl ">
                    {icon}
                </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
                <div className=" h-2 bg-slate-800 rounded-full overflow-hidden ">
                    <div className=" h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{
                            width: `${percentage}%`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
