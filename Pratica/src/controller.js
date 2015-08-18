'use strict';

app.controller('appController', function ($scope, $http, $interval) {
	$scope.testData = {
		url: '',
		times: 1,
		browser: ''
	}

	$scope.testResult;

	var apiKey = "A.b5b826959702a0a5b767f9d822bc15a1";
	var testFinish;

	var poll = function(url){
		testFinish = $interval(function () {			            
        	$http.get(url).then(function (results) {
        		console.log("11");
        		$scope.testResult = results;
					$scope.stopTest();
				// if(results.data.statusCode == 200) {
				// 	$scope.testResult = results;
				// 	$scope.stopTest();
				// }			
			});    
        }, 1000);
	}

	$scope.stopTest = function () {
		console.log("OI");
		$interval.cancel(testFinish);
	}

	$scope.executeTest = function () {
		$http.post("http://www.webpagetest.org/runtest.php?url=www.aol.com&f=json&k=" + apiKey).then(function (results) {
			console.log(results);
			
			poll(results.data.data.jsonUrl);

			// var myWindow = window.open("data:text/html," + encodeURIComponent(results.data),
			//                        "_blank");
			// myWindow.focus();
		});
	};
});