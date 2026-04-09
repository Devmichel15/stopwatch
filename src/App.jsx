import { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // useRef para guardar o ID do intervalo
  const intervalRef = useRef(null);

  // Função para iniciar o cronômetro
  const start = () => {
    if (intervalRef.current) return; // evita criar múltiplos intervals

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setIsRunning(true);
  };

  // Função para parar o cronômetro
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;        // importante: limpar a referência
    }
    setIsRunning(false);
  };

  // Função para resetar
  const reset = () => {
    stop();                    // primeiro para tudo
    setTime(0);
  };

  // Cleanup quando o componente desmonta (boa prática)
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center font-roboto">
      <h1 className="text-4xl font-bitcount tracking-widest mb-12">
        STOPWATCH
      </h1>

      <div className="text-8xl font-mono font-bold mb-16 text-emerald-400 tracking-widest">
        {formatTime(time)}
      </div>

      <div className="flex gap-6">
        <button
          onClick={start}
          disabled={isRunning}
          className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl text-lg font-semibold transition-all active:scale-95"
        >
          {!isRunning ? "Start" : "Running..."}
        </button>

        <button
          onClick={stop}
          disabled={!isRunning}
          className="px-10 py-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-xl text-lg font-semibold transition-all active:scale-95"
        >
          Stop
        </button>

        <button
          onClick={reset}
          className="px-10 py-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl text-lg font-semibold transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;