app.controller('InfoController', function($scope, $routeParams, $http, $location){
    $http.get('https://angularjs-ruby-application.herokuapp.com/api/usuarios/'+$routeParams.id)
    .then(res=>{
        var usuario = res.data.data.usuario;
        $scope.nome = usuario.nome;
        $scope.cpf = usuario.cpf;
        $scope.data = new Date(usuario.data_nascimento);
        $scope.email = usuario.email;
        $scope.telefone = res.data.data.telefone.numero;
        $scope.cep = res.data.data.endereco.cep;
        $scope.uf = res.data.data.endereco.estado;
        $scope.cidade = res.data.data.endereco.cidade;
    });

    $scope.paraEdicao = function(){
        $location.path("/editar/"+$routeParams.id);
    }
    $scope.excluir = function(){
        $http.delete('https://angularjs-ruby-application.herokuapp.com/api/usuarios/'+$routeParams.id).then((response)=>{
            alert(response.data.message);
           $location.path("/usuarios");
        })
    }
});