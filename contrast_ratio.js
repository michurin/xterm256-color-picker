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
