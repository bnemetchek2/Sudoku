//import { Helpers } from "./Helpers";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
importScripts("./static/opencv.js");
importScripts("./static/comlink_UMD.js");
//importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("./Helpers.js");
// get root cv from the handler
if (cv instanceof Function) {
    cv = cv();
}
class myWorker {
    constructor() {
        //public bob () {
        //	return 9;
        //}
        //public async fred () {
        //	await this.sleep(5000);
        //	return 99;
        //}
        this.isRunning = false;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ProcessImage(imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRunning)
                return null;
            this.isRunning = true;
            let result = null;
            try {
                let img = cv["matFromImageData"](imageData);
                const depth = img.type() % 8;
                let gray = new cv.Mat();
                cv.cvtColor(img, gray, cv.COLOR_BGR2GRAY);
                let canny = Helpers.AutoCanny(gray);
                result = Helpers.imageDataFromMat(canny);
                // cleanup
                img.delete();
                gray.delete();
                canny.delete();
                return result;
            }
            catch (ex) {
                debugger;
            }
            finally {
                this.isRunning = false;
            }
            //img.convertTo(gray, cv.cv
            //cv.Mat.convertTo
            //let bob = imageData.toString();
            //const img = cv.matFromImageData(imageData)
        });
    }
}
let service = new myWorker();
Comlink.expose(service);
//this.addEventListener('message', async event => {
//	let it = event.data;
//	cv['onRuntimeInitialized'] = () => {
//		console.log((<any>cv).getBuildInformation());
//		let bob2 = cv.BORDER_REPLICATE;
//	}
//});
//export {
//	myWorker
//}
//# sourceMappingURL=cvWorker.js.map