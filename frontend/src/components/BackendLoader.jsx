import { useEffect, useState } from "react";

const BACKENDS = [
  {
    name: "Defense Suite",
    url: "https://defense-suite.onrender.com",
  },
  {
    name: "Mock Interview",
    url: "https://mocks-pnfz.onrender.com",
  },
];

const BackendLoader = ({ onReady }) => {
  const [attempt, setAttempt] = useState(1);
  const [status, setStatus] = useState({});

  useEffect(() => {
    let active = true;

    const pingBackend = async (backend) => {
      try {
        const res = await fetch(backend.url, {
          method: "GET",
          mode: "cors",
        });

        return res.ok;
      } catch {
        return false;
      }
    };

    const wakeAllBackends = async () => {
      const results = await Promise.all(
        BACKENDS.map(async (backend) => {
          const ok = await pingBackend(backend);
          return { name: backend.name, ok };
        })
      );

      if (!active) return;

      const statusMap = {};
      results.forEach((r) => {
        statusMap[r.name] = r.ok;
      });

      setStatus(statusMap);

      const allReady = results.every((r) => r.ok);

      if (allReady) {
        setTimeout(onReady, 900);
      } else {
        setTimeout(() => {
          setAttempt((a) => a + 1);
        }, 3000);
      }
    };

    wakeAllBackends();

    return () => {
      active = false;
    };
  }, [attempt, onReady]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f172a] text-white px-4">
      <h1 className="text-3xl font-bold tracking-wide text-[#efad04]">
        Military Educator
      </h1>

      <p className="mt-3 text-sm text-gray-300">
        Initializing secure defence systems…
      </p>

      {/* Backend status list */}
      <div className="mt-6 w-full max-w-sm space-y-2">
        {BACKENDS.map((backend) => {
          const isReady = status[backend.name];

          return (
            <div
              key={backend.name}
              className="flex justify-between items-center 
                         bg-[#1b273e] border border-white/10 
                         rounded-lg px-4 py-2 text-sm"
            >
              <span>{backend.name}</span>
              <span
                className={`font-semibold ${
                  isReady ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {isReady ? "ONLINE" : "WAKING UP"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Loader */}
      <div className="mt-6 w-60 h-1 bg-white/10 rounded overflow-hidden">
        <div className="h-full w-1/3 bg-[#efad04] animate-pulse" />
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Attempt {attempt} • Render cold start detected
      </p>
    </div>
  );
};

export default BackendLoader;
