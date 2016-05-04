
var app = angular.module('adminApp', ['ngRoute', 'infinite-scroll']);
app.controller('adminMainController', function($scope, $http, $rootScope){	
	$scope.states = ["AL", "AK","AZ","AR","CA","CO","CT","DE","DC","FL",
	                 "GA", "HI","ID","IL","IN","IA","KS","KY","LA","ME", 
	                 "MD", "MA","MI","MN","MS","MO","MT","NE","NV","NH",
	                 "NJ", "NM","NY","NC","ND","OH","OK","OR","PA","RI",
	                 "SC", "SD","TN","TX","UT","VT","VA","WA","WV","WY"];
	 $scope.months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov", "Dec"];

	    $scope.adminGetUniqueProductTypes = function () {
	        $scope.productTypes = [];
	        $http({
	            method: "GET",
	            url: '/adminGetUniqueProductTypes'
	        }).success(function (response) {
	            if (response.Status == 200) {
	                $scope.productTypes = response.productTypes;
	                alert(response.Message);
	            }
	            else {
	                $scope.productTypes = [];
	            }
	        });
	    };
	    $scope.adminGetUniqueProducts = function () {
	        $scope.products = [];
	        $http({
	            method: "GET",
	            url: '/adminGetUniqueProducts'
	        }).success(function (response) {
	            if (response.Status == 200) {
	                $scope.products = response.products;
	                alert(response.Message);
	            }
	            else {
	                $scope.products = [];
	            }
	        });
	    };


////////*********** farmer tab functionalities start  ************//////////////
    $scope.f1 =[]  // farmer list
    $scope.f2 =[]  // approval lits
    $scope.f3 =[]  // search list
    $scope.fc="farmerID"; // search dropdown
    var f1_startPosition = 0;    
    var f2_startPosition = 0;
    var f3_startPosition = 0;
    $scope.f1_stopLoading = false;
    $scope.f2_stopLoading = false;
    $scope.f3_stopLoading = false;

    $scope.adminLoginSubmit = function() {
		$http({
			method : "POST",
			url : '/adminLogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password,
				"adminKey": $scope.adminKey
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				$scope.invalidCredentials= false;
				$scope.errMsg = data.msg;
				
			}
			else {
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/adminDashboard"); 
			}
				
		}).error(function(error) {
			
		});
	};
	
	
    $scope.getFarmerList = function () {
        $scope.f1 = [];
    	f1_startPosition = 0;
    	$http({
            method: "GET",
            url: '/adminGetFarmerList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f1 = response.farmerList;
          		$scope.f1_count = response.count;
          		f1_startPosition = $scope.f1.length;
            }
            else {
                $scope.f1 = [];
            }
        });
    };

    $scope.loadMoreF1 = function (){
        console.log("F1 startPosition::::::::" + f1_startPosition);
        if (f1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetFarmerList',
            params: {
                "startPosition": f1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f1_startPosition = 0;
                $scope.f1_stopLoading = true;
            }
            else{
                if ($scope.f1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.f1.push(response.farmerList[i]);
                    }
                }
            f1_startPosition = f1_startPosition + response.count;
            $scope.f1_count =  $scope.f1_count  + response.count;
            }

        }).error(function (err) {
            $scope.f1 = [];
            f1_startPosition = 0;
            $scope.f1_stopLoading = true;
        });
    }
    }// end loadMoreF1 


    //getFarmerApprovalPendingList
    $scope.getFarmerApprovalPendingList = function () {
        $scope.f2 = [];
    	f2_startPosition = 0;
    	$http({
            method: "GET",
            url: '/adminGetFarmerApprovalPendingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f2 = response.farmerList;
          		$scope.f2_count = response.count;
                f2_startPosition = $scope.f2.length;
            }
            else {
                $scope.f2 = [];
            }
        });
    };

    $scope.loadMoreF2 = function () {
        console.log("F2 startPosition:" + f2_startPosition);
        if (f2_startPosition > 0 ){	
        $http({
            method: "GET",
            url: '/adminGetFarmerApprovalPendingList',
            params: {
                "startPosition": f2_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f2_startPosition = 0;
                $scope.f2_stopLoading = true;
            }
            else{
            	
            		for (i = 0; i < response.count; i++) {
                		$scope.f2.push(response.farmerList[i]);
            		}
                    f2_startPosition = f2_startPosition + response.count;
                    $scope.f2_count =  $scope.f2_count  + response.count;
            	
            }
        }).error(function (err) {
            $scope.f2 = [];
            f2_startPosition = 0;
            $scope.f2_stopLoading = true;
        });
    }
    };
	
	$scope.approveFarmer = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminApproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.approve =true;
                f.disapprove =false;
            }
            else {
                alert("Error: Unable to add farmer to the system.");
            }
        });
    };
    $scope.disApproveFarmer = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminDisapproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.approved =false;
                f.disapprove =true;
            }
            else {
                alert("Error");
            }
        });
    };
    
    $scope.approveFarmerOnSearch = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminApproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.approved1 =false;
                //f.disapprove =false;
            }
            else {
                alert("Error: Unable to add farmer to the system.");
            }
        });
    };
    $scope.disApproveFarmerOnSearch = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminDisapproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.approved = 1;
                //f.disapprove =true;
            }
            else {
                alert("Error");
            }
        });
    };

	$scope.searchFarmer = function () {
        alert($scope.fc + ":" +$scope.fq);
        $scope.f3 = [];
    	f3_startPosition = 0;
        $scope.fq = $scope.fq.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
        alert("Search Term: " +$scope.fq);
    	$http({
            method: "GET",
            url: '/adminGetFarmerSearchList',
            params: {
                startPosition: f3_startPosition,
                criteria: $scope.fc,
                q: $scope.fq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f3 = response.farmerList;
          		$scope.f3_count = response.count;
            }
            else if (response.Status == 400)
                alert(response.Message);
            else {
                $scope.f3 = [];
            }
            f3_startPosition = $scope.f3.length;
            console.log("showFarmerList startPosition:" + f3_startPosition);
        });
    };

    $scope.loadMoreF3 = function () {
        console.log("F3 startPosition:" + f3_startPosition);
        if (f3_startPosition > 0 ){	
        $http({
            method: "GET",
            url: '/adminGetFarmerSearchList',
            params: {
                startPosition: f3_startPosition,
                criteria: $scope.fc,
                q: $scope.fq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f3_startPosition = 0;
                $scope.f3_stopLoading = true;
            }
            else{           	
            	for (i = 0; i < response.count; i++) {
                	$scope.f3.push(response.farmerList[i]);
            	}
            f3_startPosition = f3_startPosition + response.count;
            $scope.f3_count =  $scope.f3_count  + response.count;
        	}
        }).error(function (err) {
            $scope.f3 = [];
            f3_startPosition = 0;
            $scope.f3_stopLoading = true;
        });
    }
    };

