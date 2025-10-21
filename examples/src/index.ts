import { SharedWorker } from '../../shared-worker.ts'

const elm_div_count = document.getElementById('count')!
const elm_btn_increment = document.getElementById('increment')!

const worker = new SharedWorker('./worker.js', { type: "module" })

worker.addEventListener('message', (e: any) => {
    elm_div_count.innerHTML = e.data
})

elm_btn_increment.addEventListener('click', () => {
    worker.postMessage(null)
})