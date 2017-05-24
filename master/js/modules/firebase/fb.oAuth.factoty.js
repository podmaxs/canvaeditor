(function(){

	'use strict';

	angular.module('app.firebase')
	.factory('oAuth', ['$q',function($q){
		return new function(){
			var self           = this;
			var defaultAuth    = firebase.auth();
				this.AuthState = false;
				this.events    = {
					'onAuthStateChanged':function(state){}
				};
				

			this.on = function(event,call){
				self.events[event] = call;
			};

			this.signOut = function(){
				defaultAuth.signOut();
			};

			this.getCurrent = function(){
				var current = defaultAuth.currentUser;
				console.log(current)
				if(current != null && current.providerData[0])
					return current.providerData[0];
				return {};
			};

			this.login = function(email, password){
				return $q(function(resolve, reject){
					firebase.auth().signInWithEmailAndPassword(email, password)
					.then(
						function(data){
							resolve(data);
						},
						function(error){
							if(error.message != undefined)
								reject(error.message);
							else
								reject('Service no avariable');
						}
					);
				});
			};

			this.register = function(email, password){
				return $q(function(resolve,reject){
					firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(
						function(data){
							resolve(data);
						},
						function(error){
							if(error.message != undefined)
								reject(error.message);
							else
								reject('Service no avariable');
						}
					);
				})
			}




			defaultAuth.onAuthStateChanged(
				function(state){
					self.AuthState = state == null?false:state;
					self.events.onAuthStateChanged(state == null?false:state);
				},
				function(error){
					console.log(error);
					self.events.onAuthStateChanged(false);
				}
			);


			/*firebase.database().ref().child('usuarios').child('roles').on('value',function(snap){
				console.log(snap.val());
			});*/
		};
	}])

})();
	