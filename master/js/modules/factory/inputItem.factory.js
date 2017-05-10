(function(){

	'use strict';

	angular.module('app.fac')
	.factory('inputItem', [function(){
		return function(name, value, type, filter, pattern, placeholder, required){
			var self = this;
			this.error       = false;
			this.log         = '';

			// sets atributes
			this.name        = name != undefined?name:'text';
			this.value       = value == undefined?'':value;
			this.type        = type == undefined?'text':type;
			this.pattern     = pattern == undefined?'':pattern;
			this.placeholder = placeholder == undefined?'':placeholder;
			this.required    = required == undefined?false:required;
			this.filter      = filter;
			// end

			this.get = function(){
				self.error = false;
				self.error = !self.valid();
				if(self.error && self.log == '')
					self.log = self.required?'The '+self.name+' is invalid and is required':'The '+self.name+' is invalid';
				else
					self.log = '';
				return self.value;
			};

			this.valid = function(){
				self.log = '';
				if(typeof self.pattern == 'function')
					return self.pattern(self.value);
				if(typeof self.pattern == 'object')
					return self.pattern.test(self.value);
				return (self.required && self.value != '') || !self.required;
			}

		};
	}]);
})();