////////*********** farmer tab functionalities end  ************//////////////

////////*********** Customer tab functionalities start  ************//////////////
    $scope.c1 =[]  // customer list
    $scope.c2 =[]  // customer approval lits
    $scope.c3 =[]  // customer search list
    $scope.cc="customer_id"; // search customer criteria dropdown
    var c1_startPosition = 0;    
    var c2_startPosition = 0;
    var c3_startPosition = 0;
    $scope.c1_stopLoading = false;
    $scope.c2_stopLoading = false;
    $scope.c3_stopLoading = false;

    $scope.getCustomerList = function () {
        $scope.c1 = [];
        c1_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetCustomerList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c1 = response.customerList;
                $scope.c1_count = response.count;
                c1_startPosition = $scope.c1.length;
            }
            else {
                $scope.c1 = [];
            }
        });
    };

    $scope.loadMoreC1 = function (){
        console.log("C1 startPosition::::::::" + c1_startPosition);
        if (c1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetCustomerList',
            params: {
                "startPosition": c1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c1_startPosition = 0;
                $scope.c1_stopLoading = true;
            }
            else{
                if ($scope.c1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.c1.push(response.customerList[i]);
                    }
                }
            c1_startPosition = c1_startPosition + response.count;
            $scope.c1_count =  $scope.c1_count  + response.count;
            }

        }).error(function (err) {
            $scope.c1 = [];
            c1_startPosition = 0;
            $scope.c1_stopLoading = true;
        });
    }
    }// end loadMoreC1 

    $scope.getCustomerApprovalPendingList = function () {
        $scope.c2 = [];
        c2_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetCustomerApprovalPendingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c2 = response.customerList;
                $scope.c2_count = response.count;
                c2_startPosition = $scope.c2.length;
            }
            else {
                $scope.c2 = [];
            }
        });
    };

    $scope.loadMoreC2 = function () {
        console.log("C2 startPosition:" + c2_startPosition);
        if (c2_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetCustomerApprovalPendingList',
            params: {
                "startPosition": c2_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c2_startPosition = 0;
                $scope.c2_stopLoading = true;
            }
            else{
                
                    for (i = 0; i < response.count; i++) {
                        $scope.c2.push(response.customerList[i]);
                    }
                    c2_startPosition = c2_startPosition + response.count;
                    $scope.c2_count =  $scope.c2_count  + response.count;
                
            }
        }).error(function (err) {
            $scope.c2 = [];
            c2_startPosition = 0;
            $scope.c2_stopLoading = true;
        });
    }
    };
    
    $scope.approveCustomer = function (c) {
        alert(c.cust_id);
        $http({
            method: "GET",
            url: '/adminApproveCustomer',
            params: {
             "customer": c.cust_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                c.disabled =true;
            }
            else {
                alert("Error: Unable to add customer to the system.");
            }
        });
    };
    $scope.disApproveCustomer = function (c) {
        alert(c.cust_id);
        $http({
            method: "GET",
            url: '/adminDisapproveCustomer',
            params: {
             "customer": c.cust_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                c.disabled =true;
            }
            else {
                alert("Error");
            }
        });
    };

    $scope.searchCustomer = function () {
        alert($scope.cc + ":" +$scope.cq);
        $scope.c = [];
        c3_startPosition = 0;
        $scope.cq = $scope.cq.replace(/[^a-z0-9A-Z@_+-]/g, "");
        alert("refine:" +$scope.cq);
        $http({
            method: "GET",
            url: '/adminGetCustomerSearchList',
            params: {
                startPosition: c3_startPosition,
                criteria: $scope.cc,
                q: $scope.cq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c3 = response.customerList;
                $scope.c3_count = response.count;
            }
            else {
                $scope.c3 = [];
            }
            c3_startPosition = $scope.c3.length;
            console.log("showFarmerList startPosition:" + c3_startPosition);
        });
    };

    $scope.loadMoreC3 = function () {
        console.log("C3 startPosition:" + c3_startPosition);
        if (c3_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetCustomerSearchList',
            params: {
                startPosition: c3_startPosition,
                criteria: $scope.cc,
                q: $scope.cq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c3_startPosition = 0;
                $scope.c3_stopLoading = true;
            }
            else{               
                for (i = 0; i < response.count; i++) {
                    $scope.c3.push(response.farmerList[i]);
                }
            c3_startPosition = c3_startPosition + response.count;
            $scope.c3_count =  $scope.c3_count  + response.count;
            }
        }).error(function (err) {
            $scope.c3 = [];
            c3_startPosition = 0;
            $scope.c3_stopLoading = true;
        });
    }
    };
    
