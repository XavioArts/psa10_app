Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post "users/image", to: "users#profile_image"
    resources :collections do
      resources :collection_comments
    end
    post "cards/:id/upload", to: "cards#upload"
    resources :cards do
      resources :card_comments
    end
    resources :offers
    resources :topics do
      resources :messages
    end
  end
end
