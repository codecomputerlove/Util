// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.Util.Form.NiceSelectBox');
	
	var NiceSelectBox = Code.Util.Form.NiceSelectBox;
	NiceSelectBox.instances = [];
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.attach
	 */
	NiceSelectBox.attach = function(els, options){
		
		var i, len;
		
		if (Util.isLikeArray(els)){
			for (i=0, len=els.length; i<len; i++){
				NiceSelectBox.attachElement(els[i], options);
			}
		}
		else{
			NiceSelectBox.attachElement(els, options);
		}
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.attachElement
	 */
	NiceSelectBox.attachElement = function(el, options){
		
		var 
			currentInstanceIndex = Util.arrayIndexOf(Util.DOM.getAttribute(el, 'id'), NiceSelectBox.instances, 'id'),
			instance;
		if (currentInstanceIndex > -1){
			return NiceSelectBox.instances[currentInstanceIndex]; 
		}
		
		instance = new NiceSelectBox.NiceSelectBoxClass(el, options);
		
		NiceSelectBox.instances.push(instance);
		
		return instance;
	
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.detatch
	 */
	NiceSelectBox.detatch = function(els){
		
		var i, len;
		
		if (Util.isLikeArray(els)){
			for (i=0, len=els.length; i<len; i++){
				NiceSelectBox.detatchElement(els[i]);
			}
		}
		else{
			NiceSelectBox.detatchElement(els);
		}
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.detatchElement
	 */
	NiceSelectBox.detatchElement = function(el){
		
		var currentInstanceIndex = Util.arrayIndexOf(Util.DOM.getAttribute(el, 'id'), NiceSelectBox.instances, 'id');
		if (currentInstanceIndex < 0){
			return;
		}
		
		NiceSelectBox.disposeInstance(NiceSelectBox.instances[currentInstanceIndex]);
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.getInstance
	 */
	NiceSelectBox.getInstance = function(id){
		
		var index = Util.arrayIndexOf(id, NiceSelectBox.instances, 'id');
		if (index < 0){
			return null;
		}
		return NiceSelectBox.instances[index];
		
	};
	
	
	
	/*
	 * Function: Code.Util.Form.NiceSelectBox.disposeInstance
	 */
	NiceSelectBox.disposeInstance = function(instance){
		
		var instanceIndex = Util.arrayIndexOf(instance, NiceSelectBox.instances);
		
		if (instanceIndex < 0){
			return;
		}
		
		instance.dispose();
		NiceSelectBox.instances.splice(instanceIndex, 1);
		instance = null;
	
	};
	
	
	
	/*
	 * jQuery plugin
	 */
	if (window.jQuery){
		
		window.jQuery.fn.cclNiceSelectBox = function(options){
			
			return this.each(function(){
				NiceSelectBox.attachElement(this);
			});
			
		}
	
	}
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));