	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$prints', ['$q', function($q){
			return new function(){
				var self = this;
				var db   = firebase.database().ref();
				var event = {};


				this.push = function(type, data){
					return $q(function(resolve, reject){
						db.child('prints')
						.push({type:type,data:data})
						.then(
							function(data){
								console.log(data, 'on push print');
								var eid = data.path.o[1] || 0;
								resolve(eid);
							},
							function(error){
								console.log(error,'onPush');
								reject();
							}
						);
					})
				};


				this.pop = function(idPrint){
					return $q(function(resolve, reject){
						db.child('prints')
						.child(idPrint)
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

			};
		}]);
		

	})();