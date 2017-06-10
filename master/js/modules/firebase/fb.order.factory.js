	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$orders', ['$q','order', function($q,order){
			return new function(){
				var self = this;

				var db    = firebase.database().ref();
				var event = {};

				db.child('fichas')
				.on('child_removed', function(childSnapshot, prevChildKey) {
					console.log(childSnapshot.val(), prevChildKey,' on fichas remove');
				});

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

				this.pop = function($idOrder){
					return $q(function(resolve, reject){
						db.child('orders')
						.child($idOrder)
						.remove()
						.then(
							function(){
								resolve(true);
							},
							function(){
								reject('Error on delet order')
							}
						);
					});
				}

				this.encode_list_orders = function(orders){
					var list = [];
					for(var id in orders){
						var or          = orders[id],
							nor         = new order(or.fid, id, or.reference, or.type, or.code, or.work, or.date, or.notes, or.state);
							nor.pop     = function(){self.pop(id)};
							nor.publish = function(){self.publish(id)};
						list.push(nor);
					}
					return list;
				};

				this.publish = function(id_order){
					return $q(function(resolve, reject){
						db.child('orders')
						.child(id_order)
						.child('state')
						.set('publish')
						.then(
							function(){
								resolve();
							},
							function(error){
								console.log(error,'onUpdate');
								reject();
							}
						)
					});
				}

				this.update = function(id_order,data_order){
					return $q(function(resolve, reject){
						db.child('orders')
						.child(id_order)
						.set(data_order)
						.then(
							function(){
								resolve();
							},
							function(error){
								console.log(error,'onUpdate');
								reject();
							}
						)
					});
				};

				this.popGroup = function(fid){
					return $q(function(resolve, reject){
						db.child('orders')
						.once('value')
						.then(function(snap){
							var orders = snap.val();
							for(var p in orders)
								self.pop()
						},
						function(e){
							reject('Error on delet orders');
						})
					});
				};

				this.push = function(data_order){
					return $q(function(resolve, reject){
						db.child('orders')
						.push(data_order.get())
						.then(
							function(data){
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