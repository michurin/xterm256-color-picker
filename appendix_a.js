$(() => {
  const table = $('#appendix-a');
  RGB.forEach((p) => {
    const c = p[0];
    const n = p[1];
    const fg = p[2] ? '#000' : '#fff';
    table.append($('<tr>').append(
      $('<td>').text(c),
      $('<td>').text(n),
    ).css({
      backgroundColor: c,
      color: fg,
    }));
  });
});
