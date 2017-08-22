	(function(){

		'use strict';

		angular.module('app.canva')
		.directive('layersList', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {model:'='}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div class="panel panel-default m-sm">'+
						'<div class="panel-heading">'+
							'<div class="btn btn-xs btn-default pull-right"><em class="fa fa-edit"></em></div>'+
							'Layers'+
						'</div>'+
						'<ul class="list-group m-sm">'+
							'<a ng-click="selectLayer(l,$event)" ng-class="{\'active\':l.selected}" ng-dblclick="editableOn(l,$event)" class="list-group-item list-group-item-success" ng-repeat="l in model.layers track by l._id">'+
								'<div class="pull-right">'+
									'<div class="btn btn-xs btn-default ml-sm" ng-if="$index!=0">'+
										'<div class="fa fa-angle-up"></div>'+
									'</div>'+
									'<div class="btn btn-xs btn-default ml-sm" ng-if="!$last">'+
										'<div class="fa fa-angle-down"></div>'+
									'</div>'+
									'<div class="btn btn-xs btn-default ml-sm" ng-click="deleteLayer(l);"  >'+
										'<div class="fa fa-trash"></div>'+
									'</div>'+
								'</div>'+
								'<span class="ph-sm" ng-keydown="onWrite(l,$event)" contenteditable="{{l.editable || false}}" ng-class="{\'bg-info text-dark\':l.editable}" ng-blur="editableOn(l,$event)">{{l.name}}</span>'+
							'</a>'+
						'</ul>'+
					'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {

					$scope.selectLayer = function(l, event) {
						if(event.target.nodeName == "A" || event.target.nodeName == "SPAN")
							$scope.model.layers = $scope.model.layers.map(function(it){ it['selected'] = it['_id'] == l['_id']; return it;});
					};

					$scope.deleteLayer = function(l){
						$scope.model.layers = $scope.model.layers.map(function(it){ it['selected'] = false; return it;});
						setTimeout(function(){
							$scope.$apply(function(){
								$scope.model.pop(l);
							});
						},10);
					}

					$scope.editableOn = function(l,r) {
 						if(!l.editable)
							l['editable'] = true;
						else
							l['editable'] = !l['editable'];
						if(l['editable'] && r != undefined && r.type == "dblclick" && r.target.nodeName == "SPAN"){
							var node = r.target;
								node.focus();
						}else if(r != undefined && r.type == "blur" && r.target.nodeName == "SPAN"){
							var node = r.target;
								l.name = node.textContent;
						}
					};

					$scope.onWrite = function(l,event){
						if(event.which == 13){
				            setTimeout(function(){
				            	l['editable'] = false;
				            },10);
				            var node      = event.target;
				            	node.blur();
							event.preventDefault(); // Doesn't work at all
				            window.stop(); // Works in all browsers but IE    
				            document.execCommand("Stop"); // Works in IE
						}
					}
				}
			};
		}]);;
		

	})();	