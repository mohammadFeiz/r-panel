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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    value: function onchange(obj) {
      var onchange = this.props.onchange;
      var model = this.state.model;
      model = JSON.parse(JSON.stringify(model));

      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          this.setValueByField(model, obj[i].field, obj[i].value);
        }
      } else {
        this.setValueByField(model, obj.field, obj.value);
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
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? '' : _this$props$title,
          buttons = _this$props.buttons,
          reset = _this$props.reset,
          style = _this$props.style,
          backdropClose = _this$props.backdropClose,
          rowStyle = _this$props.rowStyle,
          activeColor = _this$props.activeColor,
          controlColor = _this$props.controlColor,
          textColor = _this$props.textColor,
          background = _this$props.background,
          titleStyle = _this$props.titleStyle;
      var contextValue = {
        close: this.close.bind(this),
        toggle: this.toggle.bind(this),
        buttonClick: this.buttonClick.bind(this),
        resetCallback: this.resetCallback.bind(this),
        onchange: this.onchange.bind(this),
        validate: this.validate.bind(this),
        mousedown: this.mousedown.bind(this),
        getValue: this.getValue.bind(this),
        touch: this.touch,
        activeColor: activeColor,
        controlColor: controlColor,
        textColor: textColor,
        background: background,
        reset: reset,
        buttons: buttons,
        items: items,
        model: model,
        title: title,
        rowStyle: rowStyle,
        titleStyle: titleStyle
      };
      return _react.default.createElement(RPanelContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: 'r-panel',
        ref: this.dom,
        style: _jquery.default.extend({}, {
          color: textColor,
          background: background
        }, style)
      }, backdrop && _react.default.createElement("div", {
        className: "r-panel-backdrop",
        onClick: function onClick() {
          if (backdropClose) {
            _this2.close();
          }
        }
      }), title && title !== null && _react.default.createElement("div", _defineProperty({
        className: 'r-panel-header'
      }, this.touch ? 'onTouchStart' : 'onMouseDown', this.mousedown.bind(this)), _react.default.createElement("div", {
        className: "r-panel-title"
      }, title), _react.default.createElement("div", {
        className: "r-panel-close",
        onClick: this.close.bind(this)
      })), _react.default.createElement("div", {
        className: "r-panel-body"
      }, _react.default.createElement("div", {
        className: "r-panel-body-container"
      }, items.map(function (item, i) {
        return _react.default.createElement(RPanelItem, {
          item: item,
          key: i
        });
      }))), _react.default.createElement("div", {
        className: "r-panel-footer"
      }, (reset === true ? [{
        text: 'reset',
        callback: this.resetCallback.bind(this)
      }] : []).concat(buttons).map(function (btn, i) {
        return _react.default.createElement("button", {
          key: i,
          onClick: function onClick() {
            _this2.buttonClick(btn);
          }
        }, btn.text);
      }))));
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
  alignX: 'center',
  controlColor: 'rgb(87, 92, 102)',
  activeColor: 'rgb(255, 102, 0)',
  textColor: '#fff',
  background: 'rgb(76, 82, 90)'
};

