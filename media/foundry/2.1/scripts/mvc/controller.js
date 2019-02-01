!function(){var moduleFactory=function($){var module=this;$.require().script("mvc/class","mvc/lang.string","mvc/event.destroyed").done(function(){var exports=function(){var bind=function(el,ev,callback){var wrappedCallback,binder=el.bind&&el.unbind?el:$(isFunction(el)?[el]:el);if(ev.indexOf(">")===0){ev=ev.substr(1);wrappedCallback=function(event){if(event.target===el){callback.apply(this,arguments)}}}binder.bind(ev,wrappedCallback||callback);return function(){binder.unbind(ev,wrappedCallback||callback);el=ev=callback=wrappedCallback=null}},makeArray=$.makeArray,isArray=$.isArray,isFunction=$.isFunction,extend=$.extend,Str=$.String,each=$.each,STR_PROTOTYPE="prototype",STR_CONSTRUCTOR="constructor",slice=Array[STR_PROTOTYPE].slice,delegate=function(el,selector,ev,callback){if(selector.indexOf(">")===0){selector=(el.data("directSelector")+" "||"")+selector}var binder=el.delegate&&el.undelegate?el:$(isFunction(el)?[el]:el);binder.delegate(selector,ev,callback);return function(){binder.undelegate(selector,ev,callback);binder=el=ev=callback=selector=null}},binder=function(el,ev,callback,selector){return selector?delegate(el,selector,ev,callback):bind(el,ev,callback)},shifter=function shifter(context,name){var method=typeof name=="string"?context[name]:name;return function(){context.called=name;return method.apply(context,[this.nodeName?$(this):this].concat(slice.call(arguments,0)))}},dotsReg=/\./g,controllersReg=/_?controllers?/gi,underscoreAndRemoveController=function(className){return Str.underscore(className.replace($.globalNamespace+".","").replace(dotsReg,"_").replace(controllersReg,""))},actionMatcher=/^\S(.*)\s(.*)/,parameterReplacer=/\{([^\}]+)\}/g,breaker=/^(?:(.*?)\s)?([\w\.\:>]+)$/,basicProcessor,data=function(el,data){return $.data(el,"controllers",data)};$.Class($.globalNamespace+".Controller",{setup:function(){this._super.apply(this,arguments);if(!this.shortName||this.fullName==$.globalNamespace+".Controller"){return}this._fullName=underscoreAndRemoveController(this.fullName);this._shortName=underscoreAndRemoveController(this.shortName);var _prototype=arguments[3],proto;if(isFunction(_prototype)){this.protoFactory=_prototype;proto=this.protoFactory.call(this,null)}var controller=this,funcName,forLint;if(this.isPlugin){var pluginname=this.pluginName||this._fullName;if(!$.fn[pluginname]){$.fn[pluginname]=function(options){var args=makeArray(arguments),isMethod=typeof options=="string"&&isFunction(controller[STR_PROTOTYPE][options]),meth=args[0];return this.each(function(){var controllers=data(this),plugin=controllers&&controllers[pluginname];if(plugin){if(isMethod){plugin[meth].apply(plugin,args.slice(1))}else{plugin.update.apply(plugin,args)}}else{controller.newInstance.apply(controller,[this].concat(args))}})}}}this.actions={};proto=proto||this[STR_PROTOTYPE];for(funcName in proto){if(funcName=="constructor"||!isFunction(proto[funcName])){continue}if(this._isAction(funcName)){this.actions[funcName]=this._action(funcName)}}},hookup:function(el){return new this(el)},_isAction:function(methodName){if(actionMatcher.test(methodName)){return true}else{return $.inArray(methodName,this.listensTo)>-1||$.event.special[methodName]||processors[methodName]}},_action:function(methodName,options){parameterReplacer.lastIndex=0;if(!options&&parameterReplacer.test(methodName)){return null}var ready=[],evt,parts;if(methodName.match(/^\[.+\]/)){methodNames=methodName.replace(/^\[|\]/g,"").replace(", ",",").split(" ");evt=methodNames.pop();methodNames=methodNames[0].split(",")}else{methodNames=[methodName]}$.each(methodNames,function(i,methodName){methodName=methodName.replace("{self} ","");var convertedName=options?Str.sub(methodName,[options,window]):methodName,arr=isArray(convertedName),parts=evt?[convertedName+" "+evt,convertedName,evt]:(arr?convertedName[1]:convertedName).match(breaker),event=evt||parts[2],processor=processors[event]||basicProcessor;ready.push({processor:processor,parts:parts,delegate:arr?convertedName[0]:undefined})});return ready},processors:{},listensTo:[],defaults:{}},{setup:function(element,options){var funcName,ready,cls=this[STR_CONSTRUCTOR];if(cls.protoFactory){var proto=cls.protoFactory.call(cls,this);$.extend(true,this,proto)}this.bind=this._bind;element=(typeof element=="string"?$(element):element.jquery?element:[element])[0];var pluginname=cls.pluginName||cls._fullName;this.element=$(element);(data(element)||data(element,{}))[pluginname]=this;this.instanceId=$.uid(cls._fullName+"_");if(this.element.data("directSelector")===undefined){var selector=$.uid("DS");this.element.data("directSelector","."+selector);this.element.addClass(selector)}this.options=extend(true,{},cls.defaults,cls.defaultOptions,options);for(prop in this.options){if(prop.match(/^\{.+\}$/)){var selector=this.options[prop],propFunc=prop.replace(/^\{|\}$/g,"");this[propFunc]=function(instance,selector,propFunc){if(typeof selector!=="string")return selector;selector=/^(\.|\#)$/.test(selector)?selector+propFunc:selector;var selectorFunc=function(filter){return filter?instance.element.find(selector).filter(filter):instance.element.find(selector)};selectorFunc.selector=selector;return selectorFunc}(this,selector,propFunc)}}var instance=this,views=this.options.view;var __view=instance.view;instance.view=function(){return __view.apply(this,arguments)};if($.isPlainObject(views)){$.each(views,function(view){instance.view[view]=function(){var args=$.makeArray(arguments),useHtml=false;if(typeof args[0]=="boolean"){useHtml=args[0];args=args.slice(1)}var options=[useHtml,view].concat(args);return instance.view.apply(instance,options)}})}$.extend(this,this.options.controller);this.called="init";this.bind();return[this.element,this.options].concat(makeArray(arguments).slice(2))},_bind:function(el,eventName,func){if(el===undefined){this._bindings=[];var cls=this[STR_CONSTRUCTOR],bindings=this._bindings,actions=cls.actions,element=this.element;for(funcName in actions){if(actions.hasOwnProperty(funcName)){readyList=cls.actions[funcName]||cls._action(funcName,this.options);var self=this;$.each(readyList,function(i,ready){self._bindings.push(ready.processor(ready.delegate||element,ready.parts[2],ready.parts[1],funcName,self))})}}var destroyCB=shifter(this,"destroy");element.bind("destroyed",destroyCB);bindings.push(function(el){$(el).unbind("destroyed",destroyCB)});return bindings.length}if(typeof el=="string"){func=eventName;eventName=el;el=this.element}return this._binder(el,eventName,func)},_binder:function(el,eventName,func,selector){if(typeof func=="string"){func=shifter(this,func)}this._bindings.push(binder(el,eventName,func,selector));return this._bindings.length},_unbind:function(){var el=this.element[0];each(this._bindings,function(key,value){value(el)});this._bindings=[]},trigger:function(){this.element.trigger.apply(this.element,arguments)},delegate:function(element,selector,eventName,func){if(typeof element=="string"){func=eventName;eventName=selector;selector=element;element=this.element}return this._binder(element,eventName,func,selector)},update:function(options){extend(this.options,options);this._unbind();this.bind()},destroy:function(){if(this._destroyed){try{console.error(this[STR_CONSTRUCTOR].shortName+" controller already deleted")}catch(e){}return}var self=this,fname=this[STR_CONSTRUCTOR].pluginName||this[STR_CONSTRUCTOR]._fullName,controllers;this._destroyed=true;this.element.removeClass(fname);this._unbind();delete this._actions;delete this.element.data("controllers")[fname];$(this).triggerHandler("destroyed");this.element=null},find:function(selector){return this.element.find(selector)},view:function(){var args=$.makeArray(arguments),name,options=args,useHtml=false,context=this[STR_CONSTRUCTOR].component||$,html="",view=this.options.view||{};if(typeof args[0]=="boolean"){useHtml=args[0];options=args.slice(1)}name=options[0]=view[options[0]];if(name==undefined){return useHtml?"":$("")}html=context.View.apply(context,options);return useHtml?html:$(html)},_set_called:true});var processors=$.Controller.processors,basicProcessor=function(el,event,selector,methodName,controller){return binder(el,event,shifter(controller,methodName),selector)};each("change click contextmenu dblclick keydown keyup keypress mousedown mousemove mouseout mouseover mouseup reset resize scroll select submit focusin focusout mouseenter mouseleave".split(" "),function(i,v){processors[v]=basicProcessor});var i,isAControllerOf=function(instance,controllers){for(i=0;i<controllers.length;i++){if(typeof controllers[i]=="string"?instance[STR_CONSTRUCTOR]._shortName==controllers[i]:instance instanceof controllers[i]){return true}}return false};$.fn.extend({controllers:function(){var controllerNames=makeArray(arguments),instances=[],controllers,c,cname;this.each(function(){controllers=$.data(this,"controllers");for(cname in controllers){if(controllers.hasOwnProperty(cname)){c=controllers[cname];if(!controllerNames.length||isAControllerOf(c,controllerNames)){instances.push(c)}}}});return instances},controller:function(controller){return this.controllers.apply(this,arguments)[0]},implement:function(controller,options,callback){var elements=this,controllerName;if(typeof controller==="string"){controllerName=controller;controller=$.String.getObject(controllerName)}if(controller!==undefined){$.each(elements,function(){var instance=new controller(this,options);callback&&callback.apply(instance)})}return this}})};exports();module.resolveWith(exports)})};dispatch("mvc/controller").containing(moduleFactory).to("Foundry/2.1 Modules")}();