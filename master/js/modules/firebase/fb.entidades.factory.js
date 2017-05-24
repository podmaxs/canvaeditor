(function(){

	'use strict';

	angular.module('app.firebase')
	.factory('$entidades', ['entidad','$q',function(entidad,$q){
		return new function(){
			var self = this;
			var db   = firebase.database().ref();
			var event = {};

			this.get = function(c, e){
				db.child('entidades')
				.on('value',
					function(snap){
						var list = snap.val();
						c(list == null?[]:self.encode_list_entidades(list));
					},
					function(err){
						e(err);
					}
				);
			};

			this.encode_list_entidades = function(list){
				var nlist = [];	
				for(var id in list){
					var ent = list[id];
						nlist.push(new entidad(id,ent.referencia,ent.nombre,ent.apellido,ent.telefono,ent.direccion,ent.email));
				}
				return nlist;
			}

			this.push = function(data_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.push(data_entity)
					.then(
						function(data){
							console.log(data, 'on push entity');
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

			this.pop = function(id_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.child(id_entity)
					.remove()
					.then(
						function(){
							resolve();
						},
						function(error){
							console.log(error,'onPop');
							reject();
						}
					)
				});
			};

			this.update = function(id_entity,data_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.child(id_entity)
					.set(data_entity)
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
		};
	}]);

})();