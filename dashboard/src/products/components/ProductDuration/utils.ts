import moment from "moment-timezone";

export const getDuration = (duration: number): moment.Moment => {
  if (duration === null) {
    return null;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return moment({
    hours,
    minutes
  });
};
