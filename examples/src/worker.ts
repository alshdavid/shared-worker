import { ConnectionManager } from "../../connection-manager.ts";

// Shared state
let count = 0;

const worker = new ConnectionManager();

worker.addEventListener("connect", ({ data: conn }) => {
  console.log("Connected", conn.id());

  conn.postMessage(count);

  conn.addEventListener("message", (_e) => {
    count += 1;
    worker.postMessageAll(count);
  });

  conn.addEventListener("disconnect", (_e) => 
    console.log("Disconnected", conn.id()),
    { once: true }
  );
});
