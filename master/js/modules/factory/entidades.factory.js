(function(){

	'use strict';

	angular.module('app.fac')
	.factory('entidad', ['$http', 'inputItem',function($http, inputItem){
		return function(eid, referencia, nombre, apellido, telefono, direccion, email){
			var self = this;
				
				this.error = false;
				this.keys  = [
					'referencia',
					'nombre',
					'apellido',
					'email',
					'telefono',
					'direccion'
				];

				// declaracion de propiedades
				this.eid        = new inputItem('eid', eid, 'text', undefined, false, undefined, true);
				this.referencia = new inputItem('referencia', referencia, 'text', undefined, false, 'Referencia', true);
				this.nombre     = new inputItem('nombre', nombre, 'text', undefined, false, 'Nombre', true);
				this.apellido   = new inputItem('apellido', apellido, 'text', undefined, false, 'Apellido', true);
				this.telefono   = new inputItem('telefono', telefono, 'text', undefined, false, 'Telefono', true);
				this.direccion  = new inputItem('direccion', direccion, 'filter_selector', function(val){ return self.filterAddress(val);}, false, 'Direccion');
				this.email      = new inputItem('email', email, 'text', undefined, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'E-mail', true);
				// end

				this.get = function(){
					var list = {};
					self.error = false;
					for(var p in self.keys){
						var key = self.keys[p],
						    val = self[key].get();
						if(!self[key].error)
							list[key] = val;
						else
							self.error = true;	
					}
					return list;
				}

				this.set = function(key,value){
					var ex = self.keys.filter(function(k) {
						return k == key;
					});
					if(ex[0] != undefined)
						self.keys.push(key);
					self[key] = new inputItem(key, value);
				};

				this.get_headers = function(){
					var headKeys =  [
						'referencia',
						'nombre',
						'apellido',
						'email',
						'telefono'
					],
					head = [];
					for(var h in headKeys){
						if(self[headKeys[h]] != undefined){
							head.push({
								key:   self[headKeys[h]].name,
								title: self[headKeys[h]].placeholder
							});
						}
					}
					return head;
				};


				this.filterAddress = function(val){
					return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
						params: {
							address: val,
							sensor: false
						}
				    })
				    .then(function(response){
				    	return response.data.results.map(function(item){
				    		return item.formatted_address;
				    	});
				    });
				};
		};
	}])

})();
