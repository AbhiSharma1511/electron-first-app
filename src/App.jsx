import { useEffect, useState } from "react";

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

  useEffect(() => {

    const loadData = async () => {

      // Get static system information
      const result =
        await window.electronAPI.getSystemStaticData();

      setData(result);

      // Subscribe to continuously changing statistics
      window.electronAPI.subscribeStatistics((newStats) => {
        setStats(newStats);
      });
    };

    loadData();

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
        <StatCard
          title="CPU Usage"
          value={`${cpu}%`}
          percentage={cpu}
          icon="⚡"
        />

        {/* RAM */}
        <StatCard
          title="RAM Usage"
          value={`${ram}%`}
          percentage={ram}
          icon="🧠"
        />

        {/* Storage */}
        <StatCard
          title="Storage"
          value={`${storage}%`}
          percentage={storage}
          icon="💾"
        />

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

const StatCard = ({
  title,
  value,
  percentage,
  icon
}) => {

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

const InfoCard = ({
  title,
  value
}) => {

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


export default App;