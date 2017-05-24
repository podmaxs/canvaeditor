	(function(){

		'use strict';

		angular.module('app.components')
		.directive('entityFilter', ['$entidades','entidad',function($entidades,entidad){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: { value:'=', onSelect:'=' }, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div class="form-group">'+
						'<input type="text" placeholder="Seleccione una entidad" ng-model="ficha.dysplay_filter.value" uib-typeahead="address.dysplay_filter.value for address in getEntitys($viewValue)" typeahead-loading="loadingLocations" typeahead-no-results="noResults" typeahead-on-select="onSelectItem($item, $model, $label, $event)" class="form-control" />'+
						'<i ng-show="loadingLocations" class="fa fa-refresh"></i>'+
						'<div ng-show="noResults">'+
							'<i class="fa fa-remove">No Results Found</i>'+
                    	'</div>'+
                  	'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
					$scope.ficha = new entidad();


					$entidades.get(function(entidades){
						setTimeout(function(){
							$scope.$apply(function(){
								$scope.entidades = entidades;
							});
						},1);
					});

					$scope.$watch('value',function(n){
						if(n != undefined){
							var ft = angular.copy(n);
								ft.set('dysplay_filter',ft.nombre.value+' '+ft.apellido.value);
							$scope.ficha = ft;
							console.log(ft,'ficha')
						}
						//console.log(n,'refresh')
					});

					$scope.onSelectItem = function($item, $model, $label, $event){
						//console.log($item, $model, $label, $event, 'onSelect');
						if(typeof $scope.onSelect == 'function')
							$scope.onSelect($item);
					};

					$scope.getEntitys = function(value){
						//console.log(value,$scope.entidades);
						return $scope.entidades.filter(function(it){
							return it.nombre.like(value) || it.apellido.like(value) || it.referencia.like(value);
						}).map(function(it){
							it.set('dysplay_filter',it.referencia.value+' - '+it.nombre.value+' '+it.apellido.value+' - '+it.direccion.value);
							return it;
						});
					};
				}
			};
		}]);;
		

	})();