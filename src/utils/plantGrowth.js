export function getPlantPhase(totalFocusSeconds) {

  const minutes =
    totalFocusSeconds / 60;

  if (minutes < 15) {
    return "seed";
  }

  if (minutes < 60) {
    return "sprout";
  }

  return "mature";
}