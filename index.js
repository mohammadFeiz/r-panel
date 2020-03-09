"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rRangeSlider = _interopRequireDefault(require("r-range-slider"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RPanelContext = (0, _react.createContext)();

var RPanel = /*#__PURE__*/function (_Component) {
  _inherits(RPanel, _Component);

  function RPanel(props) {
    var _this;

    _classCallCheck(this, RPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RPanel).call(this, props));
    _this.state = {};
    _this.dom = (0, _react.createRef)();
    _this.touch = _this.isMobile();
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
    value: function buttonClick(_ref) {
      var callback = _ref.callback,
          close = _ref.close;

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
    key: "isMobile",
    value: function isMobile() {
      return 'ontouchstart' in document.documentElement;
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bind';
      var me = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      event = this.touch ? me[event] : event;
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      element.unbind(event, action);

      if (type === 'bind') {
        element.bind(event, action);
      }
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return this.touch ? {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      if (!this.props.movable) {
        return;
      }

      var dom = (0, _jquery.default)(this.dom.current);
      this.startOffset = {
        client: this.getClient(e),
        offset: dom.offset(),
        dom: dom
      };
      this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.mousemove, this));
      this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseup, this));
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      var _this$startOffset = this.startOffset,
          dom = _this$startOffset.dom,
          client = _this$startOffset.client,
          offset = _this$startOffset.offset;
      var CLIENT = this.getClient(e);
      dom.css({
        left: offset.left + (CLIENT.x - client.x),
        top: offset.top + (CLIENT.y - client.y)
      });
    }
  }, {
    key: "mouseup",
    value: function mouseup() {
      this.eventHandler('window', 'mousemove', this.mousemove, 'unbind');
      this.eventHandler('window', 'mouseup', this.mouseup, 'unbind');
    }
  }, {
    key: "getValueByField",
    value: function getValueByField(obj, field) {
      if (!field || field === null) {
        return undefined;
      }

      var fieldString = typeof field === 'function' ? field(obj) : field;

      if (!fieldString || typeof fieldString !== 'string') {
        console.error('RGauger.getValueByField() receive invalid field');
        return undefined;
      }

      var fields = fieldString.split('.');
      var value = obj[fields[0]];

      if (value === undefined) {
        return;
      }

      for (var i = 1; i < fields.length; i++) {
        value = value[fields[i]];

        if (value === undefined || value === null) {
          return;
        }
      }

      return value;
    }
  }, {
    key: "setValueByField",
    value: function setValueByField(obj, field, value) {
      var fields = field.split('.');
      var node = obj;

      for (var i = 0; i < fields.length - 1; i++) {
        if (node[fields[i]] === undefined) {
          return;
        }

        node = node[fields[i]];
      }

      node[fields[fields.length - 1]] = value;
      return obj;
    }
  }, {
    key: "onchange",
    value: function onchange(item, value) {
      var onchange = this.props.onchange;
      var model = this.state.model;
      model = JSON.parse(JSON.stringify(model));
      var Value = item.set ? item.set(value) : value;
      this.setValueByField(model, item.field, Value);

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
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
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
          header = _this$props.header,
          _this$props$buttons = _this$props.buttons,
          buttons = _this$props$buttons === void 0 ? [] : _this$props$buttons,
          reset = _this$props.reset,
          style = _this$props.style,
          backdropClose = _this$props.backdropClose,
          rowStyle = _this$props.rowStyle,
          activeColor = _this$props.activeColor,
          controlBackground = _this$props.controlBackground,
          controlColor = _this$props.controlColor,
          textColor = _this$props.textColor,
          background = _this$props.background,
          headerStyle = _this$props.headerStyle,
          backdropStyle = _this$props.backdropStyle,
          bodyStyle = _this$props.bodyStyle,
          footerStyle = _this$props.footerStyle,
          activeReverseColor = _this$props.activeReverseColor;
      var contextValue = {
        close: this.close.bind(this),
        toggle: this.toggle.bind(this),
        buttonClick: this.buttonClick.bind(this),
        resetCallback: this.resetCallback.bind(this),
        getValueByField: this.getValueByField.bind(this),
        onchange: this.onchange.bind(this),
        validate: this.validate.bind(this),
        mousedown: this.mousedown.bind(this),
        getValue: this.getValue.bind(this),
        touch: this.touch,
        activeColor: activeColor,
        controlBackground: controlBackground,
        controlColor: controlColor,
        textColor: textColor,
        background: background,
        activeReverseColor: activeReverseColor,
        reset: reset,
        buttons: buttons,
        items: items,
        model: model,
        rowStyle: rowStyle,
        headerStyle: headerStyle,
        bodyStyle: bodyStyle,
        footerStyle: footerStyle
      };
      return _react.default.createElement(RPanelContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: 'r-panel',
        ref: this.dom,
        style: _jquery.default.extend({}, {
          color: textColor
        }, style)
      }, backdrop && _react.default.createElement("div", {
        style: backdropStyle,
        className: "r-panel-backdrop",
        onClick: function onClick() {
          if (backdropClose) {
            _this2.close();
          }
        }
      }), header && _react.default.createElement(RPanelHeader, {
        title: header.title || ''
      }), _react.default.createElement(RPanelBody, {
        items: items
      }), buttons.length > 0 && _react.default.createElement(RPanelFooter, null)));
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
          change.prevModel = JSON.stringify(props.model);
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
  controlColor: '#fff',
  alignX: 'center',
  activeReverseColor: '#fff',
  controlBackground: 'rgb(87, 92, 102)',
  activeColor: 'rgb(255, 102, 0)',
  textColor: '#fff',
  background: 'rgb(76, 82, 90)'
};

