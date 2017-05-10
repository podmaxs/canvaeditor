(function(){

	'use strict';

	angular.module('app.pages')
	.controller('RegisterFormController', ['$state','oAuth', function($state,oAuth){
		var vm = this;

		activate();

		////////////////

		function activate() {
		  // bind here all data from the form
		  vm.account = {};
		  // place the message if something goes wrong
		  vm.authMsg = '';
		    
		  vm.register = function() {
		    vm.authMsg = '';
		    if(vm.registerForm.$valid) {
		    	oAuth
		    	.register(vm.account.email,vm.account.password)
		    	.then(
		    		function(d){
		    			console.log(d,'success');
		    		},function(error){
		    			console.log(error);
		    			vm.authMsg = error;
		    		}
	      		)
		    } else {
		      vm.registerForm.account_email['$dirty'] = true;
		      vm.registerForm.account_password['$dirty'] = true;
		    }
		  };
		}
	}]);

})();
