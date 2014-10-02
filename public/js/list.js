var app = angular.module('townMettingList', ['ngRoute']);

app.controller('ItemListCtrl', function($scope, $http) {
	$scope.voteItems = [];
	$scope.itemDetails = [];
	$scope.itemSubject = '';
	$scope.itemIsEnable = '';
	$scope.itemId = '';
	
	$scope.loadVotes = function () {
		console.log('Get request...');

		$http.get("/list-voteItems").success(function(data, status) {
            console.log('Get voteItems Success');
            console.log(data);
            $scope.voteItems = data;
        });
	};
	
	$scope.showDetail = function (index) {
		console.log('show Detail() : ' + index);
		$scope.itemDetails = $scope.voteItems[index].voteItems;
		$scope.itemSubject = $scope.voteItems[index].voteSubject;
		$scope.itemId = $scope.voteItems[index]._id;
		$scope.itemStatus = $scope.voteItems[index].itemStatus;
		console.log($scope.itemDetails[0].title);
	};
	
	$scope.startVote = function () {
		console.log('Start Vote...');
		
		if($scope.itemStatus === 'Not Yet') {
			var data = { 'itemId' : $scope.itemId, 'itemStatus' : 'Doing' };

			console.log('Voting Starting.. ');
	        $http.post("/update-status/", data).success(function(data, status) {
	            console.log('Voting Start Success');
	        });
		} else {
			console.log('Vote already done!!');
		}
	};
	
	$scope.endVote = function () {
		console.log('End Vote...');
		
		if($scope.itemStatus === 'Doing') {
			var data = { 'itemId' : $scope.itemId, 'itemStatus' : 'Done' };

			console.log('Voting Ending.... ');
	        $http.post("/update-status/", data).success(function(data, status) {
	            console.log('Voting End Success');
	        });
		} else {
			console.log('Vote not doing!!');
		}
	};
});