var RPanelHeader = /*#__PURE__*/function (_Component2) {
  _inherits(RPanelHeader, _Component2);

  function RPanelHeader() {
    _classCallCheck(this, RPanelHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelHeader).apply(this, arguments));
  }

  _createClass(RPanelHeader, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context = this.context,
          background = _this$context.background,
          headerStyle = _this$context.headerStyle;
      return _jquery.default.extend({}, {
        background: background
      }, headerStyle);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context2 = this.context,
          touch = _this$context2.touch,
          mousedown = _this$context2.mousedown,
          close = _this$context2.close;
      var title = this.props.title;
      return _react.default.createElement("div", _defineProperty({
        style: this.getStyle(),
        className: 'r-panel-header'
      }, touch ? 'onTouchStart' : 'onMouseDown', mousedown), _react.default.createElement("div", {
        className: "r-panel-title"
      }, title || ''), _react.default.createElement("div", {
        className: "r-panel-close",
        onClick: close
      }));
    }
  }]);

  return RPanelHeader;
}(_react.Component);

_defineProperty(RPanelHeader, "contextType", RPanelContext);

var RPanelBody = /*#__PURE__*/function (_Component3) {
  _inherits(RPanelBody, _Component3);

  function RPanelBody() {
    _classCallCheck(this, RPanelBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelBody).apply(this, arguments));
  }

  _createClass(RPanelBody, [{
    key: "getStyle",
    value: function getStyle() {
      var background = this.context.background;
      return {
        background: background
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "r-panel-body",
        style: this.getStyle()
      }, _react.default.createElement("div", {
        className: "r-panel-body-container",
        style: this.getStyle()
      }, this.props.items.map(function (item, i) {
        return _react.default.createElement(RPanelItem, {
          item: item,
          key: i
        });
      })));
    }
  }]);

  return RPanelBody;
}(_react.Component);

_defineProperty(RPanelBody, "contextType", RPanelContext);

