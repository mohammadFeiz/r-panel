"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _rSlider = _interopRequireDefault(require("@mohamadfeiz/r-slider"));

var _jquery = _interopRequireDefault(require("jquery"));

var _rActions = _interopRequireDefault(require("r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ref = new _rActions.default(),
    getValueByField = _ref.getValueByField,
    setValueByField = _ref.setValueByField,
    eventHandler = _ref.eventHandler,
    getClient = _ref.getClient;

var RSettingContext = (0, _react.createContext)();

var RSetting =
/*#__PURE__*/
function (_Component) {
  _inherits(RSetting, _Component);

  function RSetting(props) {
    var _this;

    _classCallCheck(this, RSetting);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RSetting).call(this, props));
    _this.touch = 'ontouchstart' in document.documentElement;
    var _this$props$opened = _this.props.opened,
        opened = _this$props$opened === void 0 ? false : _this$props$opened;
    _this.state = {
      opened: opened
    };
    _this.dom = (0, _react.createRef)();
    _this.errors = [];
    return _this;
  }

  _createClass(RSetting, [{
    key: "close",
    value: function close() {
      this.setState({
        opened: false,
        prevModel: undefined,
        initModel: undefined
      });
    }
  }, {
    key: "toggle",
    value: function toggle(item) {
      var items = this.props.items;
      var _item$opened = item.opened,
          opened = _item$opened === void 0 ? true : _item$opened;
      item.opened = !opened;
      this.setState({
        items: items
      });
    }
  }, {
    key: "buttonClick",
    value: function buttonClick(_ref2) {
      var callback = _ref2.callback,
          close = _ref2.close;

      if (callback) {
        callback(this.state.model);
      }

      if (close === true) {
        this.close();
      }
    }
  }, {
    key: "resetCallback",
    value: function resetCallback() {
      var onchange = this.props.onchange;
      var initModel = this.state.initModel;

      if (onchange) {
        onchange(initModel);
      } else {
        this.setState({
          model: initModel
        });
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      if (!this.props.movable) {
        return;
      }

      var dom = (0, _jquery.default)(this.dom.current);
      this.startOffset = {
        client: getClient(e),
        offset: dom.offset(),
        dom: dom
      };
      eventHandler('window', 'mousemove', _jquery.default.proxy(this.mousemove, this));
      eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseup, this));
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      var _this$startOffset = this.startOffset,
          dom = _this$startOffset.dom,
          client = _this$startOffset.client,
          offset = _this$startOffset.offset;
      var CLIENT = getClient(e);
      dom.css({
        left: offset.left + (CLIENT.x - client.x),
        top: offset.top + (CLIENT.y - client.y)
      });
    }
  }, {
    key: "mouseup",
    value: function mouseup() {
      eventHandler('window', 'mousemove', this.mousemove, 'unbind');
      eventHandler('window', 'mouseup', this.mouseup, 'unbind');
    }
  }, {
    key: "onchange",
    value: function onchange(obj) {
      var onchange = this.props.onchange;
      var model = this.state.model;
      model = JSON.parse(JSON.stringify(model));

      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          setValueByField(model, obj[i].field, obj[i].value);
        }
      } else {
        setValueByField(model, obj.field, obj.value);
      }

      if (onchange) {
        onchange(model);
      } else {
        this.setState({
          model: model
        });
      }
    }
  }, {
    key: "validate",
    value: function validate(item, value) {
      if (item.validation) {
        return item.validation(value) || {};
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          opened = _this$state.opened,
          model = _this$state.model;

      if (opened !== true) {
        return '';
      }

      var _this$props = this.props,
          backdrop = _this$props.backdrop,
          items = _this$props.items,
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? '' : _this$props$title,
          buttons = _this$props.buttons,
          reset = _this$props.reset,
          style = _this$props.style,
          backdropClose = _this$props.backdropClose,
          rowStyle = _this$props.rowStyle;
      var contextValue = {
        close: this.close.bind(this),
        toggle: this.toggle.bind(this),
        buttonClick: this.buttonClick.bind(this),
        resetCallback: this.resetCallback.bind(this),
        onchange: this.onchange.bind(this),
        validate: this.validate.bind(this),
        mousedown: this.mousedown.bind(this),
        touch: this.touch,
        reset: reset,
        buttons: buttons,
        items: items,
        model: model,
        title: title,
        rowStyle: rowStyle
      };
      return _react.default.createElement(RSettingContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: 'r-setting',
        ref: this.dom,
        style: style
      }, backdrop && _react.default.createElement("div", {
        className: "r-setting-backdrop",
        onClick: function onClick() {
          if (backdropClose) {
            _this2.close();
          }
        }
      }), _react.default.createElement(RSettingHeader, null), _react.default.createElement(RSettingBody, null), _react.default.createElement(RSettingFooter, null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      //در این کامپوننت مدل پروپس فقط از بیرون می تواند تغییر کند
      if (JSON.stringify(props.model) !== state.prevModel) {
        // اگر مدل پروپس از بیرون ارسال شد
        return {
          model: props.model,
          prevModel: JSON.stringify(props.model),
          initModel: state.initModel || props.model
        };
      }

      if (props.opened !== state.opened) {
        return {
          opened: props.opened
        };
      }

      return null;
    }
  }]);

  return RSetting;
}(_react.Component);

