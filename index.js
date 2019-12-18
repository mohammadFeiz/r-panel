"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _rSlider = _interopRequireDefault(require("r-range-slider"));

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

var RPanelContext = (0, _react.createContext)();

var RPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(RPanel, _Component);

  function RPanel(props) {
    var _this;

    _classCallCheck(this, RPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RPanel).call(this, props));
    _this.touch = 'ontouchstart' in document.documentElement;
    var _this$props = _this.props,
        _this$props$opened = _this$props.opened,
        opened = _this$props$opened === void 0 ? false : _this$props$opened,
        model = _this$props.model; //this.state = {};

    _this.dom = (0, _react.createRef)();
    _this.errors = [];
    return _this;
  }

  _createClass(RPanel, [{
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

      var _this$props2 = this.props,
          backdrop = _this$props2.backdrop,
          items = _this$props2.items,
          _this$props2$title = _this$props2.title,
          title = _this$props2$title === void 0 ? '' : _this$props2$title,
          buttons = _this$props2.buttons,
          reset = _this$props2.reset,
          style = _this$props2.style,
          backdropClose = _this$props2.backdropClose,
          rowStyle = _this$props2.rowStyle;
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
      return _react.default.createElement(RPanelContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: 'r-panel',
        ref: this.dom,
        style: style
      }, backdrop && _react.default.createElement("div", {
        className: "r-panel-backdrop",
        onClick: function onClick() {
          if (backdropClose) {
            _this2.close();
          }
        }
      }), title && _react.default.createElement(RPanelHeader, null), _react.default.createElement(RPanelBody, null), _react.default.createElement(RPanelFooter, null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state === null) {
        //اولین فراخوانی
        return {
          model: props.model,
          prevModel: JSON.stringify(props.model),
          initModel: props.model,
          opened: props.opened,
          prevOpened: props.opened
        };
      } else {
        var change = {};
        var changed = false;

        if (JSON.stringify(props.model) !== state.prevModel) {
          change.model = props.model;
          change.prevModel = JSOn.stringify(props.model);
          change.initModel = props.model;
          changed = true;
        }

        if (state.opened !== state.prevOpened) {
          //اگر تغییر باز بودن از داخل آمد
          change.opened = state.opened;
          change.prevOpened = state.opened;
          changed = true;
        } else if (props.opened !== state.prevModel) {
          //اگر تغییر باز بودن از خارج آمد
          change.opened = props.opened;
          change.prevOpened = props.opened;
          changed = true;
        }

        if (changed) {
          return change;
        }
      }

      return null;
    }
  }]);

  return RPanel;
}(_react.Component);

exports.default = RPanel;
RPanel.defaultProps = {
  items: [],
  buttons: [],
  width: '300px',
  alignX: 'center'
};

var RPanelBody =
/*#__PURE__*/
function (_Component2) {
  _inherits(RPanelBody, _Component2);

  function RPanelBody() {
    _classCallCheck(this, RPanelBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelBody).apply(this, arguments));
  }

  _createClass(RPanelBody, [{
    key: "render",
    value: function render() {
      var items = this.context.items;
      var Items = items.map(function (item, i) {
        return _react.default.createElement(RPanelItem, {
          item: item,
          key: i
        });
      });
      return _react.default.createElement("div", {
        className: "r-panel-body"
      }, _react.default.createElement("div", {
        className: "r-panel-body-container"
      }, Items));
    }
  }]);

  return RPanelBody;
}(_react.Component);

_defineProperty(RPanelBody, "contextType", RPanelContext);