var RPanelFooter = /*#__PURE__*/function (_Component4) {
  _inherits(RPanelFooter, _Component4);

  function RPanelFooter() {
    _classCallCheck(this, RPanelFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelFooter).apply(this, arguments));
  }

  _createClass(RPanelFooter, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context3 = this.context,
          background = _this$context3.background,
          footerStyle = _this$context3.footerStyle;
      return _jquery.default.extend({}, {
        background: background
      }, footerStyle);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context4 = this.context,
          resetCallback = _this$context4.resetCallback,
          reset = _this$context4.reset,
          buttons = _this$context4.buttons,
          buttonClick = _this$context4.buttonClick;
      var Buttons = [];

      if (reset) {
        Buttons.push({
          text: 'reset',
          callback: resetCallback
        });
      }

      Buttons = Buttons.concat(buttons);
      return _react.default.createElement("div", {
        className: "r-panel-footer",
        style: this.getStyle()
      }, Buttons.map(function (btn, i) {
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

var RPanelItem = /*#__PURE__*/function (_Component5) {
  _inherits(RPanelItem, _Component5);

  function RPanelItem() {
    _classCallCheck(this, RPanelItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItem).apply(this, arguments));
  }

  _createClass(RPanelItem, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props2 = this.props,
          _this$props2$level = _this$props2.level,
          level = _this$props2$level === void 0 ? 0 : _this$props2$level,
          item = _this$props2.item;
      var _this$context$rowStyl = this.context.rowStyle,
          rowStyle = _this$context$rowStyl === void 0 ? {} : _this$context$rowStyl;

      var style = _jquery.default.extend({}, {
        paddingLeft: level ? level * 24 + 'px' : undefined
      }, rowStyle);

      return style;
    }
  }, {
    key: "getGroup",
    value: function getGroup(item, level) {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(RPanelGroup, {
        item: item,
        level: level
      }), item.opened !== false && item.group.map(function (itm, i) {
        return _react.default.createElement(RPanelItem, {
          item: itm,
          level: level + 1,
          key: i
        });
      }));
    }
  }, {
    key: "getItem",
    value: function getItem(item, value) {
      var _this$context5 = this.context,
          getValue = _this$context5.getValue,
          validate = _this$context5.validate;
      var validationState = validate(item, value);
      var itemProps = {
        className: 'r-panel-item',
        style: this.getStyle(),
        onClick: function onClick() {
          if (item.callback) {
            item.callback(item);
          }
        }
      };
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", itemProps, item.title && _react.default.createElement(RPanelItemTitle, {
        title: getValue(item.title),
        field: getValue(item.field)
      }), _react.default.createElement(RPanelControl, {
        item: item,
        value: value
      })), validationState && validationState.state === false && _react.default.createElement("div", itemProps, _react.default.createElement(RPanelAlert, {
        item: validationState
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          item = _this$props3.item,
          _this$props3$level = _this$props3.level,
          level = _this$props3$level === void 0 ? 0 : _this$props3$level;
      var get = item.get;
      var field = typeof item.field === 'function' ? item.field() : item.field;
      var _this$context6 = this.context,
          getValueByField = _this$context6.getValueByField,
          model = _this$context6.model;
      var value = get ? get(getValueByField(model, field)) : getValueByField(model, field);
      return _react.default.createElement(_react.Fragment, null, item.group ? this.getGroup(item, level) : this.getItem(item, value));
    }
  }]);

  return RPanelItem;
}(_react.Component);

_defineProperty(RPanelItem, "contextType", RPanelContext);

var RPanelControl = /*#__PURE__*/function (_Component6) {
  _inherits(RPanelControl, _Component6);

  function RPanelControl() {
    _classCallCheck(this, RPanelControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelControl).apply(this, arguments));
  }

  _createClass(RPanelControl, [{
    key: "isColor",
    value: function isColor(value) {
      if (value.indexOf('rgb(') !== -1) {
        return true;
      }

      if (value.indexOf('rgba(') !== -1) {
        return true;
      }

      if (value.indexOf('#') !== -1) {
        if (value.length === 4 || value.length === 7) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          item = _this$props4.item,
          value = _this$props4.value;
      var _this$context7 = this.context,
          getValueByField = _this$context7.getValueByField,
          model = _this$context7.model;

      var type = _typeof(value);

      if (item.items) {
        return item.items.map(function (itm, i) {
          return _react.default.createElement(RPanelControl, {
            key: i,
            item: itm,
            value: itm.get ? itm.get(getValueByField(model, itm.field)) : getValueByField(model, itm.field)
          });
        });
      } else if (item.range) {
        return _react.default.createElement(RPanelSlider, {
          value: value,
          item: item
        });
      } else if (item.buttons && item.buttons.length) {
        return _react.default.createElement(RPanelButtons, {
          item: item,
          value: value
        });
      } else if (item.options && item.options.length) {
        return _react.default.createElement(RPanelSelect, {
          item: item,
          value: value
        });
      } else if (type === 'string') {
        if (this.isColor(value)) {
          return _react.default.createElement(RPanelColor, {
            value: value,
            item: item
          });
        } else {
          return _react.default.createElement(RPanelTextbox, {
            value: value,
            item: item
          });
        }
      } else if (type === 'number') {
        return _react.default.createElement(RPanelNumberbox, {
          item: item,
          value: value
        });
      } else if (type === 'boolean') {
        return _react.default.createElement(RPanelCheckbox, {
          item: item,
          value: value
        });
      } else if (item.info || item.warning || item.danger) {
        return _react.default.createElement(RPanelAlert, {
          item: item
        });
      } else if (item.text && item.href) {
        return _react.default.createElement(RPanelLink, {
          item: item
        });
      } else if (item.text) {
        return _react.default.createElement(RPanelList, {
          item: item
        });
      } else if (item.html) {
        return item.html;
      } else {
        return '';
      }
    }
  }]);

  return RPanelControl;
}(_react.Component);

