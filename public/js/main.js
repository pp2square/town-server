var app = angular.module('townMettingMain', ['ngRoute']);

app.controller('ItemCtrl', function($scope, $http) {
	$scope.items = [];
	
	$scope.itemSave = function() {
	    var voteItem = {};
	    voteItem.voteSubject = $scope.voteSubject;
	    voteItem.voteItems = new Array();
	    
	    var itemLength = $scope.items.length;
	    
	    console.log('total item length : ' + itemLength);
	    
	    for(var srcIndex = 0, destIndex = 0; srcIndex < itemLength; srcIndex++ ) {
	    	if($scope.items[srcIndex].itemTitle.length > 0) {
	    		 console.log('srcIndex : ' + srcIndex);
	    		voteItem.voteItems[destIndex] = { 'id' : destIndex +  1, 'title' : $scope.items[srcIndex].itemTitle};
	    		destIndex++;
	    	} else {
	    		console.log('srcIndex : ' + srcIndex + ' / destIndex : ' + destIndex);
	    	}
	    }
	    console.log(JSON.stringify(voteItem));
	    
	    var data = { json: JSON.stringify(voteItem) };

        $http.post("/item/", data).success(function(data, status) {
            console.log('Post Success');
        });
	  };
	  
	  $scope.addItem = function() {
	          $scope.items.push({ 
	        	  itemTitle: "",
	      });
	  };
});