import { useRef, useEffect } from "react";

type InitWorkerFactory = (...args: any) => Worker;

type WorkerCallback<T> = (e: MessageEvent<T>) => void;

export default function useWorker<T>(
  initialWorker: Worker | InitWorkerFactory,
  onMessage?: WorkerCallback<T>,
  onTerminate?: () => void
) {
  const worker = useRef<Worker | undefined>();

  useEffect(() => {
    if (window.Worker) {
      worker.current =
        initialWorker instanceof Worker ? initialWorker : initialWorker();

      worker.current.onmessage = (e: MessageEvent<T>) => {
        if (onMessage) onMessage(e);
      };
    }

    return () => terminate();
  }, []);

  const terminate = () => {
    if (worker.current) {
      worker.current.terminate();
      worker.current = undefined;
    }

    if (onTerminate) onTerminate();
  };

  function postMessage(data: any) {
    if (!worker.current && window.Worker) {
      worker.current =
        initialWorker instanceof Worker ? initialWorker : initialWorker();
    }

    if (worker.current) {
        worker.current.postMessage(data);
    }
  }

  return {
    worker,
    terminate,
    postMessage,
  };
}