_defineProperty(RPanelControl, "contextType", RPanelContext);

var RPanelGroup = /*#__PURE__*/function (_Component7) {
  _inherits(RPanelGroup, _Component7);

  function RPanelGroup() {
    _classCallCheck(this, RPanelGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelGroup).apply(this, arguments));
  }

  _createClass(RPanelGroup, [{
    key: "getStyle",
    value: function getStyle() {
      var level = this.props.level;
      var _this$context$rowStyl2 = this.context.rowStyle,
          rowStyle = _this$context$rowStyl2 === void 0 ? {} : _this$context$rowStyl2;

      var style = _jquery.default.extend({}, {
        paddingLeft: level ? level * 24 + 'px' : undefined
      }, rowStyle);

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
      var _item$opened2 = item.opened,
          opened = _item$opened2 === void 0 ? true : _item$opened2,
          iconClass = item.iconClass,
          iconColor = item.iconColor;
      return _react.default.createElement("div", {
        className: "r-panel-item r-panel-group",
        style: this.getStyle(),
        onClick: this.click.bind(this)
      }, _react.default.createElement("div", {
        className: "r-panel-collapse ".concat(opened ? 'opened' : 'closed')
      }), iconClass && _react.default.createElement("div", {
        className: "icon ".concat(iconClass),
        style: {
          color: iconColor
        }
      }), _react.default.createElement("div", {
        className: "r-panel-group-name"
      }, item.title));
    }
  }]);

  return RPanelGroup;
}(_react.Component);

_defineProperty(RPanelGroup, "contextType", RPanelContext);

var RPanelItemTitle = /*#__PURE__*/function (_Component8) {
  _inherits(RPanelItemTitle, _Component8);

  function RPanelItemTitle() {
    _classCallCheck(this, RPanelItemTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItemTitle).apply(this, arguments));
  }

  _createClass(RPanelItemTitle, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          title = _this$props5.title,
          field = _this$props5.field;
      var titleStyle = this.context.titleStyle;
      return _react.default.createElement("div", {
        style: titleStyle,
        className: "r-panel-item-title"
      }, title || field);
    }
  }]);

  return RPanelItemTitle;
}(_react.Component);

_defineProperty(RPanelItemTitle, "contextType", RPanelContext);

var RPanelAlert = /*#__PURE__*/function (_Component9) {
  _inherits(RPanelAlert, _Component9);

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
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-alert ".concat(danger ? 'danger' : warning ? 'warning' : 'info')
      }, danger || warning || info);
    }
  }]);

  return RPanelAlert;
}(_react.Component);

_defineProperty(RPanelAlert, "contextType", RPanelContext);

var RPanelNumberbox = /*#__PURE__*/function (_Component10) {
  _inherits(RPanelNumberbox, _Component10);

  function RPanelNumberbox() {
    _classCallCheck(this, RPanelNumberbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelNumberbox).apply(this, arguments));
  }

  _createClass(RPanelNumberbox, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          item = _this$props6.item,
          value = _this$props6.value;
      var _this$context8 = this.context,
          controlBackground = _this$context8.controlBackground,
          controlColor = _this$context8.controlColor,
          onchange = _this$context8.onchange;
      return _react.default.createElement("input", _extends({}, item, {
        style: {
          background: controlBackground,
          color: controlColor
        },
        type: "number",
        value: value,
        className: "r-panel-control r-panel-textbox r-panel-numberbox",
        onChange: function onChange(e) {
          onchange(item, parseFloat(e.target.value));
        }
      }));
    }
  }]);

  return RPanelNumberbox;
}(_react.Component);

