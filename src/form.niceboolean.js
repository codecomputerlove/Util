// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.Util.Form.NiceBoolean');
	
	var NiceBoolean = Code.Util.Form.NiceBoolean;
	NiceBoolean.instances = [];
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.attach
	 */
	NiceBoolean.attach = function(els, options){
		
		var i, len;
		
		if (Util.isLikeArray(els)){
			for (i=0, len=els.length; i<len; i++){
				NiceBoolean.attachElement(els[i], options);
			}
		}
		else{
			NiceBoolean.attachElement(els, options);
		}
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.attachElement
	 */
	NiceBoolean.attachElement = function(el, options){
		
		var 
			currentInstanceIndex = Util.arrayIndexOf(Util.DOM.getAttribute(el, 'id'), NiceBoolean.instances, 'id'),
			instance;
		if (currentInstanceIndex > -1){
			return NiceBoolean.instances[currentInstanceIndex]; 
		}
		
		instance = new NiceBoolean.NiceBooleanClass(el, options);
		
		NiceBoolean.instances.push(instance);
		
		return instance;
	
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.detatch
	 */
	NiceBoolean.detatch = function(els){
		
		var i, len;
		
		if (Util.isLikeArray(els)){
			for (i=0, len=els.length; i<len; i++){
				NiceBoolean.detatchElement(els[i]);
			}
		}
		else{
			NiceBoolean.detatchElement(els);
		}
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.detatchElement
	 */
	NiceBoolean.detatchElement = function(el){
		
		var currentInstanceIndex = Util.arrayIndexOf(Util.DOM.getAttribute(el, 'id'), NiceBoolean.instances, 'id');
		if (currentInstanceIndex < 0){
			return;
		}
		
		NiceBoolean.disposeInstance(NiceBoolean.instances[currentInstanceIndex]);
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.getInstance
	 */
	NiceBoolean.getInstance = function(id){
		
		var index = Util.arrayIndexOf(id, NiceBoolean.instances, 'id');
		if (index < 0){
			return null;
		}
		return NiceBoolean.instances[index];
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceBoolean.disposeInstance
	 */
	NiceBoolean.disposeInstance = function(instance){
		
		var instanceIndex = Util.arrayIndexOf(instance, NiceBoolean.instances);
		
		if (instanceIndex < 0){
			return;
		}
		
		instance.dispose();
		NiceBoolean.instances.splice(instanceIndex, 1);
		instance = null;
	
	};
	
	
	
	/*
	 * jQuery plugin
	 */
	if (window.jQuery){
		
		window.jQuery.fn.cclNiceBoolean = function(options){
			
			return this.each(function(){
				NiceBoolean.attachElement(this);
			});
			
		}
	
	}
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));