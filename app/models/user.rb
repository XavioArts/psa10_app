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
  extend Devise::Models 
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
