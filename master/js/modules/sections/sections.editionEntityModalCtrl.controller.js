(function(){

	'use strict';

	angular.module('app.sections')
	.controller('editionEntityModalCtrl', ['entidad','$entidades','$scope','ent','$uibModalInstance', function(entidad,$entidades,$scope,ent,$uibModalInstance){
		
		$scope.entity  = new entidad(ent.eid.value, ent.referencia.value, ent.nombre.value, ent.apellido.value, ent.telefono.value, ent.direccion.value, ent.email.value);
		$scope.keys    = angular.copy(ent.keys);

		$scope.close = function(){
			//console.log(angular.copy($scope.entity))
			$uibModalInstance.close($scope.entity);
		};

		$scope.save = function(){
			var promise;
			setTimeout(function(){
				$scope.$apply(function(){
					var data    = $scope.entity.get();
					if(!$scope.entity.error){
						if($scope.entity.eid.get() === '')
							promise = $entidades.push(data);
						else
							promise = $entidades.update($scope.entity.eid.get(),data);
						promise
						.then(
							function(eid){
								if($scope.entity.eid.get() === '')
									$scope.entity.set('eid',eid);
								$scope.close();
							},
							function(error){
								console.log(error);
							}
						)
					}else{
						//console.log($scope.entity.error, $scope.entity);
					}
				});
			},100);
		}

	}]);

})();
