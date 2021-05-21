var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import type helpersType from "./Helpers";
//declare global {
//    let Helpers: typeof helpersType;
//}
//import * as Comlink from "comlink";
//import * as Comlink from "./wwwroot/js/static/comlink.js";
//import { OpenCvLoader } from './openCvLoader.js'
// load into default space
//import cv2 from "./wwwroot/js/static/opencv.js";
//var xx = new OpenCvLoader();
// load worker
let worker = new Worker('./js/cvWorker.js');
let workerProxy = Comlink.wrap(worker);
//let yy = workerProxy.bob();
//yy.then(val => {
//    //debugger;
//});
//let yy2 = workerProxy.fred();
//yy2.then(val => {
//    //debugger;
//});
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
let isRunning = false;
function processVideo(imageData, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isRunning)
            return;
        isRunning = true;
        try {
            let result = yield workerProxy.ProcessImage(imageData);
            // Render the processed image to the canvas
            window["WebCamFunctions"].putImageData(0, result);
            //ctx.putImageData(processedImage.data.payload, 0, 0);
        }
        finally {
            isRunning = false;
        }
    });
}
window["app"] = {
    processVideo: (imageData, width, height) => { processVideo(imageData, width, height); },
};
export {};
// send ping
//worker.postMessage(1);
// web worker
//https://aralroca.com/blog/opencv-in-the-web
//# sourceMappingURL=app.js.map