function cell(r, g, b, cid, f) {
  var c = 'rgb(' + r + ',' + g + ',' + b + ')';
  var a = r + g + b < 300 ? '#999' : '#000';
  return $('<td>').css('background-color', c).prop('title', cid).click(() => f(c, cid, a));
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
  setupTable($('#gbg'), $('#gbggs'), (c, tc, a) => {
    $('body').css({
      'background-color': c,
      'color': a
    });
  });
  setupTable($('#bg'), $('#bggs'), (c, tc) => {
    $('#ex').css('background-color', c);
    $('.bg-label').text(tc);
  });
  setupTable($('#fg'), $('#fggs'), (c, tc) => {
    $('#ex').css('color', c);
    $('.fg-label').text(tc);
  });
  $('.fg-label').text(16);
  $('.bg-label').text(231);
});
