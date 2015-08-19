'use strict';

app.controller('appController', function ($scope, $http, $interval) {
	$scope.testData = {
		url: '',
		times: 1
	}

	$scope.testResult = {};

	var apiKey = "A.b5b826959702a0a5b767f9d822bc15a1";
	var testFinish;
	var browsersLocations = {
		chrome: 'ec2-us-east-1:Chrome',
		ie: 'ec2-us-east-1:IE 11'
		// ,
		// firefox: 'ec2-us-east-1:Firefox',
		// safari: 'ec2-us-east-1:Safari'
	}

	var testPoll = function(url, key){
		testFinish = $interval(function () {			            
        	$http.get(url).then(function (results) {
				if(results.data.statusCode == 200) {
					$scope.testResult.key = results.data;
					$scope.stopTest();
				}			
			});    
        }, 5000);
	}

	$scope.stopTest = function () {
		$interval.cancel(testFinish);
		console.log($scope.testResult);
	}

	$scope.executeTest = function () {
		var testUrl = '';
		for (var key in browsersLocations) {
			testUrl = "http://www.webpagetest.org/runtest.php?url=" + $scope.testData.url + "&k=" + apiKey + "&runs=" + $scope.testData.times + "&location=" + browsersLocations[key] + "&label=" + key + "&f=json&noimages=1";

			$http.post(testUrl).then(function (results) {
				console.log(results.data.data.jsonUrl);
			
				testPoll(results.data.data.jsonUrl, key);
			});
		}
	};


});