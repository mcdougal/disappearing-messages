/**
 * Convert a hex-based theme color into an rgba value.
 *
 * Examples:
 *
 *   theme.utils.rgba(theme.colors.common.white, .5)
 *     =>
 *     rgba(255, 255, 255, 0.5)
 *
 *   theme.utils.rgba(theme.colors.common.black, 0)
 *     =>
 *     rgba(0, 0, 0, 0)
 */
export default (hex: string, opacity: number): string => {
  if (opacity < 0 || opacity > 1) {
    throw new Error(`Opacity must be between 0 and 1, received: ${opacity}`);
  }

  const is3CharHex = /^#[A-Fa-f0-9]{3}$/.test(hex);
  const is6CharHex = /^#[A-Fa-f0-9]{6}$/.test(hex);

  let r;
  let g;
  let b;

  if (is3CharHex) {
    r = parseInt(hex[1].repeat(2), 16);
    g = parseInt(hex[2].repeat(2), 16);
    b = parseInt(hex[3].repeat(2), 16);
  } else if (is6CharHex) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
