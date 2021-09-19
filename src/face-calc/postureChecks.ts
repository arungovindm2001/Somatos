import * as faceapi from "face-api.js";

enum Landmarks {
  leftEye,
  rightEye,
  topLip,
  bottomLip,
  nose,
  jaw,
  leftEyebrow,
  rightEyebrow,
}

// Returns true if check fails ie bad posture
const absolutePositionCheck = (
  imageWidth: number,
  imageHeight: number,
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  newDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  limit: number
): Boolean => {
  const groundTruthLeftEye = groundTruthDetection.landmarks.getLeftEye();
  const newLeftEye = newDetection.landmarks.getLeftEye();

  const dist = faceapi.euclideanDistance(
    [groundTruthLeftEye[0].x, groundTruthLeftEye[0].y],
    [newLeftEye[0].x, newLeftEye[0].y]
  );
  const distLimit = getDiagonalLength(imageWidth, imageHeight) * limit;
  console.log("Position check results:", { dist, distLimit });
  return dist > distLimit;
};

const proximityCheck = (
  imageWidth: number,
  imageHeight: number,
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  newDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  limit: number
): Boolean => {
  const groundTruthNose = groundTruthDetection.landmarks.getNose();
  const groundTruthMouth = groundTruthDetection.landmarks.getMouth();
  const newNose = newDetection.landmarks.getNose();
  const newMouth = newDetection.landmarks.getMouth();
  const groundTruthDistance = getDistanceBetweenTwoPoints(
    getAverageLandmark(groundTruthNose, Landmarks.nose),
    getAverageLandmark(groundTruthMouth, Landmarks.topLip)
  );
  const newDistance = getDistanceBetweenTwoPoints(
    getAverageLandmark(newNose, Landmarks.nose),
    getAverageLandmark(newMouth, Landmarks.topLip)
  );

  const percentageChange =
    (newDistance - groundTruthDistance) / groundTruthDistance;
  console.log("Proximity check results:", {
    percentageChange,
    changeLimit: limit * 0.9,
  });

  if (percentageChange < 0) {
    return -1 * percentageChange > limit * 1.2; // make check less sensitive when leaning back
  }
  return percentageChange > limit * 0.9;
};

const forwardTiltCheck = (
  imageWidth: number,
  imageHeight: number,
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  newDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  limit: number
): Boolean => {
  const groundTruthMouth = getAverageLandmark(
    groundTruthDetection.landmarks.getMouth(),
    Landmarks.bottomLip
  );
  const groundTruthJaw = getAverageLandmark(
    groundTruthDetection.landmarks.getJawOutline(),
    Landmarks.jaw
  );
  const newMouth = getAverageLandmark(
    newDetection.landmarks.getMouth(),
    Landmarks.bottomLip
  );
  const newJaw = getAverageLandmark(
    newDetection.landmarks.getJawOutline(),
    Landmarks.jaw
  );

  //   const normalizationFactors = {
  //       groundTruth: getDistanceBetweenTwoPoints(groundTruthLeftEye, groundTruthRightEye),
  //       newPosition: getDistanceBetweenTwoPoints(newLeftEye, newRightEye)
  //   }

  const groundTruthDistance = getDistanceBetweenTwoPoints(
    groundTruthMouth,
    newMouth
  );
  const newDistance = getDistanceBetweenTwoPoints(groundTruthJaw, newJaw);

  const percentageChange =
    Math.abs(newDistance - groundTruthDistance) / groundTruthDistance;
  console.log("Forward tilt check results:", {
    percentageChange,
    changeLimit: limit * 1.3,
  });

  return percentageChange > limit * 1.3;
};

const sideTiltCheck = (
  imageWidth: number,
  imageHeight: number,
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  newDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  limit: number
): Boolean => {
  const averageGroundTruthLeftEye = getAverageLandmark(
    groundTruthDetection.landmarks.getLeftEye(),
    Landmarks.leftEye
  );
  const averageGroundTruthRightEye = getAverageLandmark(
    groundTruthDetection.landmarks.getRightEye(),
    Landmarks.rightEye
  );
  const averageNewLeftEye = getAverageLandmark(
    newDetection.landmarks.getLeftEye(),
    Landmarks.leftEye
  );
  const averageNewRightEye = getAverageLandmark(
    newDetection.landmarks.getRightEye(),
    Landmarks.rightEye
  );

  const originalV = [
    averageGroundTruthRightEye[0] - averageGroundTruthLeftEye[0],
    averageGroundTruthRightEye[1] - averageGroundTruthLeftEye[1],
  ];
  const newV = [
    averageNewRightEye[0] - averageNewLeftEye[0],
    averageNewRightEye[1] - averageNewLeftEye[1],
  ];

  const originalAngle = Math.acos(
    originalV[0] /
      Math.sqrt(Math.pow(originalV[0], 2) + Math.pow(originalV[1], 2))
  );
  const newAngle = Math.acos(
    newV[0] / Math.sqrt(Math.pow(newV[0], 2) + Math.pow(newV[1], 2))
  );
  const originalDistance = getDistanceFromPointToLine(
    averageGroundTruthRightEye,
    averageGroundTruthLeftEye,
    [averageGroundTruthRightEye[0], averageGroundTruthLeftEye[1]]
  );
  const newDistance = getDistanceFromPointToLine(
    averageNewRightEye,
    averageNewLeftEye,
    [averageNewRightEye[0], averageNewLeftEye[1]]
  );

  const angleDifference = newAngle - originalAngle;
  const distanceDifference = newDistance - originalDistance;

  console.log("Side angle tilt results:");
  console.log({ angleDifference, limit });

  return angleDifference > limit || angleDifference < -limit;
};

const getDistanceBetweenTwoPoints = (v: number[], w: number[]): number => {
  return Math.sqrt(Math.pow(w[0] - v[0], 2) + Math.pow(w[1] - v[1], 2));
};

const getDistanceFromPointToLine = (
  p: number[],
  v: number[],
  w: number[]
): number => {
  return (
    Math.abs((w[0] - v[0]) * (v[1] - p[1]) - (v[1] - p[0]) * (w[1] - v[1])) /
    getDistanceBetweenTwoPoints(v, w)
  );
};

const getAverageLandmark = (
  landmark: faceapi.Point[],
  landmarkType: Landmarks
): number[] => {
  if (landmarkType === Landmarks.leftEye) {
    return [landmark[1].x, landmark[1].y];
  }

  if (landmarkType === Landmarks.rightEye) {
    return [landmark[1].x, landmark[1].y];
  }

  if (landmarkType === Landmarks.topLip) {
    return [landmark[2].x, landmark[2].y];
  }

  if (landmarkType === Landmarks.bottomLip) {
    return [landmark[9].x, landmark[9].y];
  }

  if (landmarkType === Landmarks.nose) {
    return [landmark[0].x, landmark[0].y];
  }

  if (landmarkType === Landmarks.jaw) {
    return [landmark[8].x, landmark[8].y];
  }

  return [landmark[0].x, landmark[0].y];
};

const getDiagonalLength = (width: number, height: number): number => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};

const getLimit = (width: number, height: number): number => {
  return getDiagonalLength(width, height) * 0.075;
};

const getMidpointBetweenTwoPoints = (p1: number[], p2: number[]): number[] => {
  return [(p1[0] + p2[0]) / 2, p1[1] + p2[1]];
};

export {
  absolutePositionCheck,
  proximityCheck,
  forwardTiltCheck,
  sideTiltCheck,
};
