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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130810213400) do

  create_table "expense_contributions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "expense_id"
    t.decimal  "amount",     :precision => 8, :scale => 2
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
  end

  add_index "expense_contributions", ["expense_id"], :name => "index_expense_contributions_on_expense_id"
  add_index "expense_contributions", ["user_id"], :name => "index_expense_contributions_on_user_id"

  create_table "expense_obligations", :force => true do |t|
    t.integer  "user_id"
    t.integer  "expense_id"
    t.decimal  "amount",     :precision => 8, :scale => 2
    t.datetime "created_at",                                                 :null => false
    t.datetime "updated_at",                                                 :null => false
    t.boolean  "is_average",                               :default => true
    t.string   "name"
    t.boolean  "is_tip",                                   :default => true
  end

  add_index "expense_obligations", ["expense_id"], :name => "index_expense_obligations_on_expense_id"
  add_index "expense_obligations", ["user_id"], :name => "index_expense_obligations_on_user_id"

  create_table "expenses", :force => true do |t|
    t.integer  "purchaser_id"
    t.integer  "trip_id"
    t.string   "name"
    t.string   "expense_type"
    t.decimal  "cost",         :precision => 8, :scale => 2
    t.datetime "created_at",                                                    :null => false
    t.datetime "updated_at",                                                    :null => false
    t.decimal  "tip",          :precision => 8, :scale => 2, :default => 0.0
    t.boolean  "tip_included",                               :default => false
  end

  add_index "expenses", ["purchaser_id"], :name => "index_expenses_on_purchaser_id"
  add_index "expenses", ["trip_id"], :name => "index_expenses_on_trip_id"

  create_table "friendships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "friendships", ["friend_id"], :name => "index_friendships_on_friend_id"
  add_index "friendships", ["user_id"], :name => "index_friendships_on_user_id"

  create_table "trip_memberships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "trip_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "trip_memberships", ["trip_id"], :name => "index_trip_memberships_on_trip_id"
  add_index "trip_memberships", ["user_id"], :name => "index_trip_memberships_on_user_id"

  create_table "trips", :force => true do |t|
    t.integer  "organizer_id"
    t.string   "name"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "location"
    t.date     "starts_on"
    t.date     "ends_on"
    t.string   "cover_photo"
  end

  add_index "trips", ["organizer_id"], :name => "index_trips_on_organizer_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.string   "password"
    t.string   "twitter_access_token"
    t.string   "twitter_access_secret"
    t.string   "twitter_id"
    t.string   "profile_image_url"
    t.string   "facebook_access_token"
    t.datetime "facebook_access_token_expires_at"
    t.string   "facebook_id"
  end

end
