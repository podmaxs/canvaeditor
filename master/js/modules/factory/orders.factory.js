	(function(){

		'use strict';

		angular.module('app.fac')
		.factory('order', ['inputItem','oAuth','$q',function(inputItem,oAuth,$q){
			return function (fid, oid, reference, type, code, work, date, note, state){
				var uid         = oAuth.getCurrent().uid;
				
				this.params     = ['fid','type', 'reference', 'code', 'work', 'notes','date', 'owner', 'state'];
				this.oid        = new inputItem('oid', oid, 'text', undefined, false, undefined, true);
				this.fid        = new inputItem('fid', fid, 'text', undefined, false, undefined, true);
				this.type       = new inputItem('type', type || 'otro', 'text', undefined, false, undefined, true);
				this.reference  = new inputItem('reference', reference || '', 'text', undefined, false, 'Referencia de la orden', true);
				this.code       = new inputItem('code', code || '', 'text', undefined, false, "0000-1111-AAAA", true);
				this.work       = new inputItem('work', work || 'presupuesto', 'text', undefined, false, undefined, true);
				this.owner      = new inputItem('owner', uid, 'text', undefined, false, undefined, true);
				this.date       = new inputItem('date', new Date().toString(), 'text', undefined, false, undefined, true);
				this.state      = new inputItem('state', state || 'draft', 'text', undefined, false, undefined, true);
				this.notes      = [];

				this.pushNote = function(note){
					this.notes.push({text:note,owner:uid,date: new Date().toString()});
				};

				if(Array.isArray(note))
					this.notes = note;
				else
					if(note != undefined)
						this.pushNote(note);


				this.publish = function(){
					
				}

				this.get = function(){
					var order = {};
					for(var p in this.params){
						var param = this.params[p];
						order[param] = Array.isArray(this[param])?this[param]:this[param].get();
					}
					return order;
				};

				this.pop = function(){

				}

			};
		}]);


	})();	