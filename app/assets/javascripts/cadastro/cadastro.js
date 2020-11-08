app.controller('CadastroController', function($scope, $http, $location){
    $scope.cidades;

    $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(res=>{
        $scope.ufs = res.data;
    });

    $scope.carregaCidades = function(){
        $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+$scope.uf+'/distritos').then(res=>{
        $scope.cidades = res.data;
        });
    }

    $scope.criar = function(){
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
                url: 'https://angularjs-ruby-application.herokuapp.com/api/usuarios/',
                method: 'POST',
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
});