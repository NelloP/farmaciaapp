angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '', id: 1 },
    { title: 'Acquista', id: 2 },
    { title: 'I nostri servizi', id: 3 },
    { title: 'Vieni a trovarci', id: 4 }
  ];
})

.controller('loginCtrl', function($scope, $stateParams, $http) {
  $scope.loggato = false;
  $scope.dati = {"name":"","pass":"","msg":""};
  if(localStorage.user && localStorage.pass){
    $scope.dati.name = localStorage.user;
    $scope.dati.pass = localStorage.pass;
  }
  $scope.logClick = function(){
    var query = "http://pierostesting.altervista.org/farmalog.php?name="+$scope.dati.name+"&pass="+$scope.dati.pass;
    console.log(query);
    $http.get(query)
    .success(function(data){ 
      if(data.response == 'yes'){
        sessionStorage.user = $scope.dati.name;
        sessionStorage.pass = $scope.dati.pass;
        localStorage.user = $scope.dati.name;
        localStorage.pass = $scope.dati.pass;
        $scope.loggato = true;
        $scope.farmaci = data.dats;
        sessionStorage.farmaci = $scope.farmaci;
      }
      else{
        alert("LOGIN FALLITO");
      }
    })
    
  };
  $scope.pageRe = function(){
   $scope.logClick();
  };
})

.controller('login2Ctrl', function($scope, $stateParams, $http) {
  $scope.index = $stateParams.index;
    var query = "http://pierostesting.altervista.org/farmalog.php?name="+localStorage.user+"&pass="+localStorage.pass+"&id="+$stateParams.index;
    console.log(query);
    $http.get(query)
    .success(function(data){ 
      if(data.response == 'yes'){
        $scope.farmaco = data.dats;
       /* var urldecode = function(str) {
          return decodeURIComponent((str+'').replace(/\+/g, '%20'));
        };*/
        $scope.farmaco.commento = unescape($scope.farmaco.commento);
        console.log($scope.farmaco);
      }
      else{
        alert("LOGIN FALLITO");
      }
    })
})
.controller('ServiziCtrl', function($scope, $stateParams) {
})


.controller('trovaciCtrl', function($scope, $stateParams) {
})


.controller('offertaCtrl', function($scope, $stateParams) {
})

.controller('BrowseCtrl', function($scope, $stateParams,$http) {
  $scope.dati = {"nome":"","farma":"","qaunt":1,"comme":""};
  $scope.dati.quant=1;
  $scope.prenota = function(){
    if($scope.dati.nome !="" && $scope.dati.farma != "" ){
      if( $scope.dati.quant >0 && $scope.dati.quant <5){
        var query = "http://pierostesting.altervista.org/farmacia.php?name="+$scope.dati.nome+"&farma="+$scope.dati.farma+"&quant="+$scope.dati.quant+"&comme="+escape($scope.dati.comme);
        $http.get(query)
        .success(function(data){ 
          if(data.response == 'success'){
            $scope.dati.comme="";
            $scope.dati.farma="";
            $scope.dati.nome="";
            $scope.dati.quant=1;
            
            alert("La tua prenotazione e' stata inviata, troverai il farmaco sul bancone");
      
          }
          else{
            alert("Si e' verificato un errore, riprovi piu' tardi");
          }
        }).error(function(e){
          console.log(e);
          alert($scope.dati);
        });
      }else{
        alert("La quantità può andare da 1 a 4 ");
      }
    }else{
      alert("Il tuo nome e il nome del farmaco sono obbligatori ");
    }
  }
});
