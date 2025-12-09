const colorThresholds = [
  { rating: 0, name: "灰", code: "#808080" },
  { rating: 400, name: "茶", code: "#804000" },
  { rating: 800, name: "緑", code: "#008000" },
  { rating: 1200, name: "水", code: "#00c0c0" },
  { rating: 1600, name: "青", code: "#0000ff" },
  { rating: 2000, name: "黄", code: "#c0c000" },
  { rating: 2400, name: "橙", code: "#ff8000" },
  { rating: 2800, name: "赤", code: "#ff0000" },
];

interface Color {
  name: string;
  code: string;
}

export interface ColorsAndRatingToNext {
  currentColor: Color;
  nextColor: Color | null;
  ratingToNextColor: number | null;
}

export function getColorsAndRatingToNextColor(
  rating: number
): ColorsAndRatingToNext {
  let current = colorThresholds[0];
  let next = colorThresholds[1];

  for (let i = 0; i < colorThresholds.length; i++) {
    if (rating >= colorThresholds[i].rating) {
      current = colorThresholds[i];
      if (i + 1 >= colorThresholds.length) {
        return {
          currentColor: { name: current.name, code: current.code },
          nextColor: null,
          ratingToNextColor: null,
        };
      }
      next = colorThresholds[i + 1];
    }
  }

  return {
    currentColor: { name: current.name, code: current.code },
    nextColor: { name: next.name, code: next.code },
    ratingToNextColor: next.rating - rating,
  };
}
