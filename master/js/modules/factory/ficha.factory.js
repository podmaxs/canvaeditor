	(function(){

		'use strict';

		angular.module('app.fac')
		.factory('ficha', ['inputItem','oAuth',function(inputItem,oAuth){
			return function(eid, fid, nro, date, state){
				var self = this;
				var uid     = oAuth.getCurrent().uid;

				this.params = ['nro', 'eid','owner', 'date', 'state'];
				
				this.fid    = new inputItem('fid', fid, 'text', undefined, false, undefined, true);
				this.nro    = new inputItem('nro', nro || new Date().getTime(), 'number', undefined, false, undefined, true);
				this.eid    = new inputItem('eid', eid, 'number', undefined, false, undefined, true);
				this.date   = new inputItem('date', date || new Date().toString(), 'date', undefined, false, undefined, true);
				this.state  = new inputItem('state', state || 'draft', 'text', undefined, false, undefined, true);;
				this.owner  = new inputItem('owner', uid, 'text', undefined, false, undefined, true);
				
				this.get = function(){
					var ficha = {};
					for(var p in this.params){
						var param = this.params[p];
						ficha[param] = this[param].get();
					}
					return ficha;
				};


			};
		}]);

	})();