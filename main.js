function cell(r, g, b, cid, f) {
  const c = `rgb(${r},${g},${b})`;
  const a = r + g + b < 300 ? '#999' : '#000';
  return $('<td>').css('background-color', c).prop('title', cid).click(() => f({
    c, cid, a, ct: [r, g, b],
  }));
}

function setupTable(t, f) {
  for (var tr, i = 16; i < 256; i++) {
    if ((i - 16) % 36 === 0) {
      tr = $('<tr>');
      t.append(tr);
    }
    tr.append(cell(...getIndexedColor(i), i, f));
  }
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
