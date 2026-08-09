import BaseChart from "./BaseChart";

const RamChart = ({ data }) => {
    return (
        <BaseChart
            data={data}
            dataKey="ram"
            title="RAM Usage"
            description="Real-time memory utilization"
        />
    );
};

export default RamChart;