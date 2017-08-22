	(function(){

		'use strict';

		angular.module('app.canva')
		.directive('canvaEditor', ['canvasModel','lineLayer','imageLayer','rectLayer',function(canvasModel,lineLayer,imageLayer,rectLayer){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				// scope: {}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div class="page" ng-click="open()">'+
						'<canvas width="{{config.width}}" height="{{config.height}}"></canvas>'+
					'</div>'+
					'<div class="left-page-tools">'+
						'<div class="panel panel-default m-sm">'+
							'<div class="panel-body">'+
								'<div class="btn btn-default" ng-click="model.open()">Save</div>'+
							'</div>'+
						'</div>'+
						'<layers-list model="model" ></layers-list>'+
						'<layer-editor model="model"></layer-editor>'+
					'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					$scope.config = {
						width: '550',
						height: '500'
					};
					$scope.canvas = null;
					$scope.model;
					$scope.$watch('config',function(n){
						if(n)
							$scope.createModel();
					});

					angular.element(iElm).ready(function(){
						//$scope.createModel();
					});

					$scope.open = function(){
						if($scope.y)
							$scope.y++;
						else
							$scope.y =250;
						$scope.model.update(1,function(it, index){
							return new lineLayer(50,100,$scope.y,$scope.y);
						});
					}

					$scope.createModel = function(){
						var canvas = iElm[0].getElementsByTagName('CANVAS');
						if(canvas[0]){
							$scope.canvas = canvas[0];
							$scope.model = new canvasModel(canvas[0],$scope.config);
							$scope.model.push(new rectLayer(0, 550, 0, 500,['rgba(0,0,0,.3)','rgba(0,0,0,.7)']));
							$scope.model.push(new imageLayer('http://localhost:3000/app/img/android2.png',-225, 25));
							$scope.model.push(new lineLayer(350, 400, 100, 100));
							$scope.model.push(new lineLayer(350, 400, 200, 200));
							$scope.model.draw();
						}
					}
				}
			};
		}]);

	})();	