var RPanelItem =
/*#__PURE__*/
function (_Component3) {
  _inherits(RPanelItem, _Component3);

  function RPanelItem() {
    _classCallCheck(this, RPanelItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItem).apply(this, arguments));
  }

  _createClass(RPanelItem, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          item = _this$props3.item,
          _this$props3$level = _this$props3.level,
          level = _this$props3$level === void 0 ? 0 : _this$props3$level;
      var _item$opened2 = item.opened,
          opened = _item$opened2 === void 0 ? true : _item$opened2;
      return _react.default.createElement(_react.Fragment, null, item.group && _react.default.createElement(_react.Fragment, null, _react.default.createElement(RPanelGroup, {
        item: item,
        level: level
      }), opened && item.group.map(function (itm, i) {
        return _react.default.createElement(RPanelItem, {
          item: itm,
          level: level + 1,
          key: i
        });
      })), !item.group && _react.default.createElement(RPanelControl, {
        item: item,
        level: level
      }));
    }
  }]);

  return RPanelItem;
}(_react.Component);

var RPanelControl =
/*#__PURE__*/
function (_Component4) {
  _inherits(RPanelControl, _Component4);

  function RPanelControl() {
    _classCallCheck(this, RPanelControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelControl).apply(this, arguments));
  }

  _createClass(RPanelControl, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props4 = this.props,
          level = _this$props4.level,
          item = _this$props4.item;
      var _this$context$rowStyl = this.context.rowStyle,
          rowStyle = _this$context$rowStyl === void 0 ? {} : _this$context$rowStyl;
      var style = rowStyle;
      style.paddingLeft = level ? level * 24 + 'px' : undefined;
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
        control = _react.default.createElement(RPanelRangeSlider, {
          item: item,
          model: model
        });
      } else if (item.range) {
        control = _react.default.createElement(RPanelSlider, {
          item: item,
          value: value
        });
      } else if (item.buttons && item.buttons.length) {
        control = _react.default.createElement(RPanelGroupButton, {
          item: item,
          value: value
        });
      } else if (item.options && item.options.length) {
        control = _react.default.createElement(RPanelSelect, {
          item: item,
          value: value
        });
      } else if (typeof value === 'string') {
        control = _react.default.createElement(RPanelTextbox, {
          item: item,
          value: value
        });
      } else if (typeof value === 'number') {
        control = _react.default.createElement(RPanelNumberbox, {
          item: item,
          value: value
        });
      } else if (typeof value === 'boolean') {
        control = _react.default.createElement(RPanelCheckbox, {
          item: item,
          value: value
        });
      } else if (item.info || item.warning || item.danger) {
        control = _react.default.createElement(RPanelAlert, {
          item: item
        });
      } else if (item.text && item.href) {
        control = _react.default.createElement(RPanelLink, {
          item: item
        });
      } else if (item.text) {
        control = _react.default.createElement(RPanelList, {
          item: item
        });
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "r-panel-item",
        style: this.getStyle(),
        onClick: function onClick() {
          if (item.callback) {
            item.callback(item);
          }
        }
      }, iconClass && _react.default.createElement("div", {
        className: "icon ".concat(iconClass)
      }), item.title && _react.default.createElement(RPanelItemTitle, {
        item: item
      }), control), validationState && validationState.state === false && _react.default.createElement("div", {
        className: "r-panel-item",
        style: this.getStyle()
      }, _react.default.createElement(RPanelAlert, {
        item: validationState
      })));
    }
  }]);

  return RPanelControl;
}(_react.Component);

_defineProperty(RPanelControl, "contextType", RPanelContext);

var RPanelGroup =
/*#__PURE__*/
function (_Component5) {
  _inherits(RPanelGroup, _Component5);

  function RPanelGroup() {
    _classCallCheck(this, RPanelGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelGroup).apply(this, arguments));
  }

  _createClass(RPanelGroup, [{
    key: "getStyle",
    value: function getStyle() {
      var level = this.props.level;
      var style = {};
      style.paddingLeft = level ? level * 24 + 'px' : undefined;
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
        if ((0, _jquery.default)(e.target).hasClass('r-panel-collapse')) {
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
        className: "r-panel-item r-panel-group",
        style: this.getStyle(),
        onClick: this.click.bind(this)
      }, _react.default.createElement("div", {
        className: "r-panel-collapse ".concat(opened ? 'opened' : 'closed')
      }), iconClass && _react.default.createElement("div", {
        className: "icon ".concat(iconClass)
      }), _react.default.createElement("div", {
        className: "r-panel-group-name"
      }, item.title));
    }
  }]);

  return RPanelGroup;
}(_react.Component);

