//import * as Comlink from "comlink";
//import * as Comlink from "./wwwroot/js/static/comlink.js";
//import { OpenCvLoader } from './openCvLoader.js'
// load into default space
//import cv2 from "./wwwroot/js/static/opencv.js";
//var xx = new OpenCvLoader();
// load worker
var worker = new Worker('./js/cvWorker.js');
var xx = Comlink.wrap(worker);
let yy = xx.bob();
yy.then(val => {
    debugger;
});
let yy2 = xx.fred();
yy2.then(val => {
    debugger;
});
//worker.onmessage = (event) => {
//    debugger;
//    //document.getElementById('result').textContent = event.data;
//    //dump('Got: ' + event.data + '\n');
//};
worker.onerror = error => {
    debugger;
    //dump('Worker error: ' + error.message + '\n');
    //throw error;
};
export {};
// send ping
//worker.postMessage(1);
// web worker
//https://aralroca.com/blog/opencv-in-the-web
//# sourceMappingURL=app.js.map