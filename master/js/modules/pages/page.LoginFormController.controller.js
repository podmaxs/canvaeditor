(function(){

	'use strict';

	angular.module('app.pages')
	.controller('LoginFormController', ['$scope','$state','oAuth', function($scope,$state,oAuth){
		var vm = this;

		activate();

		////////////////

		function activate() {
		  // bind here all data from the form
		  vm.account = {};
		  // place the message if something goes wrong
		  vm.authMsg = '';

		  vm.login = function() {
		    vm.authMsg = '';
		    if(vm.loginForm.$valid) {
		    	oAuth
		      	.login(vm.account.email,vm.account.password)
		      	.then(
		      		function(data){
		      			console.log(data);
		      		},
		      		function(error){
		      			console.log(error);
		      			vm.authMsg = error;
		      		}
	      		);
		    } else {
		      vm.loginForm.account_email.$dirty = true;
		      vm.loginForm.account_password.$dirty = true;
		    }
		  };
		}
	}])

})();
