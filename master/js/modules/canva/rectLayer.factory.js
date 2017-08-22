	(function(){

		'use strict';

		angular.module('app.canva')
		.factory('rectLayer', ['layerModel','$q', function(layerModel,$q){
			return function(x1, x2, y1, y2, colorsList){
				var self = this;

				this.writeRect = function(ctx){
					return $q(function(resolve){
						var grd = ctx.createLinearGradient(x1,0,x2,0),
							colors = Array.isArray(colorsList)?colorsList:['#000000'];
						for(var i in colors)
							grd.addColorStop(i,colors[i]);
						ctx.fillStyle = grd;
						ctx.fillRect(x1,y1,x2,y2);
						resolve();
					});
				}



				this.layer = new layerModel({name:'rect layer',type:'rectLayer'},this.writeRect);


				return this.layer;
			};
		}]);
		

	})();