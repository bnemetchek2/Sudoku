var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class OpenCvLoader {
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static loadOpenCv(onloadCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            let OPENCV_URL = "js/static/opencv.js";
            let script = document.createElement('script');
            script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');
            script.addEventListener('load', () => __awaiter(this, void 0, void 0, function* () {
                let cv = window['cv'];
                debugger;
                if (cv.getBuildInformation) {
                    console.log(cv.getBuildInformation());
                    onloadCallback();
                }
                else {
                    // WASM
                    if (cv instanceof Promise) {
                        //window["cv"] = await cv;
                        console.log(cv.getBuildInformation());
                        onloadCallback();
                    }
                    else {
                        cv['onRuntimeInitialized'] = () => {
                            console.log(cv.getBuildInformation());
                            onloadCallback();
                        };
                    }
                }
            }));
            script.addEventListener('error', () => {
                console.error('Failed to load ' + OPENCV_URL);
            });
            yield this.sleep(1000);
            script.src = OPENCV_URL;
            let node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(script, node);
        });
    }
}
//export OpenCvLoader;
//# sourceMappingURL=OpenCvLoader.js.map