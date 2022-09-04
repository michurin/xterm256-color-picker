function cell(r, g, b, cid, f) {
  const c = `rgb(${r},${g},${b})`;
  const a = r + g + b < 300 ? '#999' : '#000';
  return $('<td>').css('background-color', c).prop('title', cid).click(() => f({
    c, cid, a, ct: [r, g, b],
  }));
}

function setupTable(t, f) {
  let tr;
  let i;
  for (i = 16; i < 232; i++) {
    if ((i - 16) % 36 === 0) {
      tr = $('<tr>');
      t.append(tr);
    }
    tr.append(cell(...getIndexedColor(i), i, f));
  }
  // include all the greys for the ramp
  let colors = [];
  for (i = 16; i < 232; i += 43) {
    colors.push([i, getIndexedColor(i)]);
  }
  for (i = 232; i < 256; i++) {
    colors.push([i, getIndexedColor(i)]);
  }
  colors.sort((a, b) => b[1][0] - a[1][0]);
  tr = $('<tr>');
  colors.forEach(c => {
    tr.append(cell(...c[1], c[0], f));
  });
  t.append(tr);
}

function setColorByPrefix(prefix, idx) {
  const c = getIndexedColor(idx);
  $(`.${prefix}-label`).text(idx);
  $(`.${prefix}-label-hex`).text(c.map(x => x.toString(16).padStart(2, '0')).join(''));
  $(`.${prefix}-label-rgb`).text(c.join(', '));
}

$(() => {
  let fgt = [0, 0, 0];
  let bgt = [255, 255, 255];
  setupTable($('#gbg'), ({ c, a }) => {
    $('body').css({
      'background-color': c,
      color: a,
    });
  });
  setupTable($('#bg'), ({ c, cid, ct }) => {
    $('#ex').css('background-color', c);
    setColorByPrefix('bg', cid);
    bgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  setupTable($('#fg'), ({ c, cid, ct }) => {
    $('#ex').css('color', c);
    setColorByPrefix('fg', cid);
    fgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  setColorByPrefix('fg', 16);
  setColorByPrefix('bg', 231);
  $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
});