exports.default = RSetting;
RSetting.defaultProps = {
  items: [],
  buttons: [],
  width: '300px',
  alignX: 'center'
};

var RSettingBody =
/*#__PURE__*/
function (_Component2) {
  _inherits(RSettingBody, _Component2);

  function RSettingBody() {
    _classCallCheck(this, RSettingBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingBody).apply(this, arguments));
  }

  _createClass(RSettingBody, [{
    key: "render",
    value: function render() {
      var items = this.context.items;
      var Items = items.map(function (item, i) {
        return _react.default.createElement(RSettingItem, {
          item: item,
          key: i
        });
      });
      return _react.default.createElement("div", {
        className: "r-setting-body"
      }, Items);
    }
  }]);

  return RSettingBody;
}(_react.Component);

_defineProperty(RSettingBody, "contextType", RSettingContext);

var RSettingItem =
/*#__PURE__*/
function (_Component3) {
  _inherits(RSettingItem, _Component3);

  function RSettingItem() {
    _classCallCheck(this, RSettingItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingItem).apply(this, arguments));
  }

  _createClass(RSettingItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          item = _this$props2.item,
          _this$props2$level = _this$props2.level,
          level = _this$props2$level === void 0 ? 0 : _this$props2$level;
      var _item$opened2 = item.opened,
          opened = _item$opened2 === void 0 ? true : _item$opened2;
      return _react.default.createElement(_react.Fragment, null, item.group && _react.default.createElement(_react.Fragment, null, _react.default.createElement(RSettingGroup, {
        item: item,
        level: level
      }), opened && item.group.map(function (itm, i) {
        return _react.default.createElement(RSettingItem, {
          item: itm,
          level: level + 1,
          key: i
        });
      })), !item.group && _react.default.createElement(RSettingControl, {
        item: item,
        level: level
      }));
    }
  }]);

  return RSettingItem;
}(_react.Component);

var RSettingControl =
/*#__PURE__*/
function (_Component4) {
  _inherits(RSettingControl, _Component4);

  function RSettingControl() {
    _classCallCheck(this, RSettingControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingControl).apply(this, arguments));
  }

  _createClass(RSettingControl, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props3 = this.props,
          level = _this$props3.level,
          item = _this$props3.item;
      var _this$context$rowStyl = this.context.rowStyle,
          rowStyle = _this$context$rowStyl === void 0 ? {} : _this$context$rowStyl;
      var style = rowStyle;
      style.paddingLeft = level * 16 + (item.group ? 0 : 24) + 'px';
      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context = this.context,
          model = _this$context.model,
          validate = _this$context.validate;
      var item = this.props.item;
      var iconClass = item.iconClass;
      var value = getValueByField(model, item.field);
      var validationState = validate(item, value);
      var control;

      if (item.range && item.field1 && item.field2) {
        control = _react.default.createElement(RSettingRangeSlider, {
          item: item,
          model: model
        });
      } else if (item.range) {
        control = _react.default.createElement(RSettingSlider, {
          item: item,
          value: value
        });
      } else if (item.buttons && item.buttons.length) {
        control = _react.default.createElement(RSettingGroupButton, {
          item: item,
          value: value
        });
      } else if (item.options && item.options.length) {
        control = _react.default.createElement(RSettingSelect, {
          item: item,
          value: value
        });
      } else if (typeof value === 'string') {
        control = _react.default.createElement(RSettingTextbox, {
          item: item,
          value: value
        });
      } else if (typeof value === 'number') {
        control = _react.default.createElement(RSettingNumberbox, {
          item: item,
          value: value
        });
      } else if (typeof value === 'boolean') {
        control = _react.default.createElement(RSettingCheckbox, {
          item: item,
          value: value
        });
      } else if (item.info || item.warning || item.danger) {
        control = _react.default.createElement(RSettingAlert, {
          item: item
        });
      } else if (item.text && item.href) {
        control = _react.default.createElement(RSettingLink, {
          item: item
        });
      } else if (item.text) {
        control = _react.default.createElement(RSettingList, {
          item: item
        });
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "r-setting-item",
        style: this.getStyle(),
        onClick: function onClick() {
          if (item.callback) {
            item.callback(item);
          }
        }
      }, iconClass && _react.default.createElement("div", {
        className: "icon ".concat(iconClass)
      }), item.title && _react.default.createElement(RSettingItemTitle, {
        item: item
      }), control), validationState && validationState.state === false && _react.default.createElement("div", {
        className: "r-setting-item",
        style: this.getStyle()
      }, _react.default.createElement(RSettingAlert, {
        item: validationState
      })));
    }
  }]);

  return RSettingControl;
}(_react.Component);

