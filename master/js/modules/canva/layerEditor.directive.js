	(function(){

		'use strict';

		angular.module('app.canva')
		.directive('layerEditor', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {model:'='}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div>'+
						'<image-editor model="model" id="preferences.id" ng-if="preferences.type==\'imageLayer\'"></image-editor>'+
					'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					$scope.preferences = {};

					$scope.$watch('model.layers',function(n){
						if(n){
							var selected = n.filter(function(it){ return it['selected'];});
							if(selected[0])
								$scope.loadSelected(selected[0]['_id']);
							else
								$scope.preferences = {};
						}
					},true);


					$scope.loadSelected = function(id){
						$scope.preferences.type = angular.copy($scope.model.layers[id].type);
						$scope.preferences.id   = angular.copy(id);
					}
				}
			};
		}]);;
		

	})();