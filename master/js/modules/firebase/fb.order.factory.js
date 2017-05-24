	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$orders', ['$q','order', function($q,order){
			return new function(){
				var self = this;

				var db    = firebase.database().ref();
				var event = {};


				this.get = function(c, e){
					db.child('orders')
					.on('value',
						function(snap){
							var list = snap.val();
							c(list == null?[]:self.encode_list_orders(list));
						},
						function(err){
							e(err);
						}
					);
				};

				this.encode_list_orders = function(orders){
					var list = [];
					for(var id in orders){
						var or = orders[id];
						list.push(new order(id, or.fid, or.reference, or.code, or.work, or.note, or.state));
					}
					return list;
				}


				this.push = function(data_order){
					return $q(function(resolve, reject){
						db.child('orders')
						.push(data_order.get())
						.then(
							function(data){
								console.log(data, 'on push order');
								var oid = data.path.o[1] || 0;
								data_order.oid.value = oid;
								resolve(data_order);
							},
							function(error){
								console.log(error,'onPush');
								reject();
							}
						);
					})
				};

			};
		}]);
		

	})();