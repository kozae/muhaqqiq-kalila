console.log("Worker loaded");

self.onmessage = async (message: any) => console.log(message);

self.postMessage("READY");
