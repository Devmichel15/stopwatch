import { useState, useEffect } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <h1 className="text-center text-2xl font-roboto font-bold mt-4">
        Stop Watch
      </h1>
      <div className="flex flex-col items-center justify-center h-screen w-full max-w-92">
        <p className="font-bitcount text-5xl">{formatTime(time)}</p>
        <div className="flex justify-around w-full p-4">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="px-6 py-2 bg-green-600 border-none rounded-lg shadow-md cursor-pointer hover:scale-115 transition-all"
          >
            {!isRunning ? "Resume" : "Start"}
          </button>
          <button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            className="px-6 py-2 bg-red-600 border-none rounded-lg shadow-md cursor-pointer hover:scale-115 transition-all"
          >
            Stop
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
            className="px-6 py-2 bg-blue-600 border-none rounded-lg shadow-md cursor-pointer hover:scale-115 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