_defineProperty(RSettingControl, "contextType", RSettingContext);

var RSettingGroup =
/*#__PURE__*/
function (_Component5) {
  _inherits(RSettingGroup, _Component5);

  function RSettingGroup() {
    _classCallCheck(this, RSettingGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingGroup).apply(this, arguments));
  }

  _createClass(RSettingGroup, [{
    key: "getStyle",
    value: function getStyle() {
      var level = this.props.level;
      var style = {
        paddingLeft: level * 16 + 'px'
      };
      return style;
    }
  }, {
    key: "click",
    value: function click(e) {
      var toggle = this.context.toggle;
      var item = this.props.item;

      if (!item.callback) {
        toggle(item);
      } else {
        if ((0, _jquery.default)(e.target).hasClass('r-setting-collapse')) {
          toggle(item);
        } else {
          item.callback(item);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var _item$opened3 = item.opened,
          opened = _item$opened3 === void 0 ? true : _item$opened3,
          iconClass = item.iconClass;
      return _react.default.createElement("div", {
        className: "r-setting-item r-setting-group",
        style: this.getStyle(),
        onClick: this.click.bind(this)
      }, _react.default.createElement("div", {
        className: "r-setting-collapse ".concat(opened ? 'opened' : 'closed')
      }), iconClass && _react.default.createElement("div", {
        className: "icon ".concat(iconClass)
      }), _react.default.createElement("div", {
        className: "r-setting-group-name"
      }, item.title));
    }
  }]);

  return RSettingGroup;
}(_react.Component);

_defineProperty(RSettingGroup, "contextType", RSettingContext);

var RSettingItemTitle =
/*#__PURE__*/
function (_Component6) {
  _inherits(RSettingItemTitle, _Component6);

  function RSettingItemTitle() {
    _classCallCheck(this, RSettingItemTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingItemTitle).apply(this, arguments));
  }

  _createClass(RSettingItemTitle, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      return _react.default.createElement("div", {
        className: "r-setting-item-title"
      }, item.title || item.field);
    }
  }]);

  return RSettingItemTitle;
}(_react.Component);

_defineProperty(RSettingItemTitle, "contextType", RSettingContext);

var RSettingList =
/*#__PURE__*/
function (_Component7) {
  _inherits(RSettingList, _Component7);

  function RSettingList() {
    _classCallCheck(this, RSettingList);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingList).apply(this, arguments));
  }

  _createClass(RSettingList, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var text = item.text;
      return _react.default.createElement("div", {
        className: "r-setting-control r-setting-list"
      }, text);
    }
  }]);

  return RSettingList;
}(_react.Component);

var RSettingLink =
/*#__PURE__*/
function (_Component8) {
  _inherits(RSettingLink, _Component8);

  function RSettingLink() {
    _classCallCheck(this, RSettingLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingLink).apply(this, arguments));
  }

  _createClass(RSettingLink, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var text = item.text,
          href = item.href;
      return _react.default.createElement("a", {
        className: "r-setting-control r-setting-list",
        href: href
      }, text);
    }
  }]);

  return RSettingLink;
}(_react.Component);

var RSettingSlider =
/*#__PURE__*/
function (_Component9) {
  _inherits(RSettingSlider, _Component9);

  function RSettingSlider() {
    _classCallCheck(this, RSettingSlider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingSlider).apply(this, arguments));
  }

  _createClass(RSettingSlider, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          item = _this$props4.item,
          value = _this$props4.value;
      var _onchange = this.context.onchange;
      return _react.default.createElement(_rSlider.default, {
        className: "r-setting-control r-setting-slider",
        points: [{
          value: value
        }],
        showValue: "fix",
        start: item.range[0],
        end: item.range[1],
        step: item.step,
        min: item.min,
        max: item.max,
        onchange: function onchange(obj) {
          _onchange({
            field: item.field,
            value: obj.points[0].value
          });
        }
      });
    }
  }]);

  return RSettingSlider;
}(_react.Component);

