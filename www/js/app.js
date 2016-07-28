var app = angular.module('co2', ['ionic', 'ionic-modal-select']);
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
// center header on Andriod & iOS
app.config(function($ionicConfigProvider) {
 	$ionicConfigProvider.navBar.alignTitle('center');
});
  // main controller
  app.controller('MainController', ['$scope','$window',
    function($scope,$window) {
	
	// globals	
	var refrigerant, charge, total, totalNumber, chargeNumber, message;
	
	totalNumber = document.getElementById("totalNumber");
	chargeNumber = document.getElementById("charge");
	message = document.getElementById("message");
	
	// select options
	$scope.selectables = [
   	{value: '14.8', name: 'HFC 23'},
	{value: '13.396', name: 'HFC 508B'},
	{value: '4.47', name: 'HFC 143a'},
	{value: '3.985', name: 'HFC 507A'},
	{value: '3.922', name: 'HFC 404A'},
	{value: '3.607', name: 'HFC 428A'},
	{value: '3.5', name: 'HFC 125'},
	{value: '3.245', name: 'HFC 434A'},
	{value: '3.22', name: 'HFC 227ea'},
	{value: '3.143', name: 'HFC 422A'},
	{value: '2.729', name: 'HFC 422D'},
	{value: '2.346', name: 'HFC 417A'},
	{value: '2.28', name: 'HFC 423A'},
	{value: '2.264', name: 'HFC 438A'},
	{value: '2.138', name: 'HFC 427A'},
	{value: '2.107', name: 'HFC 407A'},
	{value: '2.088', name: 'HFC 410A'},
	{value: '1.888', name: 'HFC 442A'},
	{value: '1.825', name: 'HFC 407F'},
	{value: '1.805', name: 'HFC 437A'},
	{value: '1.774', name: 'HFC 407C'},
	{value: '1.508', name: 'HFC 426A'},
	{value: '1.43', name: 'HFC 134a'},
	{value: '1.03', name: 'HFC 245fa'},
	{value: '1.24', name: 'HFC 152a'}
    ];
	
	// get selected id onchange
	$scope.selectValue = function(refrigerantValue) {
		refrigerant = refrigerantValue;
		console.log("refrigerant: "+refrigerant.value);
	};
	
	// get button value and add it to charge input + delete function
	 $scope.getNumber = function(data) {
		charge = chargeNumber.innerHTML = chargeNumber.innerHTML+data;		
		$scope.delNumber = function() {
			charge = charge.substring( 0, charge.length - 1 );
			chargeNumber.innerHTML = charge;
		};
    };
		
	// add refrigerant & charge values together onclick
	$scope.calcValues = function(selectValue, getNumber) {
		if(charge === undefined || refrigerant === "" || refrigerant === undefined){
			totalNumber.classList.remove("balanced");
			totalNumber.classList.add("assertive");
			totalNumber.innerHTML = "Error";
			message.innerHTML = "Select a refrigerant and enter a tonne value";
		} else {
			total = refrigerant.value * charge;
			if( total >= 5 && total < 50 ) {
				message.innerHTML = "Leak test once every 12 months<br>Once every 24 months if leak detector fitted";
				} else if ( total >= 50 && total < 500 ) {
				message.innerHTML = "Leak test twice every 12 months<br>Once every 24 months if leak detector fitted";
				} else if ( total >= 500 ) {
				message.innerHTML = "Leak test four times every 12 months<br>Twice every 24 months if leak detector fitted";
				}
					totalNumber.classList.remove("assertive");
					totalNumber.classList.add("balanced");
					totalNumber.innerHTML = Math.round(total);
			}
		};
	
}// end func
]); // end MainController
	  
	  
	