var RPanelItem = /*#__PURE__*/function (_Component2) {
  _inherits(RPanelItem, _Component2);

  function RPanelItem() {
    _classCallCheck(this, RPanelItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItem).apply(this, arguments));
  }

  _createClass(RPanelItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          item = _this$props2.item,
          _this$props2$level = _this$props2.level,
          level = _this$props2$level === void 0 ? 0 : _this$props2$level;
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

var RPanelControl = /*#__PURE__*/function (_Component3) {
  _inherits(RPanelControl, _Component3);

  function RPanelControl() {
    _classCallCheck(this, RPanelControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelControl).apply(this, arguments));
  }

  _createClass(RPanelControl, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props3 = this.props,
          level = _this$props3.level,
          item = _this$props3.item;
      var _this$context$rowStyl = this.context.rowStyle,
          rowStyle = _this$context$rowStyl === void 0 ? {} : _this$context$rowStyl;

      var style = _jquery.default.extend({}, {
        paddingLeft: level ? level * 24 + 'px' : undefined
      }, rowStyle);

      return style;
    }
  }, {
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
    key: "render",
    value: function render() {
      var _this$context = this.context,
          model = _this$context.model,
          validate = _this$context.validate,
          textColor = _this$context.textColor,
          getValue = _this$context.getValue,
          activeColor = _this$context.activeColor,
          controlColor = _this$context.controlColor,
          onchange = _this$context.onchange;
      var item = this.props.item;
      var iconClass = item.iconClass,
          iconColor = item.iconColor;
      var field = typeof item.field === 'function' ? item.field() : item.field;
      var value = this.getValueByField(model, field);

      var type = _typeof(value);

      var validationState = validate(item, value);
      var control;

      if (item.range) {
        control = _react.default.createElement(_rRangeSlider.default, {
          className: "r-panel-control r-panel-slider",
          style: {
            padding: '6px'
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
            background: controlColor,
            minWidth: '20px',
            textAlign: 'center'
          },
          lineStyle: {
            background: controlColor,
            height: '3px'
          },
          start: item.range[0],
          end: item.range[1],
          step: item.step,
          min: item.min,
          max: item.max,
          ondrag: function ondrag(obj) {
            onchange({
              field: item.field,
              value: obj.points[0].value,
              item: item
            });
          }
        });
      } else if (item.buttons && item.buttons.length) {
        control = _react.default.createElement("div", {
          className: "r-panel-control r-panel-group-button"
        }, item.buttons.map(function (btn, i) {
          var active = value === btn.value;
          return _react.default.createElement("button", {
            style: {
              background: controlColor,
              borderColor: active ? activeColor : undefined,
              color: active ? activeColor : undefined
            },
            key: i,
            className: active ? 'active' : undefined,
            onClick: function onClick() {
              onchange({
                field: item.field,
                value: btn.value,
                item: item
              });
            }
          }, btn.text);
        }));
      } else if (item.options && item.options.length) {
        control = _react.default.createElement("select", {
          className: "r-panel-control r-panel-select",
          value: value,
          style: {
            background: controlColor
          },
          onChange: function onChange(e) {
            onchange({
              field: item.field,
              value: e.target.value,
              item: item
            });
          }
        }, item.options.map(function (option, i) {
          return _react.default.createElement("option", {
            key: i,
            value: option.value
          }, option.text);
        }));
      } else if (type === 'string') {
        if (this.isColor(value)) {
          control = _react.default.createElement("input", {
            className: "r-panel-control r-panel-color",
            type: "color",
            onChange: function onChange(e) {
              onchange({
                field: item.field,
                value: e.target.value,
                item: item
              });
            },
            value: value,
            style: {
              background: controlColor
            }
          });
        } else {
          var listId = 'datalist' + Math.random();
          var list = item.list ? _react.default.createElement("datalist", {
            id: listId
          }, item.list.map(function (l, i) {
            return _react.default.createElement("option", {
              value: l,
              key: i
            });
          })) : undefined;
          control = _react.default.createElement(_react.Fragment, null, _react.default.createElement("input", {
            list: listId,
            style: {
              background: controlColor
            },
            disabled: item.disabled,
            maxLength: item.maxLength,
            type: "text",
            className: "r-panel-control r-panel-textbox",
            value: value,
            onChange: function onChange(e) {
              onchange({
                field: item.field,
                value: e.target.value,
                item: item
              });
            }
          }), list && list);
        }
      } else if (type === 'number') {
        control = _react.default.createElement("input", _extends({}, item, {
          style: {
            background: controlColor
          },
          type: "number",
          value: value,
          className: "r-panel-control r-panel-textbox r-panel-numberbox",
          onChange: function onChange(e) {
            onchange({
              field: item.field,
              value: parseFloat(e.target.value),
              item: item
            });
          }
        }));
      } else if (type === 'boolean') {
        control = _react.default.createElement("div", {
          className: "r-panel-control r-panel-checkbox"
        }, _react.default.createElement("div", {
          style: {
            borderColor: textColor,
            color: activeColor
          },
          className: "checkbox".concat(value === true ? ' checked' : ''),
          onClick: function onClick() {
            return onchange({
              field: item.field,
              value: !value,
              item: item
            });
          }
        }));
      } else if (item.info || item.warning || item.danger) {
        control = _react.default.createElement(RPanelAlert, {
          item: item
        });
      } else if (item.text && item.href) {
        control = _react.default.createElement("a", {
          className: "r-panel-control r-panel-list",
          href: item.href
        }, item.text);
      } else if (item.text) {
        control = _react.default.createElement("div", {
          className: "r-panel-control r-panel-list"
        }, getValue(item.text));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        className: "r-panel-item",
        style: this.getStyle(),
        onClick: function onClick() {
          if (item.callback) {
            item.callback(item);
          }
        }
      }, item.title && _react.default.createElement(RPanelItemTitle, {
        title: getValue(item.title),
        field: getValue(item.field)
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

var RPanelGroup = /*#__PURE__*/function (_Component4) {
  _inherits(RPanelGroup, _Component4);

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
      var _item$opened3 = item.opened,
          opened = _item$opened3 === void 0 ? true : _item$opened3,
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

var RPanelItemTitle = /*#__PURE__*/function (_Component5) {
  _inherits(RPanelItemTitle, _Component5);

  function RPanelItemTitle() {
    _classCallCheck(this, RPanelItemTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RPanelItemTitle).apply(this, arguments));
  }

  _createClass(RPanelItemTitle, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          title = _this$props4.title,
          field = _this$props4.field;
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

var RPanelAlert = /*#__PURE__*/function (_Component6) {
  _inherits(RPanelAlert, _Component6);

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