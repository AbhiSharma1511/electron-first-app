import { useEffect, useState } from "react";

const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const loadData = async () => {
      const result =
        await window.electronAPI.getSystemStaticData();

      setData(result);
    };

    loadData();

  }, []);

``
  return (
    <div className="text-white text-center justify-center items-center">
      <h2 className="">This is the maim page of the application.</h2>
      <div className="bg-amber-100">
        <h3>Data will be shown here</h3>
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  )
}

export default App