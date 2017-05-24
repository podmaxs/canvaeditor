(function(){

	'use strict';

	angular.module('app.sections')
	.controller('orderFormCtrl', ['$scope','order','$orders','ficha','$fichas','$uibModal','$state','$entidades','entidad', function($scope,order,$orders,ficha,$fichas,$uibModal,$state,$entidades,entidad){
		$scope.entidadFilter = new entidad();
		if($state.params.order_key == "0")
			$scope.ficha = new ficha();
		$scope.allOrders = [];
		$scope.ordersList = [];


		$scope.$watch('allOrders',function(n){
			if(n!= undefined){
				$scope.filterOrderList(n);
			}
		},true);


		$scope.filterOrderList = function(list){
			$scope.ordersList = list.filter(function(it){
				console.log(it.fid.value , $scope.ficha.fid.value,'filterOrderList')
				return it.fid.value == $scope.ficha.fid.value;
			});
			console.log($scope.ordersList, 'ordersList');
		};

		$orders.get(function(list){
			$scope.allOrders = list;
		});


		$entidades.get(function(entidades){
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.entidades = entidades;
				});
			},1);
		});

		$scope.selectEntity = function(){
			if($scope.entidadFilter.eid.get() !== ''){
				$scope.ficha.entidad = angular.copy($scope.entidadFilter);
				var nf = new ficha($scope.ficha.entidad.eid.get());
				$fichas.push(nf)
				.then(
					function(ficha){
						$scope.ficha.fid.value = ficha.fid.value;
						$scope.formOrder       = new order(ficha.fid.value);

						$scope.filterOrderList($scope.allOrders);

						console.log(ficha,'if added');
					}
				)
			}else{
				console.log('No se a seleccionado la entidad');
			}
		};

		$scope.setSelection = function($item){
			$scope.entidadFilter = $item;
		};


		$scope.getEntitys = function(value){
			console.log(value,$scope.entidades);
			return $scope.entidades.filter(function(it){
				return it.nombre.value.indexOf(value) !=-1;
			});
		};


		$scope.createEntity = function(ent){
			ent = ent == undefined?new entidad():ent;
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/views/editionEntityModal.html',
				controller:  'editionEntityModalCtrl',
				backdrop:    'static',
				resolve: {
			     	ent: function () {
			     		return ent;
			     	}
			    }
			});

			modalInstance.result
			.then(
				function(newEntity){
					if(newEntity.eid != undefined && newEntity.eid.get() != ''){
						console.log(newEntity,'if a new entity')
						$scope.entidadFilter = newEntity;
					}
				}
			);
		}

	}]);

})();
