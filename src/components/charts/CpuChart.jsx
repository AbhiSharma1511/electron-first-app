import BaseChart from "./BaseChart";

const CpuChart = ({ data }) => {
    return (
        <BaseChart
            data={data}
            dataKey="cpu"
            title="CPU Usage"
            description="Real-time CPU utilization"
        />
    );
};

export default CpuChart;