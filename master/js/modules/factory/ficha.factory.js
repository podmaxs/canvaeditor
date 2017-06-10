	(function(){

		'use strict';

		angular.module('app.fac')
		.factory('ficha', ['inputItem','$q','$fichas','oAuth','$prints',function(inputItem,$q,$fichas,oAuth,$prints){
			return function(eid, fid, nro, date, state){
				var self = this;
				var uid  = oAuth.getCurrent().uid;

				this.params = ['nro', 'eid','owner', 'date', 'state'];
				
				this.fid    = new inputItem('fid', fid, 'text', undefined, false, undefined, true);
				this.nro    = new inputItem('nro', nro || new Date().getTime(), 'number', undefined, false, undefined, true);
				this.eid    = new inputItem('eid', eid, 'number', undefined, false, undefined, true);
				this.date   = new inputItem('date', date || new Date().toString(), 'date', undefined, false, undefined, true);
				this.state  = new inputItem('state', state || 'draft', 'text', undefined, false, undefined, true);;
				this.owner  = new inputItem('owner', uid, 'text', undefined, false, undefined, true);
				this.print  = {};

				this.get = function(){
					var ficha = {};
					for(var p in this.params){
						var param = this.params[p];
						ficha[param] = this[param].get();
					}
					return ficha;
				};

				this.publish = function(orders){
					return $q(function(resolve, reject){
						self.createPrint(orders)
						.then(
							function(idPrint){
								$fichas.publish(self.fid.value)
								.then(
									function(){
										if(Array.isArray(orders)){
											for(var o in orders)
												orders[o].publish();
											resolve(idPrint)
										}else{
											$prints.pop(idPrint);
											reject('Orders data invalid');
										}
									},
									function(e){
										reject(e);
									}
								);	
							},
							function(err){
								reject(err);
							}
						)
					});
				}

				

				this.createPrint = function(orders){
					return $q(function(resolve, reject){
						self.print.orders = [];
						for(var p in orders)
							self.print.orders.push(orders[p].get());
						self.print.ficha = self.get();
						$prints.push('ficha',self.print)
						.then(
							function(id){
								resolve(id);
							},
							function(err){
								reject(err);
							}
						);
					});
				}


			};
		}]);

	})();