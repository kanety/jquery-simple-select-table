describe('jquery-simple-select-table', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', function() {
    var $table, $tr, $td;
    var $cb, $hcb;

    beforeEach(function() {
      $table = $('#basic');
      $tr = $table.find('tr:has(td)');
      $td = $tr.find('td:last');
      $cb = $tr.find('td input:checkbox');
      $hcb = $table.find('th input:checkbox');
    });

    it('checks all checkboxes', function() {
      $hcb.click();
      expect($cb.filter(':checked').length).toEqual(4);
    });

    it('selects table rows', function() {
      $td.eq(0).click();
      expect($tr.eq(0).hasClass('row-selected')).toEqual(true);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(false);
      expect($cb.eq(0).is(':checked')).toEqual(true);
      expect($cb.eq(1).is(':checked')).toEqual(false);
  
      $td.eq(1).click();
      expect($tr.eq(0).hasClass('row-selected')).toEqual(false);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(true);
      expect($cb.eq(0).is(':checked')).toEqual(false);
      expect($cb.eq(1).is(':checked')).toEqual(true);
    });

    it('handles ctrl + click', function() {
      $td.eq(0).click();
      $td.eq(1).trigger($.Event('click', { ctrlKey: true }));
      expect($tr.eq(0).hasClass('row-selected')).toEqual(true);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(false);
      expect($cb.eq(0).is(':checked')).toEqual(true);
      expect($cb.eq(1).is(':checked')).toEqual(true);
    });

    it('handles shift + click', function() {
      $td.eq(0).click();
      $td.eq(3).trigger($.Event('click', { shiftKey: true }));
      expect($tr.eq(0).hasClass('row-selected')).toEqual(true);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(false);
      expect($cb.filter(':checked').length).toEqual(4);
    });

    it('handles up/down key', function() {
      $td.eq(0).click();

      $(document).trigger($.Event('keydown', { keyCode: 40 }));
      expect($tr.eq(0).hasClass('row-selected')).toEqual(false);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(true);

      $(document).trigger($.Event('keydown', { keyCode: 38 }));
      expect($tr.eq(0).hasClass('row-selected')).toEqual(true);
      expect($tr.eq(1).hasClass('row-selected')).toEqual(false);
    });
  });

  describe('callbacks', function() {
    var $table, $tr, $td;
    var $message;

    beforeEach(function() {
      $table = $('#callbacks');
      $tr = $table.find('tr:has(td)');
      $td = $tr.find('td:last');
      $message = $('#message');
    });

    it('runs callbacks', function() {
      $td.eq(0).click();
      $td.eq(1).click();
      expect($message.text()).toContain('unselected: 1');
      expect($message.text()).toContain('selected: 2');
    });
  });
});
