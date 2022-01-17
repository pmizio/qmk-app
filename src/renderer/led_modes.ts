/***** rgblight_mode(mode)/rgblight_mode_noeeprom(mode) ****

 old mode number (before 0.6.117) to new mode name table

|-----------------|-----------------------------------|
| old mode number | new mode name                     |
|-----------------|-----------------------------------|
|        1        | RGBLIGHT_MODE_STATIC_LIGHT        |
|        2        | RGBLIGHT_MODE_BREATHING           |
|        3        | RGBLIGHT_MODE_BREATHING + 1       |
|        4        | RGBLIGHT_MODE_BREATHING + 2       |
|        5        | RGBLIGHT_MODE_BREATHING + 3       |
|        6        | RGBLIGHT_MODE_RAINBOW_MOOD        |
|        7        | RGBLIGHT_MODE_RAINBOW_MOOD + 1    |
|        8        | RGBLIGHT_MODE_RAINBOW_MOOD + 2    |
|        9        | RGBLIGHT_MODE_RAINBOW_SWIRL       |
|       10        | RGBLIGHT_MODE_RAINBOW_SWIRL + 1   |
|       11        | RGBLIGHT_MODE_RAINBOW_SWIRL + 2   |
|       12        | RGBLIGHT_MODE_RAINBOW_SWIRL + 3   |
|       13        | RGBLIGHT_MODE_RAINBOW_SWIRL + 4   |
|       14        | RGBLIGHT_MODE_RAINBOW_SWIRL + 5   |
|       15        | RGBLIGHT_MODE_SNAKE               |
|       16        | RGBLIGHT_MODE_SNAKE + 1           |
|       17        | RGBLIGHT_MODE_SNAKE + 2           |
|       18        | RGBLIGHT_MODE_SNAKE + 3           |
|       19        | RGBLIGHT_MODE_SNAKE + 4           |
|       20        | RGBLIGHT_MODE_SNAKE + 5           |
|       21        | RGBLIGHT_MODE_KNIGHT              |
|       22        | RGBLIGHT_MODE_KNIGHT + 1          |
|       23        | RGBLIGHT_MODE_KNIGHT + 2          |
|       24        | RGBLIGHT_MODE_CHRISTMAS           |
|       25        | RGBLIGHT_MODE_STATIC_GRADIENT     |
|       26        | RGBLIGHT_MODE_STATIC_GRADIENT + 1 |
|       27        | RGBLIGHT_MODE_STATIC_GRADIENT + 2 |
|       28        | RGBLIGHT_MODE_STATIC_GRADIENT + 3 |
|       29        | RGBLIGHT_MODE_STATIC_GRADIENT + 4 |
|       30        | RGBLIGHT_MODE_STATIC_GRADIENT + 5 |
|       31        | RGBLIGHT_MODE_STATIC_GRADIENT + 6 |
|       32        | RGBLIGHT_MODE_STATIC_GRADIENT + 7 |
|       33        | RGBLIGHT_MODE_STATIC_GRADIENT + 8 |
|       34        | RGBLIGHT_MODE_STATIC_GRADIENT + 9 |
|       35        | RGBLIGHT_MODE_RGB_TEST            |
|       36        | RGBLIGHT_MODE_ALTERNATING         |
|       37        | RGBLIGHT_MODE_TWINKLE             |
|       38        | RGBLIGHT_MODE_TWINKLE + 1         |
|       39        | RGBLIGHT_MODE_TWINKLE + 2         |
|       40        | RGBLIGHT_MODE_TWINKLE + 3         |
|       41        | RGBLIGHT_MODE_TWINKLE + 4         |
|       42        | RGBLIGHT_MODE_TWINKLE + 5         |
|-----------------|-----------------------------------|
 *****/

export type RGBMode = {
  name: string;
  byte: number;
  speed: number;
  staic: boolean;
};

const makeRgbMode = (
  name: string,
  byte: number,
  speed: number,
  staic = true
): RGBMode => ({
  name,
  byte,
  speed,
  staic,
});

export const RGBLIGHT_MODE_STATIC_LIGHT = makeRgbMode('Static light', 1, 0);
export const RGBLIGHT_MODE_BREATHING = makeRgbMode('Breathing', 2, 3);
export const RGBLIGHT_MODE_RAINBOW_MOOD = makeRgbMode(
  'Rainbow mood',
  6,
  2,
  false
);
export const RGBLIGHT_MODE_RAINBOW_SWIRL = makeRgbMode(
  'Rainbow swirl',
  9,
  5,
  false
);
export const RGBLIGHT_MODE_SNAKE = makeRgbMode('Snake', 15, 5);
export const RGBLIGHT_MODE_KNIGHT = makeRgbMode('Knight', 21, 2);
export const RGBLIGHT_MODE_CHRISTMAS = makeRgbMode('Christmas', 24, 0, false);
export const RGBLIGHT_MODE_STATIC_GRADIENT = makeRgbMode(
  'Static gradient',
  25,
  9
);
export const RGBLIGHT_MODE_RGB_TEST = makeRgbMode('rgb test', 35, 0);
export const RGBLIGHT_MODE_ALTERNATING = makeRgbMode('Alternating', 36, 0);
export const RGBLIGHT_MODE_TWINKLE = makeRgbMode('Twinkle', 37, 6);

export default [
  RGBLIGHT_MODE_STATIC_LIGHT,
  RGBLIGHT_MODE_BREATHING,
  RGBLIGHT_MODE_RAINBOW_MOOD,
  RGBLIGHT_MODE_RAINBOW_SWIRL,
  RGBLIGHT_MODE_SNAKE,
  RGBLIGHT_MODE_KNIGHT,
  RGBLIGHT_MODE_CHRISTMAS,
  RGBLIGHT_MODE_STATIC_GRADIENT,
  RGBLIGHT_MODE_ALTERNATING,
  RGBLIGHT_MODE_TWINKLE,
];
