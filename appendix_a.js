$(() => {
  var table = $('#appendix-a');
  RGB.forEach((p) => {
    var c = p[0];
    var n = p[1];
    var fg = p[2] ? '#000' : '#fff';
    table.append($('<tr>').append(
      $('<td>').text(c),
      $('<td>').text(n)
    ).css({
      backgroundColor: c,
      color: fg
    }));
  });
});
