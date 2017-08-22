	(function(){

		'use strict';

		angular.module('app.canva')
		.factory('lineLayer', ['layerModel','$q', function(layerModel,$q){
			return function(x1, x2, y1, y2){
				var self = this;

				this.writeLine = function(ctx){
					return $q(function(resolve){
						ctx.moveTo(x1 || 0, y1 || 0);
						ctx.lineTo(x2 || 0, y2 || 0);
						ctx.stroke();
						resolve(true);
					});
				}



				this.layer = new layerModel({name:'line layer',type:'lineLayer'},this.writeLine);


				return this.layer;
			};
		}]);
		

	})();