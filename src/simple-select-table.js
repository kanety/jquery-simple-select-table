import $ from 'jquery';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  headCheckbox: 'th :checkbox',
  dataCheckbox: 'td :checkbox',
  rowSelector: 'td:not(:has(:checkbox))',
  useShiftClick: true,
  useCtrlClick: true,
  useUpDownKey: true
};

export default class SimpleSelectTable {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$table = $(element);
    this.$document = $(document);
    this.$current = null;

    this.uid = new Date().getTime() + Math.random();
    this.active = false;
    this.disableUserSelect = false;

    this.init();
  }

  init() {
    this.$table.addClass(NAMESPACE);

    this.unbind();
    this.bind();
  }

  bind() {
    if (this.options.headCheckbox) {
      this.$table.on('click.${NAMESPACE}', this.options.headCheckbox, (e) => {
        this.setChecked($(e.currentTarget).prop('checked'));
      });
    }

    if (this.options.rowSelector) {
      this.$table.on(`click.${NAMESPACE}`, this.options.rowSelector, (e) => {
        let shift = this.options.useShiftClick && e.shiftKey;
        let ctrl = this.options.useCtrlClick && e.ctrlKey;
        this.click($(e.currentTarget).closest('tr'), shift, ctrl);
      });
    }

    if (this.options.useShiftClick || this.options.useCtrlClick) {
      this.$table.on(`mousedown.${NAMESPACE}`, (e) => {
        if (e.ctrlKey || e.shiftKey) {
          this.disableUserSelect = true;
          this.$table.addClass('user-select-none');
        }
      }).on(`mouseup.${NAMESPACE}`, (e) => {
        if (e.ctrlKey || e.shiftKey) {
          this.disableUserSelect = false;
          this.$table.removeClass('user-select-none');
        }
      }).on(`selectstart.${NAMESPACE}`, (e) => {
        if (this.disableUserSelect) {
          return false;
        } else {
          return true;
        }
      });
    }

    if (this.options.useUpDownKey) {
      this.$document.on(`click.${NAMESPACE}-${this.uid}`, (e) => {
        if ($.contains(this.$table[0], e.target)) {
          this.active = true;
        } else {
          this.active = false;
        }
      }).on(`keydown.${NAMESPACE}-${this.uid}`, (e) => {
        if (this.active) {
          this.keydown(e.keyCode);
        }
      });
    }
  }

  unbind() {
    this.$table.off(`.${NAMESPACE}`);
    this.$document.on(`click.${NAMESPACE}-${this.uid}`);
  }

  checkboxes($row) {
    return this.$table.find(this.options.dataCheckbox).filter(':enabled');
  }

  checkboxAt($row) {
    return $row.find(this.options.dataCheckbox).filter(':enabled');
  }

  click($next, shift = false, ctrl = false) {
    let $curr = this.$table.find('tr.row-selected')

    if (shift && $curr.length) {
      this.setChecked(false);
      this.checkBetween($curr, $next);
    } else if (ctrl) {
      this.toggleCheck($next);
    } else {
      this.move($curr, $next);
    }
  }

  move($curr, $next) {
    this.unselect($curr);
    this.select($next);
    this.setChecked(false);
    this.check($next);
  }

  select($row) {
    if ($row.length) {
      this.$current = $row;
      $row.addClass('row-selected');
      this.$table.trigger('row:selected', [$row]);
    }
  }

  unselect($row) {
    if ($row.length) {
      $row.removeClass('row-selected');
      this.$table.trigger('row:unselected', [$row]);
      this.$current = null;
    }
  }

  check($row) {
    this.checkboxAt($row).prop('checked', true);
  }

  toggleCheck($row) {
    let $cb = this.checkboxAt($row);
    $cb.prop('checked', !$cb.prop('checked'));
  }

  checkBetween($row1, $row2) {
    let $rows = this.$table.find('tr');
    let n1 = $rows.index($row1);
    let n2 = $rows.index($row2);

    if (n1 > n2) {
      [n1, n2] = [n2, n1];
    }

    $rows.slice(n1, n2 + 1).each((i, row) => {
      this.checkboxAt($(row)).prop('checked', true);
    });
  }

  setChecked(checked) {
    this.checkboxes().prop('checked', checked);
  }

  keydown(keycode) {
    switch (keycode) {
    case 38:
      this.up();
      break;
    case 40:
      this.down();
      break;
    }
  }

  up() {
    let $prev = this.$current.prev(':has(td)');
    if ($prev.length) {
      this.move(this.$current, $prev);
    }
  }

  down() {
    let $next = this.$current.next(':has(td)');
    if ($next.length) {
      this.move(this.$current, $next);
    }
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, options);
  }
}