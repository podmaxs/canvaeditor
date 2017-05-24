	(function(){

		'use strict';

		angular.module('app.components')
		.directive('orderForm', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {formOrder:'='}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				   template: ''+
				   	'<table class="table table-hover">'+
				   		'<thead>'+
				   			'<tr>'+
								'<th class="text-center">'+
									'Device'+
								'</th>'+
								'<th class="text-center">'+
									'Referencia'+
								'</th>'+
								'<th class="text-center">'+
									'Serial'+
								'</th>'+
								'<th class="text-center">'+
									'Trabajo'+
								'</th>'+
								'<th class="text-center">'+
									'Notas'+
								'</th>'+
								'<th class="text-center">'+
									'Action'+
								'</th>'+
				   			'</tr>'+
				   		'</thead>'+
					   	'<tbody>'+
	                        '<tr>'+
	                        	'<td>'+
	                        		'<div class="form-group">'+
		                        		'<select ng-model="formOrder.type.value" class="form-control">'+
		                                    '<option value="phone">SmartPhone</option>'+
		                                    '<option value="tablet">Tablet</option>'+
		                                    '<option value="notebook">Notebook</option>'+
		                                    '<option value="otro">Otro</option>'+
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
		                                    '<option value="desbloqueo">Desbloqueo parcial</option>'+
		                                    '<option value="desbloqueo completo">Desbloqueo completo</option>'+
		                                    '<option value="servicio tecnico">Servicio Tecnico</option>'+
		                                    '<option value="software">Software</option>'+
		                                    '<option value="presupuesto">Presupuestar</option>'+
	                                 '</select>'+
	                              '</div>'+
	                           '</td>'+
	                           '<td>'+
	                              '<div class="form-group">'+
	                                 '<textarea ng-model="note" class="form-control no-resize"></textarea>'+
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
				controller:function($scope, $orders, order){
					$scope.ordersListLoaded = [];
					$scope.note             = "";

					$orders.get(function(list){
						$scope.ordersListLoaded = list;
					});


					$scope.pushOrder = function(){
						var form = angular.copy($scope.formOrder);
						if($scope.note != '')
							form.pushNote($scope.note);
						$orders.push(form);
						$scope.formOrder = new order(form.fid.value);
						$scope.note      = "";
					};


					$scope.getReferences = function(value){
						return  $scope.ordersListLoaded.filter(function(it){
							return it.reference.like(value);
						})
						.map(function(it){
							return it.reference.value;
						})
						.filter(function(it, index, inputArray){
							return inputArray.indexOf(it) == index;
						});
					}
				}
			};
		}]);;
		

	})();