////////*********** Product tab functionalities start  ************//////////////
    $scope.p1 =[]  // product list
    $scope.p2 =[]  // product approval lits
    $scope.p3 =[]  // product search list
    $scope.pc="product_id"; // search product criteria dropdown
    var p1_startPosition = 0;    
    var p2_startPosition = 0;
    var p3_startPosition = 0;
    $scope.p1_stopLoading = false;
    $scope.p2_stopLoading = false;
    $scope.p3_stopLoading = false;

    $scope.getProductList = function () {
        $scope.p1 = [];
        p1_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetProductList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status === 200) {
                $scope.p1 = response.productList;
                $scope.p1_count = response.count;
                p1_startPosition = $scope.p1.length;
            }
            else {
                $scope.p1 = [];
            }
        });
    };

    $scope.loadMoreP1 = function (){
        console.log("P1 startPosition::::::::" + p1_startPosition);
        if (p1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetProductList',
            params: {
                "startPosition": p1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                p1_startPosition = 0;
                $scope.p1_stopLoading = true;
            }
            else{
                if ($scope.p1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.p1.push(response.productList[i]);
                    }
                }
            p1_startPosition = p1_startPosition + response.count;
            $scope.p1_count =  $scope.p1_count  + response.count;
            }

        }).error(function (err) {
            $scope.p1 = [];
            p1_startPosition = 0;
            $scope.p1_stopLoading = true;
        });
    }
    }// end loadMoreP1 

    $scope.getProductApprovalPendingList = function () {
        $scope.p2 = [];
        p2_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetProductApprovalPendingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.p2 = response.productList;
                $scope.p2_count = response.count;
                p2_startPosition = $scope.p2.length;
            }
            else {
                $scope.p2 = [];
            }
        });
    };

    $scope.loadMoreP2 = function () {
        console.log("P2 startPosition:" + p2_startPosition);
        if (p2_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetProductApprovalPendingList',
            params: {
                "startPosition": p2_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                p2_startPosition = 0;
                $scope.p2_stopLoading = true;
            }
            else{
                
                    for (i = 0; i < response.count; i++) {
                        $scope.p2.push(response.productList[i]);
                    }
                    p2_startPosition = p2_startPosition + response.count;
                    $scope.p2_count =  $scope.p2_count  + response.count;
                
            }
        }).error(function (err) {
            $scope.p2 = [];
            p2_startPosition = 0;
            $scope.p2_stopLoading = true;
        });
    }
    };
    
    $scope.approveProduct = function (p) {
        alert(p.product_id);
        $http({
            method: "GET",
            url: '/adminApproveProduct',
            params: {
             "product": p.product_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                p.approve =true;
                p.disapprove =false;
            }
            else {
                alert("Error: Unable to add product to the system.");
            }
        });
    };
    $scope.disApproveProduct = function (p) {
        alert(p.product_id);
        $http({
            method: "GET",
            url: '/adminDisapproveProduct',
            params: {
             "product": p.product_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                p.disapprove =true;
                p.approve =false;
            }
            else {
                alert("Error");
            }
        });
    };

    $scope.searchProduct = function () {
        alert($scope.pc + ":" +$scope.pq);
        $scope.p = [];
        p3_startPosition = 0;
        $scope.pq = $scope.pq.replace(/[^a-z0-9A-Z@_+-]/g, "");
        alert("refine:" +$scope.pq);
        $http({
            method: "GET",
            url: '/adminGetProductSearchList',
            params: {
                startPosition: p3_startPosition,
                criteria: $scope.pc,
                q: $scope.pq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.p3 = response.productList;
                $scope.p3_count = response.count;
            }
            else {
                $scope.p3 = [];
            }
            p3_startPosition = $scope.p3.length;
            console.log("showProductList startPosition:" + p3_startPosition);
        });
    };

    $scope.loadMoreP3 = function () {
        console.log("P3 startPosition:" + p3_startPosition);
        if (p3_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetProductSearchList',
            params: {
                startPosition: c3_startPosition,
                criteria: $scope.pc,
                q: $scope.pq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                p3_startPosition = 0;
                $scope.p3_stopLoading = true;
            }
            else{               
                for (i = 0; i < response.count; i++) {
                    $scope.p3.push(response.productList[i]);
                }
            p3_startPosition = p3_startPosition + response.count;
            $scope.p3_count =  $scope.p3_count  + response.count;
            }
        }).error(function (err) {
            $scope.p3 = [];
            p3_startPosition = 0;
            $scope.p3_stopLoading = true;
        });
    }
    };
    