_defineProperty(RPanelNumberbox, "contextType", RPanelContext);

var RPanelSlider = /*#__PURE__*/function (_Component11) {
  _inherits(RPanelSlider, _Component11);

  function RPanelSlider() {
    _classCallCheck(this, RPanelSlider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelSlider).apply(this, arguments));
  }

  _createClass(RPanelSlider, [{
    key: "render",
    value: function render() {
      var _this$context9 = this.context,
          activeColor = _this$context9.activeColor,
          controlBackground = _this$context9.controlBackground,
          controlColor = _this$context9.controlColor,
          onchange = _this$context9.onchange;
      var _this$props7 = this.props,
          value = _this$props7.value,
          item = _this$props7.item;
      return _react.default.createElement(_rRangeSlider.default, {
        className: "r-panel-control r-panel-slider",
        style: {
          padding: '0 12px'
        },
        points: [{
          value: value,
          fillStyle: {
            background: activeColor,
            height: '3px'
          }
        }],
        pointStyle: {
          display: 'none'
        },
        showValue: "fixed",
        valueStyle: {
          top: '-10px',
          height: '20px',
          lineHeight: '20px',
          color: controlColor,
          background: controlBackground,
          minWidth: '20px',
          textAlign: 'center'
        },
        lineStyle: {
          background: controlBackground,
          height: '3px'
        },
        start: item.range[0],
        end: item.range[1],
        step: item.step,
        min: item.min,
        max: item.max,
        ondrag: function ondrag(obj) {
          onchange(item, obj.points[0].value);
        }
      });
    }
  }]);

  return RPanelSlider;
}(_react.Component);

_defineProperty(RPanelSlider, "contextType", RPanelContext);

var RPanelButtons = /*#__PURE__*/function (_Component12) {
  _inherits(RPanelButtons, _Component12);

  function RPanelButtons() {
    _classCallCheck(this, RPanelButtons);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelButtons).apply(this, arguments));
  }

  _createClass(RPanelButtons, [{
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          item = _this$props8.item,
          value = _this$props8.value;
      var _this$context10 = this.context,
          controlBackground = _this$context10.controlBackground,
          activeReverseColor = _this$context10.activeReverseColor,
          controlColor = _this$context10.controlColor,
          activeColor = _this$context10.activeColor,
          onchange = _this$context10.onchange;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-group-button"
      }, item.buttons.map(function (btn, i) {
        var active = value === btn.value;
        return _react.default.createElement("button", {
          style: {
            background: active ? activeColor : controlBackground,
            color: active ? activeReverseColor : controlColor,
            width: btn.width,
            flex: btn.width ? 'unset' : 1
          },
          key: i,
          className: active ? 'active' : undefined,
          onClick: function onClick() {
            onchange(item, btn.value);
          }
        }, btn.text);
      }));
    }
  }]);

  return RPanelButtons;
}(_react.Component);

_defineProperty(RPanelButtons, "contextType", RPanelContext);

