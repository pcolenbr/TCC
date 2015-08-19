'use strict';

app.controller('appController', function ($scope, $http, $interval) {
	$scope.testData = {
		url: '',
		times: 1
	}

	$scope.testResult = {};

	var apiKey = "A.b5b826959702a0a5b767f9d822bc15a1";
	var testFinish = {};
	var browsersLocations = {
		chrome: 'ec2-us-east-1:Chrome',
		ie: 'ec2-us-east-1:IE 11',
		firefox: 'ec2-us-east-1:Firefox',
		safari: 'ec2-us-east-1:Safari'
	}

	var testPoll = function(url, key){
		testFinish[key] = $interval(function () {			            
        	$http.get(url).then(function (results) {
        		console.log("2 - " + key);
				if(results.data.statusCode == 200) {
					console.log(200);
					$scope.testResult[key] = results.data;
					stopTest(key);
				}			
			});    
        }, 5000);
        console.log(testFinish);
	};

	var stopTest = function (key) {
		$interval.cancel(testFinish[key]);
		console.log("kill");
		console.log(testFinish[key]);
	};

	var startTest = function (url, key) {
		$scope.testResult[key] = {};
		$http.post(url).then(function (results) {
			console.log(results.data.data.jsonUrl);
			testPoll(results.data.data.jsonUrl, key);
		});
	}

	$scope.executeTest = function () {
		var testUrl = '';
		for (var key in browsersLocations) {
			testUrl = "http://www.webpagetest.org/runtest.php?url=" + $scope.testData.url + "&k=" + apiKey + "&runs=" + $scope.testData.times + "&location=" + browsersLocations[key] + "&label=" + key + "&f=json&noimages=1";
			
			startTest(testUrl, key);
		}
	};

});