# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_17_215125) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_comments", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "card_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id"], name: "index_card_comments_on_card_id"
    t.index ["user_id"], name: "index_card_comments_on_user_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.string "condition"
    t.boolean "available"
    t.string "front_image"
    t.string "back_image"
    t.integer "likes"
    t.string "category"
    t.boolean "graded"
    t.float "grade"
    t.string "set"
    t.integer "year"
    t.string "card_number"
    t.boolean "showcase"
    t.bigint "user_id", null: false
    t.bigint "collection_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["collection_id"], name: "index_cards_on_collection_id"
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "collection_comments", force: :cascade do |t|
    t.text "content"
    t.bigint "collection_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["collection_id"], name: "index_collection_comments_on_collection_id"
    t.index ["user_id"], name: "index_collection_comments_on_user_id"
  end

  create_table "collections", force: :cascade do |t|
    t.string "category"
    t.string "name"
    t.text "description"
    t.integer "likes"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "topic_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["topic_id"], name: "index_messages_on_topic_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.float "sale_offer"
    t.integer "trade_offer"
    t.boolean "seen"
    t.boolean "accepted"
    t.boolean "counter_offer"
    t.bigint "user_id", null: false
    t.bigint "card_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id"], name: "index_offers_on_card_id"
    t.index ["user_id"], name: "index_offers_on_user_id"
  end

  create_table "showcases", force: :cascade do |t|
    t.string "name", default: ""
    t.text "description", default: ""
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "cards"
    t.index ["user_id"], name: "index_showcases_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_topics_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sign_in_count", default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "first_name"
    t.string "last_name"
    t.text "about"
    t.string "liked_collections"
    t.string "liked_cards"
    t.integer "primary_showcase"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "card_comments", "cards"
  add_foreign_key "card_comments", "users"
  add_foreign_key "cards", "collections"
  add_foreign_key "cards", "users"
  add_foreign_key "collection_comments", "collections"
  add_foreign_key "collection_comments", "users"
  add_foreign_key "collections", "users"
  add_foreign_key "messages", "topics"
  add_foreign_key "messages", "users"
  add_foreign_key "offers", "cards"
  add_foreign_key "offers", "users"
  add_foreign_key "showcases", "users"
  add_foreign_key "topics", "users"
end
