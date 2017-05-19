(function(){

	'use strict';

	angular.module('app.sections')
	.controller('orderFormCtrl', ['$scope','$state','itemFicha','$entidades', function($scope,$state,itemFicha,$entidades){
		if($state.params.order_key == "0")
			$scope.ficha = new itemFicha();
		console.log($scope.ficha);
		$entidades.get(function(entidades){
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.entidades = entidades;
				});
			},1);
		});

		$scope.getEntitys = function(value){
			console.log(value,$scope.entidades);
			return $scope.entidades.filter(function(it){
				return it.nombre.value.indexOf(value) !=-1;
			});
		};

	}]);

})();
