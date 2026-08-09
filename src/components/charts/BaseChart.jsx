import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const BaseChart = ({ data, dataKey, title, description }) => {

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="mb-6">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-slate-400 text-sm mt-1">{description}</p>
            </div>

            <div className="w-full h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis domain={[0, 100]} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default BaseChart;