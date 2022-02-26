function cell(r, g, b, cid, f) {
  var c = 'rgb(' + r + ',' + g + ',' + b + ')';
  var a = r + g + b < 300 ? '#999' : '#000';
  return $('<td>').css('background-color', c).prop('title', cid).click(() => f({ c, cid, a, ct: [r, g, b] }));
}

function setupTable(t, tgs, f) {
  var r, g, b;
  for (r = 0; r <= 5; r++) {
    var tr = $('<tr>');
    for (g = 0; g <= 5; g++) {
      for (b = 0; b <= 5; b++) {
        tr.append(cell(r * 51, g * 51, b * 51, 16 + r * 36 + g * 6 + b, f));
      }
    }
    t.append(tr);
  }
  var tr = $('<tr>');
  for (g = 0; g < 24; g++) {
    var x = g * 10 + 8;
    tr.append(cell(x, x, x, 232 + g, f))
  }
  tgs.append(tr);
}

$(() => {
  var fgt = [0, 0, 0];
  var bgt = [255, 255, 255];
  setupTable($('#gbg'), $('#gbggs'), ({ c, tc, a }) => {
    $('body').css({
      'background-color': c,
      'color': a
    });
  });
  setupTable($('#bg'), $('#bggs'), ({ c, tc, ct }) => {
    $('#ex').css('background-color', c);
    $('.bg-label').text(tc);
    bgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  setupTable($('#fg'), $('#fggs'), ({ c, tc, ct }) => {
    $('#ex').css('color', c);
    $('.fg-label').text(tc);
    fgt = ct;
    $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
  });
  $('.fg-label').text(16);
  $('.bg-label').text(231);
  $('.contrast-ratio').text(contrastRatio(bgt, fgt).toFixed(1));
});
