function cell(r, g, b, cid, f) {
  var c = 'rgb(' + r + ',' + g + ',' + b + ')';
  var a = r + g + b < 300 ? '#999' : '#000';
  return $('<td>').css('background-color', c).prop('title', cid).click(() => f({ c, cid, a, ct: [r, g, b] }));
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

$(() => {
  var fgt = [0, 0, 0];
  var bgt = [255, 255, 255];
  setupTable($('#gbg'), ({ c, a }) => {
    $('body').css({
      'background-color': c,
      'color': a
    });
  });
  setupTable($('#bg'), ({ c, cid, ct }) => {
    $('#ex').css('background-color', c);
    $('.bg-label').text(cid);
    bgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  setupTable($('#fg'), ({ c, cid, ct }) => {
    $('#ex').css('color', c);
    $('.fg-label').text(cid);
    fgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  $('.fg-label').text(16);
  $('.bg-label').text(231);
  $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
});
