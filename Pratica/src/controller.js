'use strict';

app.controller('appController', function ($scope, $http) {
	$scope.testData = {
		url: '',
		times: 1,
		browser: ''
	}

	var apiKey = "A.b5b826959702a0a5b767f9d822bc15a1";

	$scope.executeTest = function () {
		$http.post("http://www.webpagetest.org/runtest.php?url=www.aol.com&f=json&k=" + apiKey).then(function (results) {
			console.log(results);
			
			// var myWindow = window.open("data:text/html," + encodeURIComponent(results.data),
			//                        "_blank");
			// myWindow.focus();
		});
	};
});