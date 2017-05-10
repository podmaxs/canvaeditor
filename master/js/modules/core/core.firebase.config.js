(function(){

	'use strict';

	angular.module('app.core')
	.config([function() {
		var config = {
		    apiKey: "AIzaSyDLJs4QVKMXGfIIYrnJjLUSRQ0uSfF4dVs",
		    authDomain: "rosario3g-f122a.firebaseapp.com",
		    databaseURL: "https://rosario3g-f122a.firebaseio.com",
		    projectId: "rosario3g-f122a",
		    storageBucket: "rosario3g-f122a.appspot.com",
		    messagingSenderId: "585519471429"
		  };
		  firebase.initializeApp(config);
	}]);

})();
