import React, { Component,createRef,Fragment,createContext } from 'react';
import Slider from 'r-range-slider';
import './index.css';
import $ from 'jquery';
const RPanelContext = createContext();
export default class RPanel extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.dom = createRef();
    this.touch = this.isMobile();
  }
  static getDerivedStateFromProps(props,state){
    if(state === null){//اولین فراخوانی
      return {
        model:props.model,
        prevModel:JSON.stringify(props.model),
        initModel:props.model,
        opened:props.opened,
        prevOpened:props.opened
      };
    }
    else{
      var change = {};
      var changed = false;
      if(JSON.stringify(props.model) !== state.prevModel){
        change.model = props.model;
        change.prevModel = JSON.stringify(props.model);
        change.initModel = props.model;
        changed = true;
      }
      if(state.opened !== state.prevOpened){//اگر تغییر باز بودن از داخل آمد
        change.opened = state.opened;
        change.prevOpened = state.opened;
        changed = true;
      }
      else if(props.opened !== state.prevModel){//اگر تغییر باز بودن از خارج آمد
        change.opened = props.opened;
        change.prevOpened = props.opened;
        changed = true;
      }
      if(changed){
        return change;
      }
    }
    return null;
  }
  close(){
    this.setState({opened:false,prevModel:undefined,initModel:undefined});
    this.props.closeCallback()
  }
  toggle(item){
      var {items} = this.props;
      var {opened = true} = item;
      item.opened = !opened;
      this.setState({items});
  }
  buttonClick({callback,close}){
    if(callback){callback(this.state.model)}
    if(close === true){this.close();}
  }
  resetCallback(){
    var {onchange} = this.props;
    var {initModel} = this.state;
    if(onchange){onchange(initModel);}
    else{this.setState({model:initModel});}
  }
  isMobile(){return 'ontouchstart' in document.documentElement}
  eventHandler(selector, event, action,type = 'bind'){
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = this.touch ? me[event] : event;
    var element = typeof selector === "string"? 
    (selector === "window"?$(window):$(selector)):
    selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  getClient(e){
    return this.touch?
    {x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:
    {x:e.clientX,y:e.clientY}
  }
  mousedown(e){
    if(!this.props.movable){return;}
    var dom = $(this.dom.current);
    this.startOffset = {client:this.getClient(e),offset:dom.offset(),dom}
    this.eventHandler('window','mousemove',$.proxy(this.mousemove,this));
    this.eventHandler('window','mouseup',$.proxy(this.mouseup,this));
  }
  mousemove(e){
    var {dom,client,offset} = this.startOffset;
    var CLIENT = this.getClient(e);
    dom.css({left:offset.left + (CLIENT.x - client.x),top:offset.top + (CLIENT.y - client.y)})
  }
  mouseup(){
    this.eventHandler('window','mousemove',this.mousemove,'unbind');
    this.eventHandler('window','mouseup',this.mouseup,'unbind');
  }
  getValueByField(obj,field){
    if(!field || field === null){return undefined;}
    var fieldString = typeof field === 'function'?field(obj):field;
    if(!fieldString ||typeof fieldString !== 'string'){console.error('RGauger.getValueByField() receive invalid field'); return undefined}
    var fields = fieldString.split('.');
    var value = obj[fields[0]];
    if(value === undefined){return;}
    for(var i = 1; i < fields.length; i++){
      value = value[fields[i]];
      if(value === undefined || value === null){return;}
    }
    return value;
  }
  setValueByField(obj,field,value){
    var fields = field.split('.');
    var node = obj;
    for(var i = 0; i < fields.length - 1; i++){
      if(node[fields[i]] === undefined){return;}
      node = node[fields[i]]; 
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  onchange(item,value){ 
    var {onchange} = this.props;
    var {model} = this.state;
    model = JSON.parse(JSON.stringify(model));
    var Value = item.set?item.set(value):value;
    this.setValueByField(model,item.field,Value);
    if(onchange){onchange(model);}
    else{this.setState({model});}
  }
  validate(item,value){if(item.validation){return item.validation(value) || {};}}
  getValue(value){return typeof value === 'function'?value(this.props):value;}
  render() {
    var {opened,model} = this.state;
    if(opened !== true){return '';}
    var {backdrop,items,header,buttons = [],style,backdropClose,textColor,backdropStyle} = this.props;
    var contextValue = {...this.props};
    contextValue.close=this.close.bind(this);
    contextValue.toggle=this.toggle.bind(this);
    contextValue.buttonClick=this.buttonClick.bind(this);
    contextValue.resetCallback=this.resetCallback.bind(this);
    contextValue.getValueByField=this.getValueByField.bind(this);
    contextValue.onchange=this.onchange.bind(this);
    contextValue.validate=this.validate.bind(this);
    contextValue.mousedown=this.mousedown.bind(this);
    contextValue.getValue=this.getValue.bind(this);
    contextValue.touch=this.touch;
    return (
      <RPanelContext.Provider value={contextValue}>
        <div className={'r-panel'} ref={this.dom} style={$.extend({},{color:textColor},style)}>
          {backdrop && <div style={backdropStyle} className='r-panel-backdrop' onClick={()=>{if(backdropClose){this.close()}}}></div>}
          {header && <RPanelHeader title={header.title || ''}/>}
          {<RPanelBody items={items}/>}
          {buttons.length > 0 && <RPanelFooter />}
        </div>
      </RPanelContext.Provider>
    );
  }
}
RPanel.defaultProps = {items:[],buttons:[],width:'300px',controlColor:'#fff',alignX:'center',activeReverseColor:'#fff',controlBackground:'rgb(87, 92, 102)',activeColor:'rgb(255, 102, 0)',textColor:'#fff',background:'rgb(76, 82, 90)'}


class RPanelHeader extends Component{
  static contextType = RPanelContext;
  getStyle(){
    var {background,headerStyle} = this.context;
    return $.extend({},{background},headerStyle);
  }
  render(){
    var {touch,mousedown,close} = this.context;
    var {title} = this.props;
    var props = {
      style:this.getStyle(),className:'r-panel-header',[touch?'onTouchStart':'onMouseDown']:mousedown
    }
    return (
      <div {...props}>
        <div className='r-panel-title'>{title || ''}</div>
        <div className='r-panel-close' onClick={close}></div>
      </div>
    );
  }
}

class RPanelBody extends Component{
  static contextType = RPanelContext;
  render(){
    var {background} = this.context;
    return (
      <div className='r-panel-body' style={{background}}>
        <div className='r-panel-body-container' style={{background}}>
          {this.props.items.map((item,i)=><RPanelItem item={item} key={i}/>)}
        </div>
      </div>
    );
  }
}
class RPanelFooter extends Component{
  static contextType = RPanelContext;
  getStyle(){
    var {background,footerStyle} = this.context;
    return $.extend({},{background},footerStyle)
  }
  render(){
    var {resetCallback,reset,buttons,buttonClick} = this.context;
    var Buttons = [];
    if(reset){Buttons.push({text:'reset',callback:resetCallback})}
    Buttons = Buttons.concat(buttons);
    return (
      <div className='r-panel-footer' style={this.getStyle()}>
        {Buttons.map((btn,i)=><button key ={i} onClick={()=>{buttonClick(btn)}}>{btn.text}</button>)}
      </div>
    )
  }
}
class RPanelItem extends Component{
  static contextType = RPanelContext;
  getStyle(){
    var {level = 0,item} = this.props;
    var {rowStyle = {}} = this.context;
    var style = $.extend({},{paddingLeft:level?(level * 24)+'px':undefined},rowStyle);
    return style;
  }
  getGroup(item,level){
    return (
      <Fragment>
        <RPanelGroup item={item} level={level}/>
        {item.opened !== false && item.group.map((itm,i)=><RPanelItem item={itm} level={level+1} key={i}/>)}
      </Fragment>
    )
  }
  getItem(item,value){
    var {getValue,validate} = this.context;
    var validationState = validate(item,value);
    var itemProps = {className:'r-panel-item',style:this.getStyle(),onClick:()=>{if(item.callback){item.callback(item)}}};
    return (
      <Fragment>
        <div {...itemProps}>
          {item.title && <RPanelItemTitle title={getValue(item.title)} field={getValue(item.field)} />}
          {<RPanelControl item={item} value={value}/>}
        </div>
        {
          validationState && validationState.state === false &&
          <div {...itemProps}><RPanelAlert item={validationState}/></div>
        }
      </Fragment>
    )
  }
  render(){
    var {item,level = 0} = this.props;
    var {get} = item;
    var field = typeof item.field === 'function'?item.field():item.field;
    var {getValueByField,model} = this.context;
    var value = get?get(getValueByField(model,field)):getValueByField(model,field);
    return (<Fragment>{
      item.group?this.getGroup(item,level):this.getItem(item,value)
    }</Fragment>);
  }
}
class RPanelControl extends Component{
  static contextType = RPanelContext;  
  isColor(value){
    if(value.indexOf('rgb(') !== -1){return true;}
    if(value.indexOf('rgba(') !== -1){return true;}
    if(value.indexOf('#') !== -1){
      if(value.length === 4 || value.length === 7){return true;}
    }
    return false;
  }
  render(){
    var {item,value} = this.props;
    var {getValueByField,model} = this.context;
    var type = typeof value;
    if(item.items){return item.items.map((itm,i)=><RPanelControl key={i} item={itm} value={itm.get?itm.get(getValueByField(model,itm.field)):getValueByField(model,itm.field)}/>)}
    else if(item.range){return <RPanelSlider value={value} item={item}/>}
    else if(item.buttons && item.buttons.length){return <RPanelButtons item={item} value={value}/>}
    else if(item.options && item.options.length){return <RPanelSelect item={item} value={value}/>}
    else if(type === 'string'){
      if(this.isColor(value)){return <RPanelColor value={value} item={item}/>}
      else{return <RPanelTextbox value={value} item={item}/> }
    }
    else if(type === 'number'){return <RPanelNumberbox item={item} value={value}/>}
    else if(type === 'boolean'){return <RPanelCheckbox item={item} value={value}/>}
    else if(item.info || item.warning || item.danger){return <RPanelAlert item={item} />}
    else if(item.text && item.href){return <RPanelLink item={item}/>}
    else if(item.text){return <RPanelList item={item}/>}
    else if(item.html){return item.html;}
    
    else {return '';}
  }
}
class RPanelGroup extends Component{
  static contextType = RPanelContext;
  getStyle(){
    var {level} = this.props;
    var {rowStyle = {}} = this.context;
    var style = $.extend({},{paddingLeft:level?(level * 24)+'px':undefined},rowStyle);
    return style;
  }
  click(e){
    var {toggle} = this.context;
    var {item} = this.props;
    if(!item.callback){toggle(item)}
    else{
      if($(e.target).hasClass('r-panel-collapse')){
        toggle(item);
      }
      else{
        item.callback(item)
      }

    }
  }
  render(){
    var {item} = this.props;
    var {opened = true,iconClass,iconColor} = item;
    return (
      <div className='r-panel-item r-panel-group' style={this.getStyle()} onClick={this.click.bind(this)}>
        <div className={`r-panel-collapse ${opened?'opened':'closed'}`}></div>
        {iconClass && <div className={`icon ${iconClass}`} style={{color:iconColor}}></div>}
        <div className='r-panel-group-name'>{item.title}</div>
      </div>
    );
  }
}
class RPanelItemTitle extends Component{
  static contextType = RPanelContext;
  render(){
    const {title,field} = this.props;
    const {titleStyle} = this.context;
    return (<div style={titleStyle} className='r-panel-item-title'>{title || field}</div>);
  }
}
class RPanelAlert extends Component{
  static contextType = RPanelContext;
  render(){
    const {item} = this.props;
    var {info,warning,danger} = item;
    return (
      <div className={`r-panel-control r-panel-alert ${danger?'danger':(warning?'warning':'info')}`}>
        {danger || warning || info}
      </div>
    )
  }
}


class RPanelNumberbox extends Component{
  static contextType = RPanelContext;
  render(){
    var {item,value} = this.props;
    var {controlBackground,controlColor,onchange} = this.context;
    return (
      <input {...item} style={{background:controlBackground,color:controlColor}} type='number' value={value}
        className='r-panel-control r-panel-textbox r-panel-numberbox'
        onChange={(e)=>{onchange(item,parseFloat(e.target.value));}}
    />
    );
  }
}

class RPanelSlider extends Component{
  static contextType = RPanelContext;
  render(){
    var {activeColor,controlBackground,controlColor,onchange} = this.context;
    var {value,item} = this.props;  
    var props = {
      className:'r-panel-control r-panel-slider',
      style:{padding:'0 12px'},
      points:[{value,fillStyle:{background:activeColor,height:'3px'}}],
      pointStyle:{display:'none'},
      showValue:'fixed',
      valueStyle:{top:'-10px',height:'20px',lineHeight:'20px',color:controlColor,background:controlBackground,minWidth:'20px',textAlign:'center'},
      lineStyle:{background:controlBackground,height:'3px'},
      start:item.range[0],end:item.range[1],
      [item.dragChange?'ondrag':'onchange']:(obj)=>{onchange(item,obj.points[0].value);}
    }
    return (<Slider {...item} {...props}/>)
  }
}

class RPanelButtons extends Component{
  static contextType = RPanelContext;
  render(){
    var {item,value} = this.props;
    var {controlBackground,activeReverseColor,controlColor,activeColor,onchange} = this.context;
    return (
      <div className="r-panel-control r-panel-group-button">
        {
          item.buttons.map((btn,i)=>{
            let active = value === btn.value;
            return (
              <button
                style={{
                  background:active?activeColor:controlBackground,
                  color:active?activeReverseColor:controlColor,
                  width:btn.width,
                  flex:btn.width?'unset':1
                }}
                key={i} className={active?'active':undefined}
                onClick={()=>{onchange(item,btn.value);}}
              >{btn.text}</button>
          )
        })
      }
      </div>
    )
  }
}

class RPanelSelect extends Component{
  static contextType = RPanelContext;
  render(){
    var {value,item} = this.props;
    var {onchange,controlBackground,controlColor} = this.context;
    return (
      <select
          className='r-panel-control r-panel-select' value={value} style={{color:controlColor,background:controlBackground}}
          onChange={(e)=>{onchange(item,e.target.value)}
        }>
          {item.options.map((option,i)=><option key={i} value={option.value}>{option.text}</option>)}
      </select>
    );
  }
}

class RPanelColor extends Component{
  static contextType = RPanelContext;
  render(){
    var {item,value} = this.props;
    var {onchange,controlBackground,controlColor} = this.context;
    return (
      <input 
        className='r-panel-control r-panel-color' 
        type='color' 
        onChange={(e)=>{onchange(item,e.target.value);}} 
        value={value} 
        style={{background:controlBackground,color:controlColor}}
      />
    );
  }
}

class RPanelTextbox extends Component{
  static contextType = RPanelContext;
  render(){
    var {value,item} = this.props;
    var {controlBackground,controlColor,onchange} = this.context;
    var listId = 'datalist' + Math.random();
    var list= item.list?<datalist id={listId}>{item.list.map((l,i)=><option value={l} key={i}/>)}</datalist>:undefined
    return (
      <Fragment>
        <input list={listId}
          style={{background:controlBackground,color:controlColor}} disabled={item.disabled} maxLength={item.maxLength} type='text'
          className='r-panel-control r-panel-textbox' 
          value={value}
          onChange={(e)=>{onchange(item,e.target.value);}}
        />
        {list && list}
      </Fragment>
    )
  }
}

class RPanelCheckbox extends Component{
  static contextType = RPanelContext;
  render(){
    var {item,value} = this.props;
    var {onchange,textColor,activeColor,controlColor} = this.context;
    return (
      <div className='r-panel-control r-panel-checkbox'>
        <div 
          style={{borderColor:controlColor,color:activeColor}}
          className={`checkbox${value === true?' checked':''}`}
          onClick={()=>onchange(item,!value)}
        ></div>
      </div>
    );
  }
}

class RPanelLink extends Component{
  render(){
    var {item} = this.props;
    return (
      <a className='r-panel-control r-panel-list' href={item.href}>{item.text}</a>
    );
  }
}

class RPanelList extends Component{
  static contextType = RPanelContext;
  render(){
    var {item} = this.props;
    var {getValue} = this.context;
    return (
      <div className='r-panel-control r-panel-list'>{getValue(item.text)}</div>
    );
  }
}






