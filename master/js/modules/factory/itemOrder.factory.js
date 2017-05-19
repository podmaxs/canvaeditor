(function(){

	'use strict';

	angular.module('app.fac')
	.factory('order', ['inputItem',function(inputItem){
		return function(oid, device, referencia, serial, trabajo, notas){
			var self = this;
			


			this.createOid = function (oid) {
				if(typeof oid == typeof undefined)
					d = 'Odraw'+new Date().getTime()+'ZtO';
				return new inputItem('oid', oid, 'text', undefined, false, undefined, true);
			}

			//define propiedades
			this.oid        = self.createOid(oid);
			this.device     = new inputItem('device', device, 'text', undefined, false, undefined, true);
			this.referencia = new inputItem('referencia', referencia, 'text', undefined, false, undefined, true);
			this.serial     = new inputItem('serial', serial, 'text', undefined, false, undefined, true);
			this.trabajo    = new inputItem('trabajo', trabajo, 'text', undefined, false, undefined, true);
			this.notas      = new inputItem('notas', notas, 'text', undefined, false, undefined, true);
		};
	}])

})();
