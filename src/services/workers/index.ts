function createWorker(path: string): Worker {
  const worker = new Worker(new URL(path, import.meta.url), {
    type: "module",
  });

  worker.onerror = (e: ErrorEvent) => {
    console.log(e.message);
  };

  return worker;
}

export function createHintWorker(): Worker {
  return createWorker("./Hint.Worker.ts");
}

export function createAIWorker(): Worker {
  return createWorker("./Ai.Worker.ts");
}