_defineProperty(RSettingSlider, "contextType", RSettingContext);

var RSettingRangeSlider =
/*#__PURE__*/
function (_Component10) {
  _inherits(RSettingRangeSlider, _Component10);

  function RSettingRangeSlider() {
    _classCallCheck(this, RSettingRangeSlider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingRangeSlider).apply(this, arguments));
  }

  _createClass(RSettingRangeSlider, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          item = _this$props5.item,
          model = _this$props5.model;
      var _onchange2 = this.context.onchange;
      var value1 = getValueByField(model, item.field1);
      var value2 = getValueByField(model, item.field2);
      return _react.default.createElement(_rSlider.default, {
        className: "r-setting-control r-setting-slider r-setting-range-slider",
        points: [{
          value: value1
        }, {
          value: value2
        }],
        point_width: 30,
        point_height: 20,
        thickness: 2,
        showValue: "fix",
        start: item.range[0],
        end: item.range[1],
        step: item.step,
        min: item.min,
        max: item.max,
        onchange: function onchange(obj) {
          _onchange2([{
            field: item.field1,
            value: obj.points[0].value
          }, {
            field: item.field2,
            value: obj.points[1].value
          }]);
        }
      });
    }
  }]);

  return RSettingRangeSlider;
}(_react.Component);

_defineProperty(RSettingRangeSlider, "contextType", RSettingContext);

var RSettingGroupButton =
/*#__PURE__*/
function (_Component11) {
  _inherits(RSettingGroupButton, _Component11);

  function RSettingGroupButton() {
    _classCallCheck(this, RSettingGroupButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingGroupButton).apply(this, arguments));
  }

  _createClass(RSettingGroupButton, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          item = _this$props6.item,
          value = _this$props6.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("div", {
        className: "r-setting-control r-setting-group-button"
      }, item.buttons.map(function (btn, i) {
        return _react.default.createElement("button", {
          key: i,
          className: value === btn.value ? 'active' : undefined,
          onClick: function onClick() {
            onchange({
              field: item.field,
              value: btn.value
            });
          }
        }, btn.text);
      }));
    }
  }]);

  return RSettingGroupButton;
}(_react.Component);

_defineProperty(RSettingGroupButton, "contextType", RSettingContext);

var RSettingSelect =
/*#__PURE__*/
function (_Component12) {
  _inherits(RSettingSelect, _Component12);

  function RSettingSelect() {
    _classCallCheck(this, RSettingSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingSelect).apply(this, arguments));
  }

  _createClass(RSettingSelect, [{
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          item = _this$props7.item,
          value = _this$props7.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("select", {
        className: "r-setting-control r-setting-select",
        value: value,
        onChange: function onChange(e) {
          onchange({
            field: item.field,
            value: e.target.value
          });
        }
      }, item.options.map(function (option, i) {
        return _react.default.createElement("option", {
          key: i,
          value: option.value
        }, option.text);
      }));
    }
  }]);

  return RSettingSelect;
}(_react.Component);

_defineProperty(RSettingSelect, "contextType", RSettingContext);

var RSettingTextbox =
/*#__PURE__*/
function (_Component13) {
  _inherits(RSettingTextbox, _Component13);

  function RSettingTextbox() {
    _classCallCheck(this, RSettingTextbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingTextbox).apply(this, arguments));
  }

  _createClass(RSettingTextbox, [{
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          item = _this$props8.item,
          value = _this$props8.value;
      var onchange = this.context.onchange;
      var list, listId;

      if (item.list) {
        listId = 'datalist' + Math.random();
        list = _react.default.createElement("datalist", {
          id: listId
        }, item.list.map(function (l, i) {
          return _react.default.createElement("option", {
            value: l,
            key: i
          });
        }));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("input", {
        list: listId,
        disabled: item.disabled,
        maxLength: item.maxLength,
        type: "text",
        className: "r-setting-control r-setting-textbox",
        value: value,
        onChange: function onChange(e) {
          onchange({
            field: item.field,
            value: e.target.value
          });
        }
      }), list && list);
    }
  }]);

  return RSettingTextbox;
}(_react.Component);

_defineProperty(RSettingTextbox, "contextType", RSettingContext);