_defineProperty(RPanelGroup, "contextType", RPanelContext);

var RPanelItemTitle =
/*#__PURE__*/
function (_Component6) {
  _inherits(RPanelItemTitle, _Component6);

  function RPanelItemTitle() {
    _classCallCheck(this, RPanelItemTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItemTitle).apply(this, arguments));
  }

  _createClass(RPanelItemTitle, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      return _react.default.createElement("div", {
        className: "r-panel-item-title"
      }, item.title || item.field);
    }
  }]);

  return RPanelItemTitle;
}(_react.Component);

_defineProperty(RPanelItemTitle, "contextType", RPanelContext);

var RPanelList =
/*#__PURE__*/
function (_Component7) {
  _inherits(RPanelList, _Component7);

  function RPanelList() {
    _classCallCheck(this, RPanelList);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelList).apply(this, arguments));
  }

  _createClass(RPanelList, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var text = item.text;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-list"
      }, text);
    }
  }]);

  return RPanelList;
}(_react.Component);

var RPanelLink =
/*#__PURE__*/
function (_Component8) {
  _inherits(RPanelLink, _Component8);

  function RPanelLink() {
    _classCallCheck(this, RPanelLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelLink).apply(this, arguments));
  }

  _createClass(RPanelLink, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var text = item.text,
          href = item.href;
      return _react.default.createElement("a", {
        className: "r-panel-control r-panel-list",
        href: href
      }, text);
    }
  }]);

  return RPanelLink;
}(_react.Component);

