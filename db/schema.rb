# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170301024838) do

  create_table "expense_contributions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "expense_id"
    t.decimal  "amount",     precision: 8, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_paid",                            default: false
  end

  add_index "expense_contributions", ["expense_id"], name: "index_expense_contributions_on_expense_id"
  add_index "expense_contributions", ["user_id"], name: "index_expense_contributions_on_user_id"

  create_table "expense_obligations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "expense_id"
    t.decimal  "amount",     precision: 8, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_average",                         default: true
    t.string   "name"
    t.boolean  "is_tip",                             default: false
  end

  add_index "expense_obligations", ["expense_id"], name: "index_expense_obligations_on_expense_id"
  add_index "expense_obligations", ["user_id"], name: "index_expense_obligations_on_user_id"

  create_table "expenses", force: :cascade do |t|
    t.integer  "purchaser_id"
    t.integer  "trip_id"
    t.string   "name"
    t.string   "expense_type"
    t.decimal  "cost",         precision: 8, scale: 2
    t.boolean  "is_loan",                              default: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "tip",          precision: 8, scale: 2, default: 0.0
    t.boolean  "tip_included",                         default: false
    t.string   "picture"
  end

  add_index "expenses", ["purchaser_id"], name: "index_expenses_on_purchaser_id"
  add_index "expenses", ["trip_id"], name: "index_expenses_on_trip_id"

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id"
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id"

  create_table "trip_memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "trip_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "trip_memberships", ["trip_id"], name: "index_trip_memberships_on_trip_id"
  add_index "trip_memberships", ["user_id"], name: "index_trip_memberships_on_user_id"

  create_table "trips", force: :cascade do |t|
    t.integer  "organizer_id"
    t.string   "name"
    t.text     "description"
    t.string   "facebook_event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "location"
    t.date     "starts_on"
    t.date     "ends_on"
    t.string   "cover_photo"
    t.string   "picture"
  end

  add_index "trips", ["organizer_id"], name: "index_trips_on_organizer_id"

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.datetime "last_logged_in_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "twitter_access_token"
    t.string   "twitter_access_secret"
    t.string   "twitter_id"
    t.string   "profile_image_url"
    t.string   "facebook_access_token"
    t.datetime "facebook_access_token_expires_at"
    t.string   "facebook_id"
    t.string   "encrypted_password",               default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                    default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider",                         default: "email", null: false
    t.string   "uid",                              default: "",      null: false
    t.text     "tokens"
    t.string   "picture"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
