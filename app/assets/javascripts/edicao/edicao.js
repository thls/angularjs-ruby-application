app.controller('EdicaoController', function($scope, $http, $routeParams, $location){
    $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(res=>{
        $scope.ufs = res.data;
    });

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
        $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+$scope.uf+'/distritos').then(res=>{
        $scope.cidades = res.data;
        });
        $scope.cidade = res.data.data.endereco.cidade;
    });

    $scope.carregaCidades = function(){
        $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+$scope.uf+'/distritos').then(res=>{
        $scope.cidades = res.data;
        });
    }

    $scope.atualizar = function(){
        var validaOnzeNumeros = /^[0-9]{11}$/;
        var validaCep = /^[0-9]{8}$/;

        if (!validaOnzeNumeros.test($scope.cpf)){
            alert("<<CPF>>Digite apenas numeros! Certifique-se de que contém 11 dígitos.");
            return;
        }
        if(!validaCep.test($scope.cep)){
            alert("<<CEP>>Digite apenas numeros! Certifique-se de que contém 8 dígitos");
            return;
        }
        if (!validaOnzeNumeros.test($scope.telefone)){
            alert("<<Telefone>>Digite apenas numeros! Certifique-se de que contém 11 dígitos");
            return;
        }
          
        var usuario = {nome: $scope.nome,
                        cpf: $scope.cpf,
                        email: $scope.email,
                        data_nascimento: $scope.data.toLocaleDateString(),
                        endereco: {
                            cep: $scope.cep,
                            estado: $scope.uf,
                            cidade: $scope.cidade
                        },
                        telefone: {
                            numero: $scope.telefone
                        }    
                    }
        $http({
            url: 'https://angularjs-ruby-application.herokuapp.com/api/usuarios/'+$routeParams.id,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            data: usuario
        }).then(res=>{
            if (res.data.status == 'success'){
                alert(res.data.message);
                $location.path("/usuarios");
            }else{
                alert(res.data.message);
            }
        })
    }
    $scope.excluir = function(){
        $http.delete('https://angularjs-ruby-application.herokuapp.com/api/usuarios/'+$routeParams.id).then((response)=>{
            alert(response.data.message);
           $location.path("/usuarios");
        })
    }

});