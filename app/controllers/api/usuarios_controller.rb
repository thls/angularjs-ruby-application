module Api
    class UsuariosController < ApplicationController
        # Listar todos os usuarios
        def index
            usuarios = Usuario.page(params[:page]).per_page(8);
            render json: {status: 'success', message:'Usuarios encontrados.', data:usuarios},status: :ok
        end
        
        # Recuperar usuario pelo ID
        def show
            begin
                usuario = Usuario.find(params[:id]);
                render  json: {status: 'success', message:'Usuario encontrado.', 
                                 data: {usuario: usuario, telefone:usuario.telefone, endereco: usuario.endereco}}, status: :ok
            rescue Exception => e
                render json: {status: 'fail', message: e},status: :ok
            end
        end

        # Criar um novo usuario
        def create
            begin
                if params[:data_nascimento] == nil
                    return render json: {status: 'fail', message: "Date invalid."},status: :ok
                end
                Date.parse(params[:data_nascimento]);
                
                usuario = Usuario.new(usuario_params);
                telefone = Telefone.new(telefone_params);
                usuario.telefone = telefone;
                endereco = Endereco.new(endereco_params);
                usuario.endereco = endereco;

                telefone.save! if telefone.invalid?
                endereco.save! if endereco.invalid?

                usuario.save!
                render json: {status: 'success', message: "Usuario registrado com sucesso.", data: usuario}, status: :ok
            rescue Exception => e
                render json: {status: 'fail', message: e}, status: :ok
            end    
        end

        # Excluir usuario
        def destroy
            begin
                usuario = Usuario.find(params[:id])
                usuario.destroy!
                render json: {status: 'success', message:'Usuario removido com sucesso.', data:usuario},status: :ok
                rescue Exception => e
                    render json: {status: 'fail', message: e},status: :ok
            end
            
        end

        # Atualizar um usuario
        def update
            begin
                if params[:data_nascimento] == nil
                    return render json: {status: 'fail', message: "Date invalid."},status: :ok
                end
                Date.parse(params[:data_nascimento]);
                
                usuario = Usuario.find(params[:id]);
                usuario_teste = Usuario.new(usuario_params);
                telefone = Telefone.new(telefone_params);
                endereco = Endereco.new(endereco_params);
                
                usuario_teste.telefone = telefone;
                usuario_teste.endereco = endereco;

                telefone.save! if telefone.invalid?
                endereco.save! if endereco.invalid?
                

                usuario.update_attributes!(usuario_params);
                usuario.telefone.update!(telefone_params);
                usuario.endereco.update_attributes!(endereco_params);

                render json: {status: 'success', message: "Usuario atualizado com sucesso.",
                                data: {usuario: usuario, telefone: usuario.telefone, endereco: usuario.endereco}}, status: :ok
            rescue Exception => e
                render json: {status: 'fail', message: e}, status: :ok
            end    
        end

        # Buscar usuario que contém o parametro :name como substring no nome
        def findByName
            usuarios = Usuario.select('id', 'nome', 'cpf', 'email', 'data_nascimento')
            .where('UPPER(nome) LIKE UPPER(:nome)',{:nome => '%' + params[:name] + '%'})
            .paginate(page: params[:page], per_page: 8);
            render json: {status: 'success', data: usuarios}, status: :ok
        end

        # Filtrando parametros
        private
        def usuario_params
            params.permit(:nome, :cpf, :email, :data_nascimento)
        end
        private
        def telefone_params
            params.require(:telefone).permit(:numero)
        end
        private
        def endereco_params
            params.require(:endereco).permit(:cep, :cidade, :estado)
        end
    end
end