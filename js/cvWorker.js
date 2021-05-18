// declare opencv types
//import type cvType from "../node_modules/opencv-ts/src/opencv";
// ambient declare will allow typed use of cv without emiting code
//declare global {
//	const cv: typeof cvType;
//}
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
// get root cv from the handler
if (cv instanceof Function) {
    cv = cv();
}
class renfud {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    bob() {
        return 9;
    }
    fred() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(5000);
            return 99;
        });
    }
}
let service = new renfud();
Comlink.expose(service);
//this.addEventListener('message', async event => {
//	let it = event.data;
//	cv['onRuntimeInitialized'] = () => {
//		console.log((<any>cv).getBuildInformation());
//		let bob2 = cv.BORDER_REPLICATE;
//	}
//});
//# sourceMappingURL=cvWorker.js.map