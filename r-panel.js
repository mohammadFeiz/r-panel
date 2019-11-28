import React, { Component,createRef,Fragment,createContext } from 'react';
import './index.css';
import Slider from '@mohamadfeiz/r-slider';
import $ from 'jquery';
import RActions from 'r-actions';
var {getValueByField,setValueByField,eventHandler,getClient} = new RActions();
const RPanelContext = createContext();
export default class RPanel extends Component {
  constructor(props){
    super(props);
    this.touch = 'ontouchstart' in document.documentElement;
    var {opened = false} = this.props;
    this.state = {opened};
    this.dom = createRef();
    this.errors = [];
  }
  static getDerivedStateFromProps(props,state){
    //در این کامپوننت مدل پروپس فقط از بیرون می تواند تغییر کند
    if(JSON.stringify(props.model) !== state.prevModel){ // اگر مدل پروپس از بیرون ارسال شد
      return {
        model:props.model,
        prevModel:JSON.stringify(props.model),
        initModel:state.initModel || props.model
      }; 
    }
    if(props.opened !== state.opened){return {opened:props.opened}}
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
  mousedown(e){
    if(!this.props.movable){return;}
    var dom = $(this.dom.current);
    this.startOffset = {client:getClient(e),offset:dom.offset(),dom}
    eventHandler('window','mousemove',$.proxy(this.mousemove,this));
    eventHandler('window','mouseup',$.proxy(this.mouseup,this));
  }
  mousemove(e){
    var {dom,client,offset} = this.startOffset;
    var CLIENT = getClient(e);
    dom.css({left:offset.left + (CLIENT.x - client.x),top:offset.top + (CLIENT.y - client.y)})
  }
  mouseup(){
    eventHandler('window','mousemove',this.mousemove,'unbind');
    eventHandler('window','mouseup',this.mouseup,'unbind');
  }
  onchange(obj){
    var {onchange} = this.props;
    var {model} = this.state;
    model = JSON.parse(JSON.stringify(model));
    if(Array.isArray(obj)){
      for(var i = 0; i < obj.length; i++){
        setValueByField(model,obj[i].field,obj[i].value);  
      }
    }
    else{
      setValueByField(model,obj.field,obj.value); 
    }
    if(onchange){onchange(model);}
    else{this.setState({model});}  
    
  }
  validate(item,value){
    if(item.validation){
      return item.validation(value) || {};
    }
  }
  render() {
    var {opened,model} = this.state;
    if(opened !== true){return '';}
    var {backdrop,items,title = '',buttons,reset,style,backdropClose,rowStyle} = this.props;

    var contextValue = {
      close:this.close.bind(this),
      toggle:this.toggle.bind(this),
      buttonClick:this.buttonClick.bind(this),
      resetCallback:this.resetCallback.bind(this),
      onchange:this.onchange.bind(this),
      validate:this.validate.bind(this),
      mousedown:this.mousedown.bind(this),
      touch:this.touch,
      reset,buttons,items,model,title,rowStyle
    }
    return (
      <RPanelContext.Provider value={contextValue}>
        <div className={'r-panel'} ref={this.dom} style={style}>
          {backdrop && <div className='r-panel-backdrop' onClick={()=>{if(backdropClose){this.close()}}}></div>}
          <RPanelHeader />
          <RPanelBody />
          <RPanelFooter />
        </div>
      </RPanelContext.Provider>
    );
  }
}
RPanel.defaultProps = {items:[],buttons:[],width:'300px',alignX:'center'}

class RPanelBody extends Component{
  static contextType = RPanelContext;
  render(){
    var {items} = this.context;
    var Items = items.map((item,i)=>{    
      return (
        <RPanelItem item={item} key={i}/>
      )
    });
    return (<div className='r-panel-body'>{Items}</div>);
  }
}
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
              { opened && 
                item.group.map((itm,i)=>{
                  return <RPanelItem item={itm} level={level+1} key={i}/>
                })
              }
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
    var style = rowStyle;
    style.paddingLeft = (level * 16 + (item.group?0:24))+'px';
    return style;
  }
  render(){
    const {model,validate} = this.context;
    var {item} = this.props;
    var {iconClass} = item;
    var value = getValueByField(model,item.field);
    var validationState = validate(item,value); 
    var control;
    if(item.range && item.field1 && item.field2){control = <RPanelRangeSlider item={item} model={model}/>}
    else if(item.range){control = <RPanelSlider item={item} value={value}/>}
    else if(item.buttons && item.buttons.length){control= <RPanelGroupButton item={item} value={value}/>}
    else if(item.options && item.options.length){control = <RPanelSelect item={item} value={value}/>}
    else if(typeof value === 'string'){control = <RPanelTextbox item={item} value={value}/>}
    else if(typeof value === 'number'){control = <RPanelNumberbox item={item} value={value}/>}
    else if(typeof value === 'boolean'){control = <RPanelCheckbox item={item} value={value}/>}
    else if(item.info || item.warning || item.danger){control = <RPanelAlert item={item} />}
    else if(item.text && item.href){control = <RPanelLink item={item}/>}
    else if(item.text){control = <RPanelList item={item}/>}
    return (
      <Fragment>
        <div className='r-panel-item' style={this.getStyle()} onClick={()=>{if(item.callback){item.callback(item)}}}>
          {iconClass && <div className={`icon ${iconClass}`}></div>}
          {item.title && <RPanelItemTitle item={item} />}
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
    var style = {paddingLeft:(level * 16)+'px'}
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
    var {opened = true,iconClass} = item;
    return (
      <div className='r-panel-item r-panel-group' style={this.getStyle()} onClick={this.click.bind(this)}>
        <div className={`r-panel-collapse ${opened?'opened':'closed'}`}></div>
        {iconClass && <div className={`icon ${iconClass}`}></div>}
        <div className='r-panel-group-name'>{item.title}</div>
      </div>
    );
  }
}

