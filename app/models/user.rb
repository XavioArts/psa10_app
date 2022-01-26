# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :collections, dependent: :destroy
  has_many :cards, through: :collections
  has_many :offers, dependent: :destroy
  has_many :card_comments, dependent: :destroy
  has_many :collection_comments, dependent: :destroy
  has_many :topics, dependent: :destroy
  has_many :showcases, dependent: :destroy
  has_many :messages, through: :topics
  serialize :liked_collections, Array
  serialize :liked_cards, Array
  extend Devise::Models 
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User


  ### SQL call to search for users based on a search term
  # SELECT * from users 
  # WHERE users.last_name LIKE '%test2%'
  # OR users.email LIKE '%test2%' OR users.first_name LIKE '%test2%'
  # OR users.nickname LIKE '%test2%'

  def self.search(phrase)
    select('*')
    .where("UPPER(users.last_name) LIKE UPPER('%#{phrase}%')
    OR UPPER(users.email) LIKE UPPER('%#{phrase}%') OR UPPER(users.first_name) LIKE UPPER('%#{phrase}%')
    OR UPPER(users.nickname) LIKE UPPER('%#{phrase}%') ")
  end

  def card_search(phrase)
    self.cards.where("UPPER(cards.set) LIKE UPPER('%#{phrase}%')")
  end

end
