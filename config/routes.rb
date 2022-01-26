Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, only: [:index, :show]
    post "users/image", to: "users#profile_image"
    post "users/cover_image", to: "users#cover_image"
    get "users/:id", to: "users#info"
    get "users/:id/card_stats", to: "users#card_stats"
    get "users/:id/collection_stats", to: "users#collection_stats"
    get "users/search/:search", to: "users#search"
    get "users/:id/collections", to: "collections#user_collections"
    resources :showcases 
    get "showcases/user/:id", to: "showcases#showcases"
    put "showcases/:showcase_id/card/:id", to: "showcases#card"
    get "cards/all_cards", to: "cards#all_cards"
    put "users/liked_collections", to: "users#update_collection_likes"
    # put "showcases/:showcase_id/card/:id", to: "showcases#rmcard"
    resources :collections do
      resources :collection_comments
    end
    post "cards/:id/upload", to: "cards#upload"
    get "cards/:id/search/:search", to: "cards#card_search"
    resources :cards do
      resources :card_comments
    end
    resources :offers
    resources :topics do
      resources :messages
    end
    get "/allTopics", to:'topics#allTopics'
    get "topics/search/:search", to: "topics#search"
  end
end
