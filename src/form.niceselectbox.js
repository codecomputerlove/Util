// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){

	Util.registerNamespace('Code.Util.Form.NiceSelectBox');
	
	Util.Form.NiceSelectBox.NiceSelectBoxClass = Util.BaseClass.extend({
		
		
		el: null,
		wrapperEl: null,
		textEl: null,
		id: null,
		settings: null,
		
		
		focusHandler: null,
		blurHandler: null,
		changeHandler: null,
		keyupHandler: null,
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
			
			this.removeEventHandlers();
			
			Util.DOM.appendChild(this.el, this.wrapperEl.parentNode);
			Util.DOM.removeChild(this.wrapperEl, this.wrapperEl.parentNode);
			
			this.supr();
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(el, settings){
			
			var i, len, selectWidth;
			
			this.el = el;
						
			this.id = Util.DOM.getAttribute(this.el, 'id');
			
			
			this.settings = {
				wrapperCssClass: 'nice-selectbox',
				textCssClass: 'nice-selectbox-text',
				disabledCssClass: 'nice-selectbox-disabled',
				focusCssClass: 'nice-selectbox-focus'
			};

			Util.extend(this.settings, settings);
			
			selectWidth = Util.DOM.width(this.el);
			
			this.wrapperEl = Util.DOM.createElement('div', { class: this.settings.wrapperCssClass });
			this.textEl = Util.DOM.createElement('span', { class: this.settings.textCssClass });
			
			Util.DOM.appendChild(this.wrapperEl, this.el.parentNode);
			Util.DOM.appendChild(this.textEl, this.wrapperEl);
			Util.DOM.appendChild(this.el, this.wrapperEl);
			
			this.updateText();
			
			// Add disabled class if needed
			if (Util.DOM.hasAttribute(this.el, 'disabled')){
				Util.DOM.addClass(this.wrapperEl, this.settings.disabledCssClass);
			}
			else{
				this.addEventHandlers();
			}
			
		},
		
		
		
		/*
		 * Function: updateText
		 */
		updateText: function(){
			
			var selectedText = this.el.options[this.el.selectedIndex].text;
			Util.DOM.removeChildren(this.textEl);
			Util.DOM.appendText(selectedText, this.textEl);
			
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
		 * Function: onFocus
		 */
		onFocus: function(e){
			
			Util.DOM.addClass(this.wrapperEl, this.settings.focusCssClass);
			
		},
		
		
		
		/*
		 * Function: onBlur
		 */
		onBlur: function(e){
			
			Util.DOM.removeClass(this.wrapperEl, this.settings.focusCssClass);
			
		},
		
		
		
		/*
		 * Function: onChange
		 */
		onChange: function(e){
			
			this.updateText();
			
		},
		
		
		
		/*
		 * Function: onKeyUp
		 */
		onKeyUp: function(e){
			
			this.updateText();
			
		}
		
		
	});
		
}
(
	window, 
	window.klass, 
	window.Code.Util
));