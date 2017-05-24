	(function(){

		'use strict';

		angular.module('app.components')
		.directive('orderForm', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				// scope: {}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				   template: ''+
				   	'<table class="table table-hover">'+
				   	'<tbody>'+
                        '<tr>'+
                        	'<td>'+
                        		'<div class="form-group">'+
	                        		'<select ng-model="formOrder.type.value" class="form-control">'+
	                                    '<option value="">SmartPhone</option>'+
	                                    '<option value="">Tablet</option>'+
	                                    '<option value="">Notebook</option>'+
	                                    '<option value="">Otro</option>'+
	                                '</select>'+
                            	'</div>'+
                        	'</td>'+
                        	'<td>'+
                        		'<div class="form-group">'+
                        			'<input type="text" ng-model="formOrder.reference.value" uib-typeahead="references for references in getReferences($viewValue)" typeahead-loading="loadingReferences" typeahead-no-results="noResults" class="form-control">'+
                        		'</div>'+
                    		'</td>'+
                    		'<td>'+
                    			'<div class="form-group">'+
                    				'<input type="text" ng-model="formOrder.code.value" class="form-control" />'+
                              	'</div>'+
                          	'</td>'+
                           	'<td>'+
                           		'<div class="form-group">'+
                                	'<select ng-model="formOrder.work.value" class="form-control">'+
                                    '<option value="">Desbloqueo parcial</option>'+
                                    '<option value="">Desbloqueo completo</option>'+
                                    '<option value="">Servicio Tecnico</option>'+
                                    '<option value="">Software</option>'+
                                    '<option value="">Presupuestar</option>'+
                                 '</select>'+
                              '</div>'+
                           '</td>'+
                           '<td>'+
                              '<div class="form-group">'+
                                 '<textarea class="form-control no-resize"></textarea>'+
                              '</div>'+
                           '</td>'+
                           '<td width="50px">'+
                              '<div ng-click="pushOrder()" class="btn btn-primary">ADD</div>'+
                           '</td>'+
                    	'</tr>'+
                   '</tbody>'+
                 '</table>'+
			   	'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
				},
				controller:function($scope, $orders){
					$scope.ordersListLoaded = [];

					$orders.get(function(list){
						$scope.ordersListLoaded = list;
					});



					$scope.getReferences = function(value){
						return $scope.ordersListLoaded.filter(function(it){
							return it.reference.like(value);
						})
						.map(function(it){
							return it.reference.value;
						});
					}
				}
			};
		}]);;
		

	})();