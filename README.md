# jquery-simple-select-table

A jquery plugin for table with selectable rows and checkboxes.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-select-table --save

## Usage

Build html as follows:

```html
<table>
  <tr>
    <th><input type="checkbox"></th>
    <th>header</th>
  </tr>
  <tr>
    <td><input type="checkbox"></td>
    <td>1</td>
  </tr>
  <tr>
    <td><input type="checkbox"></td>
    <td>2</td>
  </tr>
  <tr>
    <td><input type="checkbox"></td>
    <td>3</td>
  </tr>
</table>
```

Then run:

```javascript
$('table').simpleSelectTable();
```

### Options

Selector options:

```javascript
$('table').simpleSelectTable({
  headCheckbox: 'th :checkbox',
  dataCheckbox: 'td :checkbox',
  rowSelector: 'td'
});
```

Feature options:

```javascript
$('table').simpleSelectTable({
  useShiftClick: true,
  useCtrlClick: true,
  useUpDownKey: true
});
```

### Callbacks

```javascript
$('table').simpleSelectTable({
  ...
}).on('row:selected', function(e, $row) {
  ...
}).on('row:unselected', function(e, $row) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