var RSettingNumberbox =
/*#__PURE__*/
function (_Component14) {
  _inherits(RSettingNumberbox, _Component14);

  function RSettingNumberbox() {
    _classCallCheck(this, RSettingNumberbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingNumberbox).apply(this, arguments));
  }

  _createClass(RSettingNumberbox, [{
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          item = _this$props9.item,
          value = _this$props9.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("input", _extends({}, item, {
        type: "number",
        className: "r-setting-control r-setting-textbox r-setting-numberbox",
        value: value,
        onChange: function onChange(e) {
          onchange({
            field: item.field,
            value: parseFloat(e.target.value)
          });
        }
      }));
    }
  }]);

  return RSettingNumberbox;
}(_react.Component);

_defineProperty(RSettingNumberbox, "contextType", RSettingContext);

var RSettingCheckbox =
/*#__PURE__*/
function (_Component15) {
  _inherits(RSettingCheckbox, _Component15);

  function RSettingCheckbox() {
    _classCallCheck(this, RSettingCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingCheckbox).apply(this, arguments));
  }

  _createClass(RSettingCheckbox, [{
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          item = _this$props10.item,
          value = _this$props10.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("div", {
        className: "r-setting-control r-setting-checkbox"
      }, _react.default.createElement("input", {
        type: "checkbox",
        checked: value === true,
        onChange: function onChange(e) {
          onchange({
            field: item.field,
            value: e.target.checked
          });
        }
      }));
    }
  }]);

  return RSettingCheckbox;
}(_react.Component);

_defineProperty(RSettingCheckbox, "contextType", RSettingContext);

var RSettingAlert =
/*#__PURE__*/
function (_Component16) {
  _inherits(RSettingAlert, _Component16);

  function RSettingAlert() {
    _classCallCheck(this, RSettingAlert);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingAlert).apply(this, arguments));
  }

  _createClass(RSettingAlert, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var info = item.info,
          warning = item.warning,
          danger = item.danger;
      var message, type;

      if (danger) {
        message = danger;
        type = 'danger';
      } else if (warning) {
        message = warning;
        type = 'warning';
      } else if (info) {
        message = info;
        type = 'info';
      }

      return _react.default.createElement("div", {
        className: "r-setting-control r-setting-alert ".concat(type)
      }, message);
    }
  }]);

  return RSettingAlert;
}(_react.Component);

_defineProperty(RSettingAlert, "contextType", RSettingContext);

var RSettingHeader =
/*#__PURE__*/
function (_Component17) {
  _inherits(RSettingHeader, _Component17);

  function RSettingHeader() {
    _classCallCheck(this, RSettingHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingHeader).apply(this, arguments));
  }

  _createClass(RSettingHeader, [{
    key: "render",
    value: function render() {
      var _this$context2 = this.context,
          _this$context2$title = _this$context2.title,
          title = _this$context2$title === void 0 ? null : _this$context2$title,
          close = _this$context2.close,
          mousedown = _this$context2.mousedown,
          touch = _this$context2.touch;

      if (title === null) {
        return '';
      }

      var props = _defineProperty({
        className: 'r-setting-header'
      }, touch ? 'onTouchStart' : 'onMouseDown', mousedown);

      return _react.default.createElement("div", props, _react.default.createElement("div", {
        className: "r-setting-title"
      }, title), _react.default.createElement("div", {
        className: "r-setting-close",
        onClick: close
      }));
    }
  }]);

  return RSettingHeader;
}(_react.Component);

_defineProperty(RSettingHeader, "contextType", RSettingContext);

var RSettingFooter =
/*#__PURE__*/
function (_Component18) {
  _inherits(RSettingFooter, _Component18);

  function RSettingFooter() {
    _classCallCheck(this, RSettingFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSettingFooter).apply(this, arguments));
  }

  _createClass(RSettingFooter, [{
    key: "render",
    value: function render() {
      var _this$context3 = this.context,
          _this$context3$button = _this$context3.buttons,
          buttons = _this$context3$button === void 0 ? [] : _this$context3$button,
          buttonClick = _this$context3.buttonClick,
          reset = _this$context3.reset,
          resetCallback = _this$context3.resetCallback;
      var resetBtn = reset === true ? [{
        text: 'reset',
        callback: resetCallback
      }] : [];
      var btns = resetBtn.concat(buttons);

      if (!btns.length) {
        return '';
      }

      return _react.default.createElement("div", {
        className: "r-setting-footer"
      }, btns.map(function (btn, i) {
        return _react.default.createElement("button", {
          key: i,
          onClick: function onClick() {
            buttonClick(btn);
          }
        }, btn.text);
      }));
    }
  }]);

  return RSettingFooter;
}(_react.Component);

_defineProperty(RSettingFooter, "contextType", RSettingContext);