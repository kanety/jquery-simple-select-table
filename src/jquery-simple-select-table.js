import $ from 'jquery';

import './jquery-simple-select-table.scss';
import SimpleSelectTable from './simple-select-table';
import { NAMESPACE } from './consts';

$.fn.simpleSelectTable = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      let st = new SimpleSelectTable($elem, options);
      $elem.data(NAMESPACE, st);
    }
  });
};

$.SimpleSelectTable = SimpleSelectTable;
