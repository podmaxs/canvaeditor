(function(){

	'use strict';

	angular.module('app.fac')
	.factory('order', ['inputItem',function(inputItem){
		return function(oid, marca, modelo, serial, trabajo, notas){
			var self = this;
			
			this.oid      = new inputItem('oid', oid, 'text', undefined, false, undefined, true);
			this.marca    = new inputItem('marca', marca, 'text', undefined, false, undefined, true);
			this.modelo   = new inputItem('modelo', modelo, 'text', undefined, false, undefined, true);
			this.serial   = new inputItem('serial', serial, 'text', undefined, false, undefined, true);
			this.trabajo  = new inputItem('trabajo', trabajo, 'text', undefined, false, undefined, true);
			this.notas    = new inputItem('notas', notas, 'text', undefined, false, undefined, true);



		};
	}])

})();
