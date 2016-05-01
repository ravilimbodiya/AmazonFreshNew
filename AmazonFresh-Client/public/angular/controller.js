var amazon = angular.module('amazonFreshApp', []);
amazon.controller('amazonCntrl', function($scope, $http) {
	$scope.quantity = 1;
	
	$scope.listAllProducts = function() {
		$http({
			method : "POST",
			url : '/listAllProducts'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.allProducts = data.result;
				//$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.errLogin = data.msg;
			$scope.errUnexp = data.msg;
		});
	};
	
	$scope.addToCart = function(product, quantity, imageId) {
		//alert(product.name);
		$http({
			method : "POST",
			url : '/addToCart',
			data : {
				"product": product,
				"quantity":quantity
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				
			}
		}).error(function(error) {
			
		});
		
		
        var cart = $('.glyphicon-shopping-cart');
        var imgId = '#'+imageId;
        var imgtodrag = $(imgId);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
	};
	
	$scope.showShoppingCart = function() {
		window.location.assign = "/shoppingCart";
	};

	$scope.makePayment = function() {
		window.location.assign = "/makePayment";
	};
	
	$scope.getShoppingCart = function() {
		$http({
			method : "POST",
			url : '/getShoppingCart'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.emptyShoppingCart = false;
				$scope.shoppingCart = data.shoppingCart;
				$scope.allItems = data.shoppingCart.items;
				$scope.sum = data.sum;
				$scope.itemsInCart = data.shoppingCart.items.length;
				$scope.checkoutSection = true;
				$scope.receiptSection = false;
				$scope.paymentMethodFlag = true;
			}
			else {
				$scope.emptyShoppingCart = true;
				$scope.itemsInCart = 0;
				$scope.allItems = [];
				$scope.sum = 0.0;
				$scope.msg = data.msg;
				$scope.checkoutSection = true;
				$scope.receiptSection = false;
				$scope.paymentMethodFlag = true;
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.getExistingAddress  = function() {
		if($scope.addressType === 'existing'){
			$http({
				method : "POST",
				url : '/getExistingAddress'
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 200) {
					$scope.address = data.address;
					$scope.zipcode = data.zipcode;
					document.getElementById('address').disabled = true;
					document.getElementById('zipcode').disabled = true;
				}
				else {
					
				}
			}).error(function(error) {
				
			});
		} else {
			document.getElementById('address').disabled = false;
			document.getElementById('zipcode').disabled = false;
		}
		
	};
	
	
	$scope.showPaymentMethod  = function() {
		if($scope.paymentMethod === 'card'){
			$scope.paymentMethodFlag = false;
		} else {
			$scope.paymentMethodFlag = true;
		}
		
	};
	
	$scope.removeItemFromCart = function(index) {
		$http({
			method : "POST",
			url : '/removeItemFromCart',
			data : {
				"index" : index
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.shoppingCart = data.shoppingCart;
				$scope.allItems = data.shoppingCart.items;
				$scope.sum = data.sum;
				$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.placeOrder = function() {
	
		$http({
			method : "POST",
			url : '/placeOrder',
			data : {
				"address" : $scope.address,
				"zipcode" : $scope.zipcode,
				"deliveryDate" : $scope.deliveryDate,
				"deliveryTime" : $scope.deliveryTime,
				"paymentMethod" : $scope.paymentMethod,
				"nameOnCard" : $scope.nameOnCard,
				"cardNumber" : $scope.cardNumber1 + $scope.cardNumber2 + $scope.cardNumber3 + $scope.cardNumber4,
				"expiryMonth" : $scope.expiryMonth,
				"expiryYear" : $scope.expiryYear,
				"cvv" : $scope.cvv
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.itemsInCart = 0;
				$scope.order = data.order;
				$scope.items = data.order.shoppingCart.items;
				$scope.checkoutSection = false;
				$scope.receiptSection = true;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	
	$scope.getAllOrders = function() {
		
		$http({
			method : "POST",
			url : '/getAllOrders'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				//$scope.itemsInCart = 0;
				$scope.orders = data.orders;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.getAllOrdersByCustId = function() {
		
		$http({
			method : "POST",
			url : '/getAllOrdersByCustId'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				//$scope.itemsInCart = 0;
				$scope.orders = data.orders;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.showMap = function(order) {
		var farmerLat;
		var farmerLong;
		var custLat;
		var custLong;
		
		document.getElementById('map').style = "height: 600px;";
		var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.3456227, lng: -121.8847222},
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.TERRAIN
          });
		var lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
                strokeColor: '#393'
              };
		
		
		for(var i = 0; i < order.shoppingCart.items.length; i++){
			$http({
				method : "GET",
				url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+order.shoppingCart.items[i].farmer.zipcode
			
			}).success(function(data) {
				farmerLat = Number(data.results[0].geometry.location.lat);
				farmerLong = Number(data.results[0].geometry.location.lng);
				
				$http({
					method : "GET",
					url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+order.customer_zipcode
				
				}).success(function(data) {
					custLat = Number(data.results[0].geometry.location.lat);
					custLong = Number(data.results[0].geometry.location.lng);
					
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
			
			
			
			
			
			
		}
		
		
		
        
	};
	
	//Start Add Product
	$scope.renderAddProduct = function(type) {
		
		$http({
			method : "POST",
			url : '/renderAddProduct',
			data : {
					"type":type
				}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {				
				window.location.assign("/addProduct");
			}
			else {
				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Add Product

	//Start Submit Add Product
	$scope.submitAddProduct = function(type) {
			
		var filePath = document.getElementById("imgFile").value;
		//alert("File Path: " + filePath);
		$http({
			method : "POST",
			url : '/submitAddProduct',
			data : {
					"prodType" 		: $scope.prodType,
					"prodName" 		: $scope.prodName,
					"price" 		: $scope.price,
					"description" 	: $scope.description,
					"imgFile" 		: $scope.imgFile,
					"quantity"		: $scope.quantity
				}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {				
				window.location.assign("/farmerDashboard");
			}
			else {
				window.location.assign("/addProduct");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Submit Add Product
	
	//Start Add Product
	$scope.loadProducts = function() {
		var allProducts = [];
		$http({
			method : "GET",
			url    : '/loadProducts'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {				
				for(var i=0; i<data.rows.length; i++)
					allProducts.push(data.rows[i]);				
				
				$scope.allProducts = allProducts;				
			}
			else {
				alert("Unexpected Error. Please try again");
			}
		}).error(function(error) {
				alert("Unexpected Error: " + error);
		});
	};
	//End Add Product
});