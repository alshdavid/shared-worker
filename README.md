# SharedWorker

## Demo

[https://alshdavid.github.io/shared-worker](https://alshdavid.github.io/shared-worker/)

## SharedWorker implementation that tracks connected clients

The default implementation of `SharedWorker` does not notify clients when a tab/window disconnects.

This can make tracking connected clients difficult and result in memory leaks.

This library uses the Locks API to detect when a window has been closed and notifies the shared worker.

### Usage

This example creates a page with an incrementable counter that is shared between multiple pages

```html
<body>
  <div id="count"></div>
  <button id="increment">Increment</button>
</body>

<script type="module">
  import { SharedWorker } from '@alshdavid/shared-worker/shared-worker.js'

  const elm_div_count = document.getElementById('count')
  const elm_btn_increment = document.getElementById('increment')

  const worker = new SharedWorker('./worker.mjs', { type: "module" })
  
  worker.addEventListener('message', (e) => {
    elm_div_count.innerHTML = e.data
  })

  elm_btn_increment.addEventListener('click', () => {
    worker.postMessage(null)
  })
</script>
```

```javascript
// worker.mjs
import { ConnectionManager } from "@alshdavid/shared-worker/connection-manager.js";

// Shared state
let count = 0;

const clients = new ConnectionManager();

clients.addEventListener("connect", ({ data: conn }) => {
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
```