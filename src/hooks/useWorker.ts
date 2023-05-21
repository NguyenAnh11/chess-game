import { useEffect, useRef } from "react";

type WorkerFactory = (...args: any) => Worker;

export default function useWorker<T>(
  value: Worker | WorkerFactory,
  onMessage?: (e: MessageEvent<T>) => void,
  onTerminate?: () => void
) {
  const worker = useRef<Worker>(value instanceof Worker ? value : value());

  useEffect(() => {
    if (worker.current) {
      worker.current.onmessage = (e: MessageEvent<T>) =>
        onMessage && onMessage(e);
    }
  }, [worker.current]);

  function terminate() {
    if (worker.current) {
      worker.current.terminate();

      onTerminate && onTerminate();

      const newWorker = value instanceof Worker ? value : value();

      worker.current = newWorker;
    }
  }

  function postMessage(data: any) {
    if (worker.current) {
      worker.current.postMessage(data);
    }
  }

  return {
    postMessage,
    terminate,
  };
}
