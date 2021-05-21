let video = null;
let canvas = null;
let fullSizeCanvas = null;
let context = null;
let contextOutput0 = null;
let contextOutput1 = null;
let contextOutput2 = null;
let contextOutput3 = null;
let contextOutput4 = null;
let fullSizeContext = null;
let streaming = false;
let running = false;
var inited = false;
let videoWidth = 100; // We will scale the photo width to this.
let canvasWidth = 100; // We will scale the photo width to this.
let videoHeight = 0; // This will be computed based on the input stream
let canvasHeight = 0; // This will be computed based on the input stream
let filter = 'sepia(1)';
let thisStream = null;
function onStart(options) {
    running = true;
    video = document.getElementById(options.videoID);
    canvas = document.getElementById(options.canvasID);
    context = canvas.getContext('2d');
    fullSizeCanvas = document.getElementById(options.fullSizeCanvasID);
    fullSizeContext = fullSizeCanvas.getContext('2d');
    contextOutput0 = document.getElementById(options.canvasOutput0ID).getContext('2d');
    contextOutput1 = document.getElementById(options.canvasOutput1ID).getContext('2d');
    contextOutput2 = document.getElementById(options.canvasOutput2ID).getContext('2d');
    contextOutput3 = document.getElementById(options.canvasOutput3ID).getContext('2d');
    contextOutput4 = document.getElementById(options.canvasOutput4ID).getContext('2d');
    videoWidth = options.videoWidth;
    canvasWidth = options.canvasWidth;
    filter = options.filter;
    let supports = navigator.mediaDevices.getSupportedConstraints();
    navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: options.deviceId
        },
        //video: true,
        audio: false,
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: 1.777777778,
        frameRate: { max: 30 },
    })
        //navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
        thisStream = stream;
        let track = stream.getTracks()[0];
        let constrs = track.getConstraints();
        let caps = track.getCapabilities();
        constrs.height = caps.height.max;
        track.applyConstraints(constrs);
        video.srcObject = stream;
        video.play();
    })
        .catch(function (err) {
        console.log("An error occurred: " + err);
    });
    if (inited) {
        streaming = true;
        running = true;
    }
    else {
        video.addEventListener('canplay', function () {
            if (running && !streaming) {
                videoHeight = video.videoHeight / (video.videoWidth / videoWidth);
                if (isNaN(videoHeight)) {
                    videoHeight = videoWidth / (4 / 3);
                }
                canvasHeight = canvasWidth * (videoHeight / videoWidth);
                //video.setAttribute('width', videoWidth);
                //video.setAttribute('height', videoHeight);
                canvas.setAttribute('width', canvasWidth.toString());
                canvas.setAttribute('height', canvasHeight.toString());
                fullSizeCanvas.setAttribute('width', video.videoWidth.toString());
                fullSizeCanvas.setAttribute('height', video.videoHeight.toString());
                streaming = true;
            }
        }, false);
        video.addEventListener("play", function () {
            //console.log('play');
            timercallback();
        }, false);
    }
}
function onPause() {
    if (!video || video.paused || video.ended) {
        return;
    }
    if (thisStream) {
        let track = thisStream.getTracks()[0];
        track.stop();
        thisStream = null;
    }
    running = false;
    streaming = false;
    video.pause();
}
function timercallback() {
    if (!running || video.paused || video.ended) {
        return;
    }
    computeFrame();
    setTimeout(function () {
        timercallback();
    }, 0);
}
function computeFrame() {
    if (streaming) {
        context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
        context.filter = filter;
        fullSizeContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        let imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        window["app"].processVideo(imageData, video.videoWidth, video.videoHeight);
    }
}
let deviceList = [];
// enumerate devices and select the cameras
navigator.mediaDevices.enumerateDevices().then(function (devices) {
    for (var i = 0; i !== devices.length; ++i) {
        if (devices[i].kind === 'videoinput') {
            deviceList.push({
                label: devices[i].label || 'label not found',
                deviceId: devices[i].deviceId || 'id no found'
            });
            //console.log('Camera found: ', devices[i].label || 'label not found', devices[i].deviceId || 'id no found');
            //videoConstraints.deviceId = { exact: devices[i].deviceId }
        }
    }
});
function getVideoDevices() {
    return deviceList;
}
function putImageData(idx, data) {
    if (idx < 0 || !data)
        return;
    switch (idx) {
        case 0:
            contextOutput0.putImageData(data, 0, 0);
            break;
        case 1:
            contextOutput1.putImageData(data, 0, 0);
            break;
        case 2:
            contextOutput2.putImageData(data, 0, 0);
            break;
        case 3:
            contextOutput3.putImageData(data, 0, 0);
            break;
        case 4:
            contextOutput4.putImageData(data, 0, 0);
            break;
        default:
            break;
    }
}
window["WebCamFunctions"] = {
    start: (options) => { onStart(options); },
    pause: () => { onPause(); },
    getVideoDevices: () => getVideoDevices(),
    putImageData: (idx, data) => putImageData(idx, data),
};
//# sourceMappingURL=webCam.js.map