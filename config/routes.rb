Rails.application.routes.draw do
  root to: 'application#index'
  namespace 'api' do
      resources :usuarios, only: [:index, :show, :create, :destroy, :update]
      get 'usuarios/search/findByName/:name' => 'usuarios#findByName'
  end
end
