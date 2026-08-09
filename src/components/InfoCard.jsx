export default function InfoCard({
    title,
    value }
) {

    return (
        <div className=" bg-slate-900 border border-slate-800 rounded-2xl p-6 ">

            <p className="text-slate-400 text-sm mb-2">
                {title}
            </p>
            <p className="text-lg font-medium wrap-break-word">
                {value}
            </p>

        </div>
    );
};