class RPanelItemTitle extends Component{ 
  static contextType = RPanelContext;
  render(){
    const {item} = this.props;
    return (<div className='r-panel-item-title'>{item.title || item.field}</div>);
  }
}
class RPanelList extends Component{
  render(){
    const {item} = this.props;
    var {text} = item;
    return (
      <div className='r-panel-control r-panel-list'>
      {text}
      </div>
    );
  }
}

class RPanelLink extends Component{
  render(){
    const {item} = this.props;
    var {text,href} = item;
    return (
      <a className='r-panel-control r-panel-list' href={href}>
        {text}
      </a>
    );
  }
}


class RPanelSlider extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange} = this.context;
    return (
      <Slider 
        className='r-panel-control r-panel-slider'
        points={[{value}]}
        showValue='fix'
        start={item.range[0]} end={item.range[1]} step={item.step}  
        min={item.min} max={item.max}
        onchange={(obj)=>{onchange({field:item.field,value:obj.points[0].value});}}
      />
    )
  }
}

class RPanelRangeSlider extends Component{ 
  static contextType = RPanelContext;
  render(){
    const {item,model} = this.props;
    const {onchange} = this.context;
    var value1 = getValueByField(model,item.field1);
    var value2 = getValueByField(model,item.field2);
    return (
      <Slider 
        className='r-panel-control r-panel-slider r-panel-range-slider'
        points={[{value:value1},{value:value2}]}
        point_width={30} point_height={20} thickness={2}
        showValue='fix'
        start={item.range[0]} end={item.range[1]} step={item.step}  
        min={item.min} max={item.max}
        onchange={
          (obj)=>{
            onchange([
              {field:item.field1,value:obj.points[0].value},
              {field:item.field2,value:obj.points[1].value}
            ]);
          }
        }
      />
    )
  }
}

class RPanelGroupButton extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange}= this.context;
    return (
      <div className="r-panel-control r-panel-group-button">
      {
        item.buttons.map((btn,i)=>{
          return (
            <button 
              key={i} 
              className={value === btn.value?'active':undefined} 
              onClick={()=>{onchange({field:item.field,value:btn.value});}}
            >
              {btn.text}
            </button>
          )
        })
      }
      </div>   
    );
  }
}

class RPanelSelect extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange}= this.context;
    return (
      <select 
        className='r-panel-control r-panel-select'
        value={value}
        onChange={(e)=>{
          onchange({field:item.field,value:e.target.value});
        }}
      >
      {
        item.options.map((option,i)=>{
          return <option key={i} value={option.value}>{option.text}</option>
        })
      }
      </select>
    );
  }
}

class RPanelTextbox extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange}= this.context;
    var list,listId;
    if(item.list){
      listId = 'datalist' + Math.random();
      list = (
        <datalist id={listId}>
          {
            item.list.map((l,i)=>{
              return (
                <option value={l} key={i}/>
              )
            })
          }
        </datalist>
      )
    }
    return (
      <Fragment>
        <input
          list={listId} 
          disabled={item.disabled}
          maxLength={item.maxLength}
          type='text' 
          className='r-panel-control r-panel-textbox'
          value={value} 
          onChange={(e)=>{onchange({field:item.field,value:e.target.value});}} 
        />
        {
          list && list
        }
      </Fragment>
    );
  }
}

class RPanelNumberbox extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange}= this.context;
    return (
      <input 
        {...item}
        type='number'
        className='r-panel-control r-panel-textbox r-panel-numberbox'
        value={value} 
        onChange={(e)=>{onchange({field:item.field,value:parseFloat(e.target.value)});}}
      />  
    );
  }
}


class RPanelCheckbox extends Component{
  static contextType = RPanelContext;
  render(){
    const {item,value} = this.props;
    const {onchange}= this.context;
    return (
      <div className='r-panel-control r-panel-checkbox'>
        <input 
          type='checkbox'
          checked={value === true} 
          onChange={(e)=>{
            onchange({field:item.field,value:e.target.checked});
          }}  
        />
      </div> 
    );
  }
}

class RPanelAlert extends Component{
  static contextType = RPanelContext;
  render(){
    const {item} = this.props;
    var {info,warning,danger} = item;
    var message,type;
    if(danger){message = danger; type = 'danger';}
    else if(warning){message = warning; type = 'warning';}
    else if(info){message = info; type = 'info';}
    return (
      <div className={`r-panel-control r-panel-alert ${type}`}>
        {message}
      </div>
    )
  }
}

class RPanelHeader extends Component{
  static contextType = RPanelContext;
  render(){
    const {title = null,close,mousedown,touch}= this.context;
    if(title === null){return '';}
    var props = {className:'r-panel-header',[touch?'onTouchStart':'onMouseDown']:mousedown};
    return (
      <div {...props}>
          <div className='r-panel-title'>{title}</div>
          <div className='r-panel-close' onClick={close}></div>
      </div>
    )
  }
}

class RPanelFooter extends Component{
  static contextType = RPanelContext;
  render(){
    const {buttons = [],buttonClick,reset,resetCallback}= this.context;
    var resetBtn = reset === true?[{text:'reset',callback:resetCallback}]:[];
    var btns = resetBtn.concat(buttons);
    if(!btns.length){return '';}
    return (
      <div className='r-panel-footer'>
        {btns.map((btn,i)=>{
          return <button key ={i} onClick={()=>{buttonClick(btn)}}>{btn.text}</button>
        })}
      </div>
    )
  }
}
