(function(){

	'use strict';

	angular.module('app.sections')
	.controller('entityListCtrl', ['$uibModal','$scope', '$entidades', 'entidad', function($uibModal, $scope, $entidades, entidad){
		$scope.list = [];
		$scope.cols = [];

		$entidades.get(function(list){
			$scope.list = list;
			if(Array.isArray($scope.list) && $scope.list[0] != undefined){
				$scope.cols = $scope.list[0].get_headers();
			}
		});

		$scope.new = function(){
			$scope.oepnModal();
		};

		$scope.edit = function(ent){
			$scope.oepnModal(ent);
		};

		$scope.oepnModal = function(ent){
			ent = ent == undefined?new entidad():ent;
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/views/editionEntityModal.html',
				controller: 'editionEntityModalCtrl',
				backdrop: 'static',
				resolve: {
			     	ent: function () {
			     		return ent;
			     	}
			    }
			});
		}
	}])

})();
