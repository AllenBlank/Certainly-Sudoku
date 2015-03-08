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

ActiveRecord::Schema.define(version: 20150308012002) do

  create_table "games", force: true do |t|
    t.datetime "started_at"
    t.datetime "completed_at"
    t.datetime "total_time"
    t.text     "board_state"
    t.integer  "user_id"
    t.integer  "puzzle_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.datetime "last_played_at"
    t.integer  "time_spent"
  end

  add_index "games", ["last_played_at"], name: "index_games_on_last_played_at"
  add_index "games", ["puzzle_id"], name: "index_games_on_puzzle_id"
  add_index "games", ["user_id"], name: "index_games_on_user_id"

  create_table "puzzles", force: true do |t|
    t.string   "board"
    t.string   "difficulty"
    t.integer  "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "solution"
  end

  add_index "puzzles", ["board"], name: "index_puzzles_on_board", unique: true

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.boolean  "admin"
  end

end
