	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$fichas', ['$q','$entidades', function($q,$entidades){
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



			};
		}]);
		

	})();