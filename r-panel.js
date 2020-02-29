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
  onchange(obj){
    var {onchange} = this.props;
    var {model} = this.state;
    model = JSON.parse(JSON.stringify(model));
    if(Array.isArray(obj)){
      for(var i = 0; i < obj.length; i++){
        this.setValueByField(model,obj[i].field,obj[i].value);
      }
    }
    else{
      this.setValueByField(model,obj.field,obj.value);
    }
    if(onchange){onchange(model);}
    else{this.setState({model});}

  }
  validate(item,value){
    if(item.validation){
      return item.validation(value) || {};
    }
  }
  getValue(value){
    return typeof value === 'function'?value(this.props):value;
  }
  render() {
    var {opened,model} = this.state;
    if(opened !== true){return '';}
    var {backdrop,items,title = '',buttons,reset,style,backdropClose,rowStyle,activeColor,controlColor,textColor,background,titleStyle} = this.props;

    var contextValue = {
      close:this.close.bind(this),
      toggle:this.toggle.bind(this),
      buttonClick:this.buttonClick.bind(this),
      resetCallback:this.resetCallback.bind(this),
      onchange:this.onchange.bind(this),
      validate:this.validate.bind(this),
      mousedown:this.mousedown.bind(this),
      getValue:this.getValue.bind(this),
      touch:this.touch,
      activeColor,controlColor,textColor,background,
      reset,buttons,items,model,title,rowStyle,titleStyle
    }
    return (
      <RPanelContext.Provider value={contextValue}>
        <div className={'r-panel'} ref={this.dom} style={$.extend({},{color:textColor,background},style)}>
          {backdrop && <div className='r-panel-backdrop' onClick={()=>{if(backdropClose){this.close()}}}></div>}
          {
            title && title !== null && 
            <div {...{className:'r-panel-header',[this.touch?'onTouchStart':'onMouseDown']:this.mousedown.bind(this)}}>
              <div className='r-panel-title'>{title}</div>
              <div className='r-panel-close' onClick={this.close.bind(this)}></div>
            </div>
          }
          <div className='r-panel-body'><div className='r-panel-body-container'>
            {items.map((item,i)=><RPanelItem item={item} key={i}/>)}
          </div></div>
          <div className='r-panel-footer'>
            {
              ((reset === true?[{text:'reset',callback:this.resetCallback.bind(this)}]:[]).concat(buttons)).map((btn,i)=>
                <button key ={i} onClick={()=>{this.buttonClick(btn)}}>{btn.text}</button>
              )
            }
          </div>
        </div>
      </RPanelContext.Provider>
    );
  }
}
RPanel.defaultProps = {items:[],buttons:[],width:'300px',alignX:'center',controlColor:'rgb(87, 92, 102)',activeColor:'rgb(255, 102, 0)',textColor:'#fff',background:'rgb(76, 82, 90)'}


