(function(){

	'use strict';

	angular.module('app.sections')
	.controller('userSettingsCtrl', ['$scope','oAuth', function($scope,oAuth){
		
		$scope.logout = function(){
			oAuth.signOut();
			$scope.app.offsidebarOpen = !$scope.app.offsidebarOpen;
		};

		
	}]);

})();