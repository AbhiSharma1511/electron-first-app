import { useEffect, useState } from "react";
import InfoCard from "./components/InfoCard";
import StatCard from "./components/StateCard";
import CpuChart from "./components/charts/CpuChart";
import RamChart from "./components/charts/RamChart";
import StorageChart from "./components/charts/StorageChart";

const App = () => {

  const [data, setData] = useState({});
  const [stats, setStats] = useState({
    cpuUsage: 0,
    ramUsage: 0,
    storageData: {
      total: 0,
      usage: 0
    }
  });
  const [cpuHistory, setCpuHistory] = useState([]);
  const [ramHistory, setRamHistory] = useState([]);
  const [storageHistory, setStorageHistory] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      // Get static system information
      const result =
        await window.electronAPI.getSystemStaticData();

      setData(result);
    }
    loadData();

    // Subscribe to continuously changing statistics
    const unsubscribe =
      window.electronAPI.subscribeStatistics((newStats) => {
        setStats(newStats);
        setCpuHistory((previous) => {
          const newPoint = {
            time: new Date().toLocaleTimeString(),
            cpu: newStats.cpuUsage * 100
          };
          return [...previous, newPoint].slice(-60);
        });
        setRamHistory((previous) => {
          const newPoint = {
            time: new Date().toLocaleTimeString(),
            ram: newStats.ramUsage * 100
          };
          return [...previous, newPoint].slice(-60);
        });
        setStorageHistory((previous) => {
          const newPoint = {
            time: new Date().toLocaleTimeString(),
            storage: newStats.storageData.usage * 100
          };

          return [...previous, newPoint].slice(-60);
        });
      });

    return unsubscribe;

  }, []);

  const cpu = (stats.cpuUsage * 100).toFixed(1);
  const ram = (stats.ramUsage * 100).toFixed(1);
  const storage = (stats.storageData.usage * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            System Monitor
          </h1>

          <p className="text-slate-400 mt-1">
            Real-time information about your computer
          </p>
        </div>

        <div className="flex items-center gap-2 border border-green-500/20 px-4 py-2 rounded-full">

          <div className="w-2.5 h-2.5 bg-green-400 rounded-full "></div>
          <span className="text-green-400 text-sm font-medium">
            LIVE
          </span>

        </div>

      </div>


      {/* Live statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CPU */}
        <div>
          <StatCard
            title="CPU Usage"
            value={`${cpu}%`}
            percentage={cpu}
            icon="⚡"
          />
          <CpuChart data={cpuHistory} />
        </div>


        {/* RAM */}
        <div>
          <StatCard
            title="RAM Usage"
            value={`${ram}%`}
            percentage={ram}
            icon="🧠"
          />
          <RamChart data={ramHistory} />
        </div>

        {/* Storage */}
        <div>
          <StatCard
            title="Storage"
            value={`${storage}%`}
            percentage={storage}
            icon="💾"
          />
          <StorageChart data={storageHistory} />
        </div>
      </div>


      {/* System Information */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">  System Information  </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <InfoCard
            title="CPU Model"
            value={data.cpuModel || "Loading..."}
          />

          <InfoCard
            title="Total Memory"
            value={
              data.totalMemoryGB
                ? `${data.totalMemoryGB} GB`
                : "Loading..."
            }
          />

          <InfoCard
            title="Total Storage"
            value={
              data.totalStorage
                ? `${data.totalStorage} GB`
                : "Loading..."
            }
          />

        </div>

      </div>

    </div>
  );
};

export default App;