class RPanelItem extends Component{
  render(){
    var {item,level = 0} = this.props;
    var {opened = true} = item;
    return (
      <Fragment>
          {
            item.group &&
            <Fragment>
              <RPanelGroup item={item} level={level}/>
              {opened && item.group.map((itm,i)=><RPanelItem item={itm} level={level+1} key={i}/>)}
            </Fragment>
          }
          {!item.group && <RPanelControl item={item} level={level}/>}
        </Fragment>
    );
  }
}
class RPanelControl extends Component{
  static contextType = RPanelContext;
  getStyle(){
    var {level,item} = this.props;
    var {rowStyle = {}} = this.context;
    var style = $.extend({},{paddingLeft:level?(level * 24)+'px':undefined},rowStyle);
    return style;
  }
  isColor(value){
    if(value.indexOf('rgb(') !== -1){return true;}
    if(value.indexOf('rgba(') !== -1){return true;}
    if(value.indexOf('#') !== -1){
      if(value.length === 4 || value.length === 7){return true;}
    }
    return false;
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
  render(){
    const {model,validate,textColor,getValue,activeColor,controlColor,onchange} = this.context;
    var {item} = this.props;
    var {iconClass,iconColor} = item;
    var field = typeof item.field === 'function'?item.field():item.field;
    var value = this.getValueByField(model,field);
    var type = typeof value;
    var validationState = validate(item,value);
    var control;
    if(item.range){control = (<Slider
        className='r-panel-control r-panel-slider'
        style={{padding:'6px'}}
        points={[{value,fillStyle:{background:activeColor,height:'3px'}}]}
        pointStyle={{display:'none'}}
        showValue='fixed'
        valueStyle={{top:'-10px',height:'20px',lineHeight:'20px',background:controlColor,minWidth:'20px',textAlign:'center'}}
        lineStyle={{background:controlColor,height:'3px'}}
        start={item.range[0]} end={item.range[1]} step={item.step}
        min={item.min} max={item.max}
        ondrag={(obj)=>{onchange({field:item.field,value:obj.points[0].value,item});}}
    />)}
    else if(item.buttons && item.buttons.length){control= (
      <div className="r-panel-control r-panel-group-button">
        {
          item.buttons.map((btn,i)=>{
            let active = value === btn.value;
            return (
              <button
                style={{background:controlColor,borderColor:active?activeColor:undefined,color:active?activeColor:undefined}}
                key={i} className={active?'active':undefined}
                onClick={()=>{onchange({field:item.field,value:btn.value,item});}}
              >{btn.text}</button>
            )
        })
      }
      </div>)}
    else if(item.options && item.options.length){
      control=(
        <select
          className='r-panel-control r-panel-select' value={value} style={{background:controlColor}}
          onChange={(e)=>{onchange({field:item.field,value:e.target.value,item})}
        }>
          {item.options.map((option,i)=><option key={i} value={option.value}>{option.text}</option>)}
        </select>
      )
    }
    else if(type === 'string'){
      if(this.isColor(value)){control = 
      <input className='r-panel-control r-panel-color' type='color' onChange={(e)=>{onchange({field:item.field,value:e.target.value,item});}} value={value} style={{background:controlColor}}/>}
      else{
        var listId = 'datalist' + Math.random();
        var list= item.list?<datalist id={listId}>{item.list.map((l,i)=><option value={l} key={i}/>)}</datalist>:undefined
        control = <Fragment>
        <input list={listId}
          style={{background:controlColor}} disabled={item.disabled} maxLength={item.maxLength} type='text'
          className='r-panel-control r-panel-textbox' 
          value={value}
          onChange={(e)=>{onchange({field:item.field,value:e.target.value,item});}}
        />
        {list && list}
      </Fragment>}
    }
    else if(type === 'number'){control = <input {...item} style={{background:controlColor}} type='number' value={value}
        className='r-panel-control r-panel-textbox r-panel-numberbox'
        onChange={(e)=>{onchange({field:item.field,value:parseFloat(e.target.value),item});}}
    />}
    else if(type === 'boolean'){control = <div className='r-panel-control r-panel-checkbox'>
        <div 
          style={{borderColor:textColor,color:activeColor}}
          className={`checkbox${value === true?' checked':''}`}
          onClick={()=>onchange({field:item.field,value:!value,item})}
        ></div>
      </div>}
    else if(item.info || item.warning || item.danger){control = <RPanelAlert item={item} />}
    else if(item.text && item.href){control = <a className='r-panel-control r-panel-list' href={item.href}>{item.text}</a>}
    else if(item.text){control = <div className='r-panel-control r-panel-list'>{getValue(item.text)}</div>}
    return (
      <Fragment>
        <div className='r-panel-item' style={this.getStyle()} onClick={()=>{if(item.callback){item.callback(item)}}}>
          {item.title && <RPanelItemTitle title={getValue(item.title)} field={getValue(item.field)} />}
          {control}
        </div>
        {
          validationState && validationState.state === false &&
          <div className='r-panel-item' style={this.getStyle()}>
            <RPanelAlert item={validationState}/>
          </div>
        }
      </Fragment>
    );
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