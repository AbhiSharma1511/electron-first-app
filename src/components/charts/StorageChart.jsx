import BaseChart from "./BaseChart";

const StorageChart = ({ data }) => {
    return (
        <BaseChart
            data={data}
            dataKey="storage"
            title="Storage Usage"
            description="Real-time storage utilization"
        />
    );
};

export default StorageChart;