var RPanelSlider =
/*#__PURE__*/
function (_Component9) {
  _inherits(RPanelSlider, _Component9);

  function RPanelSlider() {
    _classCallCheck(this, RPanelSlider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelSlider).apply(this, arguments));
  }

  _createClass(RPanelSlider, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          item = _this$props5.item,
          value = _this$props5.value;
      var _onchange = this.context.onchange;
      return _react.default.createElement(_rSlider.default, {
        className: "r-panel-control r-panel-slider",
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

  return RPanelSlider;
}(_react.Component);

_defineProperty(RPanelSlider, "contextType", RPanelContext);

var RPanelRangeSlider =
/*#__PURE__*/
function (_Component10) {
  _inherits(RPanelRangeSlider, _Component10);

  function RPanelRangeSlider() {
    _classCallCheck(this, RPanelRangeSlider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelRangeSlider).apply(this, arguments));
  }

  _createClass(RPanelRangeSlider, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          item = _this$props6.item,
          model = _this$props6.model;
      var _onchange2 = this.context.onchange;
      var value1 = getValueByField(model, item.field1);
      var value2 = getValueByField(model, item.field2);
      return _react.default.createElement(_rSlider.default, {
        className: "r-panel-control r-panel-slider r-panel-range-slider",
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

  return RPanelRangeSlider;
}(_react.Component);

_defineProperty(RPanelRangeSlider, "contextType", RPanelContext);

var RPanelGroupButton =
/*#__PURE__*/
function (_Component11) {
  _inherits(RPanelGroupButton, _Component11);

  function RPanelGroupButton() {
    _classCallCheck(this, RPanelGroupButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelGroupButton).apply(this, arguments));
  }

  _createClass(RPanelGroupButton, [{
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          item = _this$props7.item,
          value = _this$props7.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-group-button"
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

  return RPanelGroupButton;
}(_react.Component);

_defineProperty(RPanelGroupButton, "contextType", RPanelContext);

var RPanelSelect =
/*#__PURE__*/
function (_Component12) {
  _inherits(RPanelSelect, _Component12);

  function RPanelSelect() {
    _classCallCheck(this, RPanelSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelSelect).apply(this, arguments));
  }

  _createClass(RPanelSelect, [{
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          item = _this$props8.item,
          value = _this$props8.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("select", {
        className: "r-panel-control r-panel-select",
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

  return RPanelSelect;
}(_react.Component);

_defineProperty(RPanelSelect, "contextType", RPanelContext);

var RPanelTextbox =
/*#__PURE__*/
function (_Component13) {
  _inherits(RPanelTextbox, _Component13);

  function RPanelTextbox() {
    _classCallCheck(this, RPanelTextbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelTextbox).apply(this, arguments));
  }

  _createClass(RPanelTextbox, [{
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          item = _this$props9.item,
          value = _this$props9.value;
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
        className: "r-panel-control r-panel-textbox",
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

  return RPanelTextbox;
}(_react.Component);

_defineProperty(RPanelTextbox, "contextType", RPanelContext);

var RPanelNumberbox =
/*#__PURE__*/
function (_Component14) {
  _inherits(RPanelNumberbox, _Component14);

  function RPanelNumberbox() {
    _classCallCheck(this, RPanelNumberbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelNumberbox).apply(this, arguments));
  }

  _createClass(RPanelNumberbox, [{
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          item = _this$props10.item,
          value = _this$props10.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("input", _extends({}, item, {
        type: "number",
        className: "r-panel-control r-panel-textbox r-panel-numberbox",
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

  return RPanelNumberbox;
}(_react.Component);

_defineProperty(RPanelNumberbox, "contextType", RPanelContext);

var RPanelCheckbox =
/*#__PURE__*/
function (_Component15) {
  _inherits(RPanelCheckbox, _Component15);

  function RPanelCheckbox() {
    _classCallCheck(this, RPanelCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelCheckbox).apply(this, arguments));
  }

  _createClass(RPanelCheckbox, [{
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          item = _this$props11.item,
          value = _this$props11.value;
      var onchange = this.context.onchange;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-checkbox"
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

  return RPanelCheckbox;
}(_react.Component);

_defineProperty(RPanelCheckbox, "contextType", RPanelContext);

var RPanelAlert =
/*#__PURE__*/
function (_Component16) {
  _inherits(RPanelAlert, _Component16);

  function RPanelAlert() {
    _classCallCheck(this, RPanelAlert);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelAlert).apply(this, arguments));
  }

  _createClass(RPanelAlert, [{
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
        className: "r-panel-control r-panel-alert ".concat(type)
      }, message);
    }
  }]);

  return RPanelAlert;
}(_react.Component);

_defineProperty(RPanelAlert, "contextType", RPanelContext);

var RPanelHeader =
/*#__PURE__*/
function (_Component17) {
  _inherits(RPanelHeader, _Component17);

  function RPanelHeader() {
    _classCallCheck(this, RPanelHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelHeader).apply(this, arguments));
  }

  _createClass(RPanelHeader, [{
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
        className: 'r-panel-header'
      }, touch ? 'onTouchStart' : 'onMouseDown', mousedown);

      return _react.default.createElement("div", props, _react.default.createElement("div", {
        className: "r-panel-title"
      }, title), _react.default.createElement("div", {
        className: "r-panel-close",
        onClick: close
      }));
    }
  }]);

  return RPanelHeader;
}(_react.Component);

_defineProperty(RPanelHeader, "contextType", RPanelContext);

var RPanelFooter =
/*#__PURE__*/
function (_Component18) {
  _inherits(RPanelFooter, _Component18);

  function RPanelFooter() {
    _classCallCheck(this, RPanelFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelFooter).apply(this, arguments));
  }

  _createClass(RPanelFooter, [{
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
        className: "r-panel-footer"
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

  return RPanelFooter;
}(_react.Component);

_defineProperty(RPanelFooter, "contextType", RPanelContext);