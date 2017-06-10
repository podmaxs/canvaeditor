	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$fichas', ['$q','$entidades','$orders', function($q,$entidades,$orders){
			return new function(){
				var self = this;

				var db   = firebase.database().ref();
				var event = {};



				this.push = function(data_ficha){
					return $q(function(resolve, reject){
						db.child('fichas')
						.push(data_ficha.get())
						.then(
							function(data){
								console.log(data, 'on push ficha');
								var fid = data.path.o[1] || 0;
								data_ficha.fid.value = fid;
								resolve(data_ficha);
							},
							function(error){
								console.log(error,'onPush');
								reject();
							}
						);
					})
				};


				this.publish = function(id_ficha){
					return $q(function(resolve, reject){
						db.child('fichas')
						.child(id_ficha)
						.child('state')
						.set('publish')
						.then(
							function(){
								resolve(true);
							},
							function(error){
								console.log(error,'onUpdate');
								reject();
							}
						)
					});
				}

				this.pop = function(data_ficha){
					return $q(function(resolve, reject){
						db.child('fichas')
						.child(data_ficha.fid.value)
						.remove()
						.then(
							function(){
								$orders.popGroup(data_ficha.fid.value)
								.then(
									function(d){
										resolve();
									},
									function(e){
										reject(e);
									}
								)

							},
							function(){
								reject('Error on delete ficha nro '+data_ficha.nro.value);
							}
						)

					});
				}



			};
		}]);
		

	})();