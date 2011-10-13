// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){

	Util.registerNamespace('Code.Util.Form.NiceBoolean');
	
	Util.Form.NiceBoolean.NiceBooleanClass = Util.BaseClass.extend({
		
		
		el: null,
		labelEls: null,
		relatedEls: null,
		id: null,
		name: null,
		settings: null,
		isRadio: null,
		
		
		focusHandler: null,
		blurHandler: null,
		changeHandler: null,
		keyupHandler: null,
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
			
			this.removeEventHandlers();
			if (!Util.isNothing(this.labelEls)){
				Util.DOM.removeClass(this.labelEls, this.settings.checkedCssClass);
				Util.DOM.removeClass(this.labelEls, this.settings.hoverCssClass);
				Util.DOM.removeClass(this.labelEls, this.settings.disabledCssClass);
				Util.DOM.removeClass(this.labelEls, this.settings.focusCssClass);
			}
			this.supr();
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(el, settings){
			
			var i, len;
			
			this.el = el;
						
			this.id = Util.DOM.getAttribute(this.el, 'id');
			this.name = Util.DOM.getAttribute(this.el,'name');
			this.labelEls = Util.DOM.find('label[for="' + this.id + '"]');
			this.isRadio = (Util.DOM.getAttribute(this.el, 'type') === 'radio');
			
			if (this.isRadio && this.name !== ''){
				this.relatedEls = Util.DOM.find('input[name="' + this.name + '"]');
			}
			
			this.settings = {
				checkedCssClass: 'checked',
				disabledCssClass: 'disabled',
				focusCssClass: 'focus'
			};

			Util.extend(this.settings, settings);
			
			// Determine whether it's disabled or not
			if (Util.DOM.hasAttribute(this.el, 'disabled')){
				Util.DOM.addClass(this.labelEls, this.settings.disabledCssClass);
			}
			else{
				Util.DOM.removeClass(this.labelEls, this.settings.disabledCssClass);
				this.addEventHandlers();
			}
			
			this.setLabelToMatchCheckedState();
			
		},
		
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
			
			if (Util.isNothing(this.focusHandler)){
				this.focusHandler = this.onFocus.bind(this);
				this.blurHandler = this.onBlur.bind(this);
				this.changeHandler = this.onChange.bind(this);
				this.keyUpHandler = this.onKeyUp.bind(this);
			}
			else{
				this.removeEventHandlers();
			}
			
			Util.Events.add(this.el, 'focus', this.focusHandler);
			Util.Events.add(this.el, 'blur', this.blurHandler);
			Util.Events.add(this.el, 'change', this.changeHandler);
			Util.Events.add(this.el, 'keyup', this.keyUpHandler);
			
		},
		
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
			
			if (!Util.isNothing(this.focusHandler)){
				Util.Events.remove(this.el, 'focus', this.focusHandler);
				Util.Events.remove(this.el, 'blur', this.blurHandler);
				Util.Events.remove(this.el, 'change', this.changeHandler);
				Util.Events.remove(this.el, 'keyup', this.keyUpHandler);
			}
			
		},
		
		
		
		/*
		 * Function: isChecked
		 */
		isChecked: function(){
			
			return this.el.checked;
			
		},
		
		
		
		/*
		 * Function: setLabelToMatchCheckedState
		 */
		setLabelToMatchCheckedState: function(){
			
			if (Util.isNothing(this.labelEls)){
				return;
			}
			
			var i, len, relatedId, relatedLabelEls;
			
			if (this.isChecked()){
				Util.DOM.addClass(this.labelEls, this.settings.checkedCssClass);
				
				if (Util.isArray(this.relatedEls)){
					
					// Set the labels of related radio buttons to unchecked
					for (i=0, len=this.relatedEls.length; i<len; i++){
						
						relatedId = Util.DOM.getAttribute(this.relatedEls[i], 'id');
						if (relatedId !== this.id){
							relatedLabelEls = Util.DOM.find('label[for="' + relatedId + '"]');
							Util.DOM.removeClass(relatedLabelEls, this.settings.checkedCssClass);
						}
						
					}
					
				}
				
			}
			else{
				Util.DOM.removeClass(this.labelEls, this.settings.checkedCssClass);
			}
			
		},
		
		
		
		/*
		 * Function: check
		 */
		check: function(){
			
			this.el.checked = true;
			this.setLabelToMatchCheckedState();
			
		},
		
		
		
		/*
		 * Function: unCheck
		 */
		unCheck: function(){
			
			this.el.checked = false;
			this.setLabelToMatchCheckedState();
			
		},
		
		
		
		/*
		 * Function: onFocus
		 */
		onFocus: function(e){
			
			Util.DOM.addClass(this.labelEls, this.settings.focusCssClass);
			
		},
		
		
		
		/*
		 * Function: onBlur
		 */
		onBlur: function(e){
			
			Util.DOM.removeClass(this.labelEls, this.settings.focusCssClass);
			
		},
		
		
		
		/*
		 * Function: onChange
		 */
		onChange: function(e){
			
			this.setLabelToMatchCheckedState();
			
		},
		
		
		
		/*
		 * Function: onKeyUp
		 */
		onKeyUp: function(e){
			
			if(e.keyCode === 32) {
				this.setLabelToMatchCheckedState();
			}
			
		}
		
		
	});
		
}
(
	window, 
	window.klass, 
	window.Code.Util
));