(function(){

	'use strict';

	angular.module('app.fac')
	.factory('itemFicha', ['entidad',function(entidad){
		return function(ent, orders){
			var self = this;

			this.entidad = typeof ent != typeof entidad?new entidad():ent;
			this.nro     = new Date().getTime();
			this.orders  = Array.isArray(orders)?orders:[];


		};
	}])

})();