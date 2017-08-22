	(function(){

		'use strict';

		angular.module('app.canva')
		.directive('imageEditor', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {model:'=',id:'='}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div class="panel panel-default m-sm">'+
						'<div class="panel-heading">Image Preferences</div>'+
						'<div class="panel-body">'+
							'<div class="btn btn-default" ng-click="centerHorizontalImage()">center h</div>'+
							'<div class="btn btn-default" ng-click="centerVerticallImage()">center v</div>'+
							'<div class="form-group">'+
								'<label for="">Image url</label>'+
								'<input ng-model="model.layers[id].cords.url" type="text" name="" id="input" class="form-control" value="" required="required" pattern="" title="">'+
							'</div>'+
							'<div class="form-group">'+
								'<label for="">X position</label>'+
								'<input ng-model="model.layers[id].cords.x1" type="number" name="" id="input" class="form-control" value="" required="required" pattern="" title="">'+
							'</div>'+
							'<div class="form-group">'+
								'<label for="">Y position</label>'+
								'<input ng-model="model.layers[id].cords.y1" type="number" name="" id="input" class="form-control" value="" required="required" pattern="" title="">'+
							'</div>'+
						'</div>'+
					'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					$scope.$watch('model.layers', function(n){
						if(n){
							$scope.model.update($scope.id,function(it, index){
								return n[$scope.id];
							});
						}
					}, true);

					$scope.centerHorizontalImage = function(){
						var config = $scope.model.getConfig(),
							iz     = $scope.model.layers[$scope.id].imageSize(),
							center = eval((config.width/2) - (iz.width/2));
							$scope.model.layers[$scope.id].cords.x1 = center;
					}

					$scope.centerVerticallImage = function(){
						var config = $scope.model.getConfig(),
							iz     = $scope.model.layers[$scope.id].imageSize(),
							center = eval((config.height/2) - (iz.height/2));
							$scope.model.layers[$scope.id].cords.y1 = center;
					}
				}
			};
		}]);;
		

	})();