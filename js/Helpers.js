//import { Scalar } from "opencv-ts"
class Helpers {
    static imageDataFromMat(mat) {
        // converts the mat type to cv.CV_8U
        const img = new cv.Mat();
        const depth = mat.type() % 8;
        const scale = depth <= cv.CV_8S ? 1.0 : depth <= cv.CV_32S ? 1.0 / 256.0 : 255.0;
        const shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128.0 : 0.0;
        mat.convertTo(img, cv.CV_8U, scale, shift);
        // converts the img type to cv.CV_8UC4
        switch (img.type()) {
            case cv.CV_8UC1:
                cv.cvtColor(img, img, cv.COLOR_GRAY2RGBA);
                break;
            case cv.CV_8UC3:
                cv.cvtColor(img, img, cv.COLOR_RGB2RGBA);
                break;
            case cv.CV_8UC4:
                break;
            default:
                throw new Error('Bad number of channels (Source image must have 1, 3 or 4 channels)');
        }
        const clampedArray = new ImageData(new Uint8ClampedArray(img.data), img.cols, img.rows);
        img.delete();
        return clampedArray;
    }
    static IsApproximateContourRectangle(approxContour) {
        //approxContour.
        //Point[] pts = approxContour.ToArray();
        //LineSegment2D[] edges = PointCollection.PolyLine(pts, true);
        ////if (edges.Length != 4)
        ////	throw new Exception(nameof(approxContour) + " must be of size 4");
        //for (int j = 0; j < edges.Length; j++)
        //{
        //	double angle = Math.Abs(edges[(j + 1) % edges.Length].GetExteriorAngleDegree(edges[j]));
        //	if (angle < 70 || angle > 110) {
        //		return false;
        //	}
        //}
        return true;
    }
    static SmoothGaussian(image, kernelWidth, kernelHeight = kernelWidth, sigma1 = 0, sigma2 = 0) {
        let dst = cv.Mat.zeros(image.cols, image.rows, cv.CV_8UC3);
        let ksize = new cv.Size(kernelWidth, kernelHeight);
        cv.GaussianBlur(image, dst, ksize, sigma1, sigma2, cv.BORDER_DEFAULT);
        return dst;
    }
    static Flood(image, seedPoint, color) {
        const mask = new cv.Mat(image.rows + 2, image.cols + 2, cv.CV_8U);
        let floodRect = {};
        cv.floodFill(image, seedPoint, color, floodRect);
    }
    static AutoCanny(image) {
        //let dst = cv.Mat.zeros(image.cols, image.rows, cv.CV_8UC3);
        let Img_SourceSmoothed_Gray = Helpers.SmoothGaussian(image, 3);
        //https://docs.opencv.org/3.4/d5/daa/tutorial_js_contours_begin.html
        let CannyAccThresh = cv.threshold(Img_SourceSmoothed_Gray, Img_SourceSmoothed_Gray, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);
        let CannyThresh = 0.1 * CannyAccThresh;
        let dst = new cv.Mat();
        cv.Canny(Img_SourceSmoothed_Gray, dst, CannyThresh, CannyAccThresh);
        return dst;
    }
}
//export {
//	Helpers
//}
//declare const Helpers: helpers;
////export default Helpers;
//export default {
//	Helpers
//}
//# sourceMappingURL=Helpers.js.map