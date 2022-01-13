Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post "users/image", to: "users#profile_image"
    get "users/:id", to: "users#info"
    resources :collections do
      resources :collection_comments
    end
    resources :cards do
      resources :card_comments
    end
    resources :offers
    resources :topics do
      resources :messages
    end
  end
end