////////*********** Product tab functionalities end  ************//////////////
    
////////*********** admin Bills tab functionalities start  ************//////////////

    $scope.b1 =[]  // billsing list
    //$scope.b2 =[]  // billing approval lits
    $scope.b3 =[]  // billing search list
    $scope.bc="order_id"; // search customer criteria dropdown
    var b1_startPosition = 0;    
    var b2_startPosition = 0;
    var b3_startPosition = 0;
    $scope.b1_stopLoading = false;
    $scope.b2_stopLoading = false;
    $scope.b3_stopLoading = false;

    $scope.getBillingList = function () {
        $scope.b1 = [];
        b1_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetBillingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                alert(response.Message);
                $scope.b1 = response.billingList;
                $scope.b1_count = response.billingList.length;
                b1_startPosition = $scope.b1.length;
            }
            else {
                $scope.b1 = [];
            }
        });
    };

    $scope.loadMoreB1 = function (){
        console.log("B1 startPosition::::::::" + b1_startPosition);
        if (b1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetBillingList',
            params: {
                "startPosition": b1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                b1_startPosition = 0;
                $scope.b1_stopLoading = true;
            }
            else{
                if ($scope.b1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.b1.push(response.billingList[i]);
                    }
                }
            b1_startPosition = b1_startPosition + response.count;
            $scope.b1_count =  $scope.b1_count  + response.count;
            }

        }).error(function (err) {
            $scope.b1 = [];
            b1_startPosition = 0;
            $scope.b1_stopLoading = true;
        });
    }
    }// end loadMoreB1 

    $scope.searchBill = function () {
        alert($scope.bc + ":" +$scope.bq);
        $scope.b3 = [];
        b3_startPosition = 0;
        $scope.bq = $scope.bq.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
        alert("Search Term: " +$scope.bq);
        $http({
            method: "GET",
            url: '/adminGetBillingSearchList',
            params: {
                startPosition: b3_startPosition,
                criteria: $scope.bc,
                q: $scope.bq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.b3 = response.billingList;
                $scope.b3_count = response.billingList.length;
            }
            else if (response.Status == 400)
                alert(response.Message);
            else {
                $scope.b3 = [];
            }
            b3_startPosition = $scope.b3.length;
            console.log("showFarmerList startPosition:" + b3_startPosition);
        });
    };

    $scope.loadMoreB3 = function () {
        console.log("B3 startPosition:" + b3_startPosition);
        if (b3_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetBillingSearchList',
            params: {
                startPosition: b3_startPosition,
                criteria: $scope.bc,
                q: $scope.bq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                b3_startPosition = 0;
                $scope.b3_stopLoading = true;
            }
            else{               
                for (i = 0; i < response.count; i++) {
                    $scope.b3.push(response.farmerList[i]);
                }
            b3_startPosition = b3_startPosition + response.count;
            $scope.b3_count =  $scope.b3_count  + response.count;
            }
        }).error(function (err) {
            $scope.b3 = [];
            b3_startPosition = 0;
            $scope.b3_stopLoading = true;
        });
    }
    };