var RPanelSelect = /*#__PURE__*/function (_Component13) {
  _inherits(RPanelSelect, _Component13);

  function RPanelSelect() {
    _classCallCheck(this, RPanelSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelSelect).apply(this, arguments));
  }

  _createClass(RPanelSelect, [{
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          value = _this$props9.value,
          item = _this$props9.item;
      var _this$context11 = this.context,
          onchange = _this$context11.onchange,
          controlBackground = _this$context11.controlBackground,
          controlColor = _this$context11.controlColor;
      return _react.default.createElement("select", {
        className: "r-panel-control r-panel-select",
        value: value,
        style: {
          color: controlColor,
          background: controlBackground
        },
        onChange: function onChange(e) {
          onchange(item, e.target.value);
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

var RPanelColor = /*#__PURE__*/function (_Component14) {
  _inherits(RPanelColor, _Component14);

  function RPanelColor() {
    _classCallCheck(this, RPanelColor);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelColor).apply(this, arguments));
  }

  _createClass(RPanelColor, [{
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          item = _this$props10.item,
          value = _this$props10.value;
      var _this$context12 = this.context,
          onchange = _this$context12.onchange,
          controlBackground = _this$context12.controlBackground,
          controlColor = _this$context12.controlColor;
      return _react.default.createElement("input", {
        className: "r-panel-control r-panel-color",
        type: "color",
        onChange: function onChange(e) {
          onchange(item, e.target.value);
        },
        value: value,
        style: {
          background: controlBackground,
          color: controlColor
        }
      });
    }
  }]);

  return RPanelColor;
}(_react.Component);

_defineProperty(RPanelColor, "contextType", RPanelContext);

var RPanelTextbox = /*#__PURE__*/function (_Component15) {
  _inherits(RPanelTextbox, _Component15);

  function RPanelTextbox() {
    _classCallCheck(this, RPanelTextbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelTextbox).apply(this, arguments));
  }

  _createClass(RPanelTextbox, [{
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          value = _this$props11.value,
          item = _this$props11.item;
      var _this$context13 = this.context,
          controlBackground = _this$context13.controlBackground,
          controlColor = _this$context13.controlColor,
          onchange = _this$context13.onchange;
      var listId = 'datalist' + Math.random();
      var list = item.list ? _react.default.createElement("datalist", {
        id: listId
      }, item.list.map(function (l, i) {
        return _react.default.createElement("option", {
          value: l,
          key: i
        });
      })) : undefined;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("input", {
        list: listId,
        style: {
          background: controlBackground,
          color: controlColor
        },
        disabled: item.disabled,
        maxLength: item.maxLength,
        type: "text",
        className: "r-panel-control r-panel-textbox",
        value: value,
        onChange: function onChange(e) {
          onchange(item, e.target.value);
        }
      }), list && list);
    }
  }]);

  return RPanelTextbox;
}(_react.Component);

_defineProperty(RPanelTextbox, "contextType", RPanelContext);

var RPanelCheckbox = /*#__PURE__*/function (_Component16) {
  _inherits(RPanelCheckbox, _Component16);

  function RPanelCheckbox() {
    _classCallCheck(this, RPanelCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelCheckbox).apply(this, arguments));
  }

  _createClass(RPanelCheckbox, [{
    key: "render",
    value: function render() {
      var _this$props12 = this.props,
          item = _this$props12.item,
          value = _this$props12.value;
      var _this$context14 = this.context,
          onchange = _this$context14.onchange,
          textColor = _this$context14.textColor,
          activeColor = _this$context14.activeColor,
          controlColor = _this$context14.controlColor;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-checkbox"
      }, _react.default.createElement("div", {
        style: {
          borderColor: controlColor,
          color: activeColor
        },
        className: "checkbox".concat(value === true ? ' checked' : ''),
        onClick: function onClick() {
          return onchange(item, !value);
        }
      }));
    }
  }]);

  return RPanelCheckbox;
}(_react.Component);

_defineProperty(RPanelCheckbox, "contextType", RPanelContext);

var RPanelLink = /*#__PURE__*/function (_Component17) {
  _inherits(RPanelLink, _Component17);

  function RPanelLink() {
    _classCallCheck(this, RPanelLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelLink).apply(this, arguments));
  }

  _createClass(RPanelLink, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      return _react.default.createElement("a", {
        className: "r-panel-control r-panel-list",
        href: item.href
      }, item.text);
    }
  }]);

  return RPanelLink;
}(_react.Component);

var RPanelList = /*#__PURE__*/function (_Component18) {
  _inherits(RPanelList, _Component18);

  function RPanelList() {
    _classCallCheck(this, RPanelList);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelList).apply(this, arguments));
  }

  _createClass(RPanelList, [{
    key: "render",
    value: function render() {
      var item = this.props.item;
      var getValue = this.context.getValue;
      return _react.default.createElement("div", {
        className: "r-panel-control r-panel-list"
      }, getValue(item.text));
    }
  }]);

  return RPanelList;
}(_react.Component);

_defineProperty(RPanelList, "contextType", RPanelContext);