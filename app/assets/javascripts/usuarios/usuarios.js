app.controller('UsuariosController', function($http, $scope, $location){
    var page = 1;
    var url = 'http://localhost:3000/api/usuarios?page=';
    $scope.hasNext = true;
    $scope.hasPrevious = false;
    $scope.notFound = false;

    getUsersByPage(page, url)
        .then((response)=>{
            $scope.usuarios = response.data.data;
            if ($scope.usuarios.length == 0){
                $scope.notFound = true;
                $scope.hasNext = false;
            }
    });
    $scope.toDate = function(data){
        return (new Date(data)).toLocaleDateString();
    }

    $scope.excluir = function(id){
        $http.delete('https://angularjs-ruby-application.herokuapp.com/api/usuarios/'+id).then((response)=>{
            alert(response.data.message);
            getUsersByPage(page, url)
            .then((response)=>{
                if (response.data.data.length == 0 || response.data.data == null){
                    if (page == 1){
                        $scope.notFound = true;
                        $scope.hasNext = false;
                    }
                    $scope.previous();
                }
                $scope.usuarios = response.data.data;
            });
        })
    }
    $scope.editar = function(id){
        $location.path('/editar/'+id);
    }
    $scope.info = function(id){
        $location.path('/info/'+id);
    }
    $scope.criar = function(){
        $location.path('/cadastrar/');
    }

    $scope.next = function(){
        getUsersByPage(page+1, url)
        .then((response)=>{
            if (response.data.data.length == 0 || response.data.data == null){
                $scope.hasNext = false;
            }else{
                page++;
                $scope.hasNext = true;
                $scope.hasPrevious = true;
                $scope.usuarios = response.data.data;
            }
        });
    }
    $scope.previous = function(){
        getUsersByPage(page - 1, url)
        .then((response)=>{
            $scope.hasPrevious = true;
            $scope.hasNext = true;
            if (--page < 2){
                $scope.hasPrevious = false;
            }
            $scope.usuarios = response.data.data;
        });
    }


    $scope.findByName = function(){
        if ($scope.nome){
            url = "https://angularjs-ruby-application.herokuapp.com/api/usuarios/search/findByName/"+$scope.nome+"?page=";
            getUsersByPage(page = 1, url).then((response)=>{
                $scope.usuarios = response.data.data;
                if ($scope.usuarios.length == 0){
                    $scope.notFound = true;
                    $scope.hasNext = false;
                }else{
                    $scope.notFound = false;
                    $scope.hasNext = true;
                    $scope.hasPrevious = false;
                    $scope.nome = '';
                }
            });
        }else{
            alert("Digite algo...")
        }
    }

    $scope.refresh = function(){
        url = 'https://angularjs-ruby-application.herokuapp.com/api/usuarios?page=';
        page = 1;
        getUsersByPage(page, url).then(response =>{
            $scope.usuarios = response.data.data;
            if ($scope.usuarios.length == 0){
                $scope.notFound = true;
                $scope.hasNext = false;  
            }else{
                $scope.hasNext = true;  
                $scope.notFound = false;
            }
        });
        $scope.hasPrevious = false;
    }

    
    function getUsersByPage(page, url){
        return $http.get(url+page);
    }
})