!function(){var moduleFactory=function($){var module=this;var exports=function(){var radioCheck=/radio|checkbox/i,keyBreaker=/[^\[\]]+/g,numberMatcher=/^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/;var isNumber=function(value){if(typeof value=="number"){return true}if(typeof value!="string"){return false}return value.match(numberMatcher)};$.fn.extend({formParams:function(params,convert){if(!!params===params){convert=params;params=null}if(params){return this.setParams(params)}else if(this[0].nodeName.toLowerCase()=="form"&&this[0].elements){return $($.makeArray(this[0].elements)).getParams(convert)}return $("input[name], textarea[name], select[name]",this[0]).getParams(convert)},setParams:function(params){this.find("[name]").each(function(){var value=params[$(this).attr("name")],$this;if(value!==undefined){$this=$(this);if($this.is(":radio")){if($this.val()==value){$this.attr("checked",true)}}else if($this.is(":checkbox")){value=$.isArray(value)?value:[value];if($.inArray($this.val(),value)>-1){$this.attr("checked",true)}}else{$this.val(value)}}})},getParams:function(convert){var data={},current;convert=convert===undefined?false:convert;this.each(function(){var el=this,type=el.type&&el.type.toLowerCase();if(type=="submit"||!el.name){return}var key=el.name,value=$.data(el,"value")||$.fn.val.call([el]),isRadioCheck=radioCheck.test(el.type),parts=key.match(keyBreaker),write=!isRadioCheck||!!el.checked,lastPart;if(convert){if(isNumber(value)){value=parseFloat(value)}else if(value==="true"){value=true}else if(value==="false"){value=false}if(value===""){value=undefined}}current=data;for(var i=0;i<parts.length-1;i++){if(!current[parts[i]]){current[parts[i]]={}}current=current[parts[i]]}lastPart=parts[parts.length-1];if(current[lastPart]){if(!$.isArray(current[lastPart])){current[lastPart]=current[lastPart]===undefined?[]:[current[lastPart]]}if(write){current[lastPart].push(value)}}else if(write||!current[lastPart]){current[lastPart]=write?value:undefined}});return data}})};exports();module.resolveWith(exports)};dispatch("mvc/dom.form_params").containing(moduleFactory).to("Foundry/2.1 Modules")}();