////////*********** end admin Bills tab functionalities  ************//////////////

 $scope.dmax =new Date().toJSON().slice(0,10);

 	// Showing all customers trips on Map
 	$scope.showAllTripsOnMap = function(){
 		
 		$http({
			method : "POST",
			url : '/getAllOrdersForAdmin',
			data : {}
		}).success(function(data) {
				//$scope.zipcodes = data.zipcodes;
				var farmerLat;
				var farmerLong;
				var custLat;
				var custLong;
				var zips = data.zipcodes;
				document.getElementById('map').style = "height: 600px;";
				var map = new google.maps.Map(document.getElementById('map'), {
		            center: {lat: 37.3456227, lng: -121.8847222},
		            zoom: 10,
		            mapTypeId: google.maps.MapTypeId.TERRAIN
		          });
				var lineSymbol = {
		                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		                scale: 3,
		                strokeColor: '#393'
		              };
				var i = 0;
				 var interval = setInterval(function() {
					$http({
						method : "GET",
						url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+zips[i].farmerZip
					
					}).success(function(data1) {
						farmerLat = Number(data1.results[0].geometry.location.lat);
						farmerLong = Number(data1.results[0].geometry.location.lng);
						
						$http({
							method : "GET",
							url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+zips[i].customerZip
						
						}).success(function(data2) {
							custLat = Number(data2.results[0].geometry.location.lat);
							custLong = Number(data2.results[0].geometry.location.lng);
							
							var line = new google.maps.Polyline({
					            path: [{lat: farmerLat, lng: farmerLong}, {lat: custLat, lng: custLong}],
					            icons: [{
					              icon: lineSymbol,
					              offset: '100%'
					            }],
					            map: map
					          });
							var count = 0;
					        window.setInterval(function() {
						          count = (count + 1) % 200;
						
						          var icons = line.get('icons');
						          icons[0].offset = (count / 2) + '%';
						          line.set('icons', icons);
						      }, 300);
						}).error(function(error) {
						});
					}).error(function(error) {
				});
				i++;
			    if(i === zips.length){
			        clearInterval(interval);
			    }
			}, 3000);
		}).error(function(error) {
			
		});
 		
 	};
 
});


////////*********** Start admin DynamicPricing tab functionalities ************//////////////

$(document).ready(function () {
    
    $(".applyDPForProductType").on("click", function () {
        i=0;
        var productTypes =[];
        $('.productTypes_checkbox:checked').each(function () {
           productTypes[i++] = $(this).val();
       });
        var percentage = $("#DPPercentageProductType").val();
        alert ("Applying new pricing of " + percentage +      " for the following parameters: " + productTypes );
        var param = { productType: productTypes[0], 
                        percentage: percentage
                    }
        $.getJSON("\ adminApplyDPForProductType",  param, function(res){
           alert(res.Message);
        });

    });
    $(".applyDPForProduct").on("click", function () {
        i=0;
        var products =[];
        $('.products_checkbox:checked').each(function () {
           products[i++] = $(this).val();
       });
        var percentage = $("#DPPercentageProduct").val();
        alert ("Applying new pricing of " + percentage +      " for the following parameters: " + products );
        var param = { product: products[0], 
                        percentage: percentage
                    }
        $.getJSON("\ adminApplyDPForProduct",  param, function(res){
           alert(res.Message);
        });

    });

});
    
////////*********** End admin DynamicPricing tab functionalities ************//////////////
