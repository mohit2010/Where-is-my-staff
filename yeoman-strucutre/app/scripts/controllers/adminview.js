'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:AdminviewCtrl
 * @description
 * # AdminviewCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('AdminviewCtrl',['$scope','$firebaseArray','$localStorage','$location',function($scope,$firebaseArray,$localStorage,$location){
    dbOperations.init();
    redirect();
    function redirect(){
        if(!localStorage.AdminName){
            $location.path('/login');
        }
    };
    
    //-------------------------firebase code here--------------------
    
    // var ref = new Firebase('https://console.firebase.google.com/project/where-is-my-staff-95951/database/where-is-my-staff-95951/data');
    // $scope.contacts = $firebaseArray(ref);
  
    
    // var rootRef = $firebaseArray(firebase.database().ref().child('users'));
    var rootRef = firebase.database().ref();    
    var userRef = rootRef.child('users');
    $scope.users=$firebaseArray(userRef);   
    const users=$firebaseArray(userRef);
    // $scope.user = $firebaseArray(userRef);
    // $scope.user = "";
    // console.log($firebaseArray(userRef));

    $scope.username = localStorage.AdminName;
    $scope.id = localStorage.userid; 
    
    //------------------------------admin.html save data-------------------------
    $scope.saveData = function(a,b){
        // userRef.$save
        // user.$save(user.enable).then
      //   users.$save(k);
        // users.$save(user).then(function() {
        //     // ref.key() === list[2].$id; // true
        //     console.log("Added changes to database");
        //   });
        console.log(users);
        console.log({a});
        console.log({b});
        let c =0;

        console.log(users[0]);
        for (let user of b){
            console.log(user.enable,c);
            
            console.log(c);

            if(user.enable=="false" || user.enable==false)
            {
                console.log(user.enable,c);
                users.$remove(c);
            }
            c++;
        }
    //   for (let user in b) {
    //       console.log("user is" ,b[1].email);
    //   }
  
    };
     //--------------------- employee details here--------------------------------
    $scope.showDetails = (a,b) => {
        console.log(a,b);
        // console.log(a.$id,users.$getRecord(a.$id));
        $scope.id =a.$id;
        $scope.msg = "inside show details";
        $scope.empName = users.$getRecord(a.$id).name;
        $scope.empEmail = users.$getRecord(a.$id).email;
        $scope.empUserid = users.$getRecord(a.$id).userid;
        $scope.empType = users.$getRecord(a.$id).type;
        $scope.latitude = users.$getRecord(a.$id).latitude;
        $scope.longitude = users.$getRecord(a.$id).longitude;
    }
    // -------------------------Assign Task here---------------------------------
    $scope.date = new Date();
    $scope.setTask = function() {

        const userEntry = users.$indexFor($scope.id);
        console.log($scope.taskDate.toString(),$scope.taskName);
        users[userEntry].taskName = $scope.taskName;
        users[userEntry].taskDate = $scope.taskDate.toString();
  
        users.$save(userEntry).then(data => {
          alert("New Task succesfully added");
        });

        // console.log($scope.id);
        // console.log(users.$getRecord($scope.id));
        // users.$getRecord($scope.id).taskName = $scope.taskName;
        // users.$getRecord($scope.id).taskDate = $scope.taskDate;
    }

//-----------------------------working maps but api problem--------------------------- 
   /* $scope.map = {center: {latitude: 28.6547555, longitude: 77.38890719999999 }, zoom: 14 };
    $scope.options = {scrollwheel: true};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 28.6547555,
        longitude: 77.38890719999999
      },
      options: { draggable: false },
      events: {
        dragend: function (marker, eventName, args) {
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + '       ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };*/
    $scope.$watch(function($scope){
      return $scope.latitude;
    }, function (newValue,oldValue){
      var x = $scope.longitude || 24
      if( $scope.longitude || 24)
      console.log(x);
      angular.extend($scope, {
        osloCenter: {
            lat: 28.6547555,
            lng: 77.38890719999999,
            zoom: 10
        },
        markers: {
            osloMarker: {
                lat: $scope.latitude,
                lng: $scope.longitude,
                message: "I am here",
                focus: true,
                draggable: true
            }
        },
        defaults: {
            scrollWheelZoom: true
        }
      });
    })
    // $scope.$apply(function() {
    // var x = $scope.longitude || 24
    // if( $scope.longitude || 24)
    // console.log(x);
    // });
    angular.extend($scope, {
      osloCenter: {
          lat: 28.6547555,
          lng: 77.38890719999999,
          zoom: 10
      }});
    
}]);
