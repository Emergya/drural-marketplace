export const getZoomFromDistance = (distance: number | undefined): number => {
  if (distance <= 1000 && distance > 500) {
    return 5;
  }
  if (distance <= 500 && distance > 300) {
    return 6;
  }
  if (distance <= 300 && distance > 200) {
    return 7;
  }
  if (distance <= 200 && distance > 100) {
    return 8;
  }
  if (distance <= 100 && distance > 50) {
    return 9;
  }
  if (distance <= 50 && distance > 30) {
    return 10;
  }
  if (distance <= 30 && distance > 20) {
    return 11;
  }
  if (distance <= 20 && distance > 10) {
    return 14;
  }
  if (distance <= 10 && distance >= 0) {
    return 15;
  }
  if (typeof distance === "undefined") {
    return 5;
  }
};
