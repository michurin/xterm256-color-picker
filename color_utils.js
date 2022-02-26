// https://www.sis.se/api/document/preview/562720/
// https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-relative-luminance
// https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-contrast-ratio

function toXYZ(cF) {
  return cF <= 0.04045 ? cF / 12.92 : ((cF + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(rI, gI, bI) {
  return 0.2126 * toXYZ(rI / 255) + 0.7152 * toXYZ(gI / 255) + 0.0722 * toXYZ(bI / 255);
}

function contrastRatio(ct0, ct1) {
  var lum0 = relativeLuminance(...ct0);
  var lum1 = relativeLuminance(...ct1);
  return lum0 > lum1 ? ((lum0 + 0.05) / (lum1 + 0.05)) : ((lum1 + 0.05) / (lum0 + 0.05));
}

function getIndexedColor(i) {
  if (i < 16) {
    throw new TypeError('colors 0-15 are terminal specific and cannot be converted');
  }
  if (i < 232) {
    const clamp = i - 16;
    const r = Math.floor(clamp / 36) % 6;
    const g = Math.floor(clamp / 6) % 6;
    const b = clamp % 6;
    return [
      r ? r * 40 + 55 : 0,
      g ? g * 40 + 55 : 0,
      b ? b * 40 + 55 : 0,
    ];
  }
  if (i < 256) {
    const clamp = i - 232;
    const level = clamp * 10 + 8;
    return [level, level, level];
  }
  throw new TypeError('invalid XTerm color: ', i);
}
