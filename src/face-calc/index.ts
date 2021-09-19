import * as faceapi from "face-api.js";

import {
  absolutePositionCheck,
  proximityCheck,
  forwardTiltCheck,
  sideTiltCheck,
} from "./postureChecks";

const MODEL_URL = "./models";

const loadModels = async () => {
  await Promise.all([
    // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  ]);
  console.log("Loaded all models");
};

// Returns null if no face found
const detectLandmarks = async (
  input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): Promise<faceapi.WithFaceLandmarks<
  { detection: faceapi.FaceDetection },
  faceapi.FaceLandmarks68
> | null> => {
  const detectionsWithLandmarks = await faceapi
    .detectSingleFace(input)
    .withFaceLandmarks(true);

  if (detectionsWithLandmarks) {
    console.log({
      leftEye: detectionsWithLandmarks.landmarks.getLeftEye(),
      rightEye: detectionsWithLandmarks.landmarks.getRightEye(),
      mouth: detectionsWithLandmarks.landmarks.getMouth(),
      nose: detectionsWithLandmarks.landmarks.getNose(),
      jaw: detectionsWithLandmarks.landmarks.getJawOutline(),
    });
    return detectionsWithLandmarks;
  }
  return null;
};

const drawFeatures = (
  detections: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  canvas: HTMLCanvasElement,
  input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): void => {
  const displaySize = {
    width: input.width,
    height: input.height,
  };
  faceapi.matchDimensions(canvas, displaySize);

  const resizedDetections = faceapi.resizeResults(detections, displaySize);

  if (resizedDetections) {
    console.log("Drawing face outline");
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }
};

// returns null if no face found
const isBadPosture = async (
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  sensitivity: number = 5
): Promise<Boolean | null> => {
  console.log("Initiate posture check");
  const newDetection = await detectLandmarks(input);
  //TODO
  if (!newDetection) {
    console.log("No face found in posture check");
    return null;
  }

  const limit = 0.1 + (10 - sensitivity) / 100;

  return (
    // absolutePositionCheck(
    //   input.width,
    //   input.height,
    //   groundTruthDetection,
    //   newDetection
    // ) ||
    proximityCheck(
      input.width,
      input.height,
      groundTruthDetection,
      newDetection,
      limit
    ) ||
    console.log("Proximity check passed") ||
    sideTiltCheck(
      input.width,
      input.height,
      groundTruthDetection,
      newDetection,
      limit
    ) ||
    console.log("Side angle tilt check passed")
    // forwardTiltCheck(
    //     input.width,
    //     input.height,
    //     groundTruthDetection,
    //     newDetection
    // ) ||
  );
};

export { loadModels, detectLandmarks, drawFeatures, isBadPosture };
