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

ActiveRecord::Schema.define(version: 2022_04_20_031424) do

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "picture"
    t.text "description"
    t.string "status"
    t.string "upload_time"
    t.integer "direct_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "records", force: :cascade do |t|
    t.integer "buyer_id", null: false
    t.integer "bid"
    t.integer "product_id", null: false
    t.integer "room_id", null: false
    t.string "time"
    t.string "seller_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["buyer_id"], name: "index_records_on_buyer_id"
    t.index ["product_id"], name: "index_records_on_product_id"
    t.index ["room_id"], name: "index_records_on_room_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "countdown"
    t.string "start_time"
    t.string "status"
    t.string "level"
    t.integer "maxpeople"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "nickname"
    t.string "password"
    t.string "phone"
    t.string "address"
    t.boolean "is_seller"
    t.integer "level"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "records", "buyers"
  add_foreign_key "records", "products"
  add_foreign_key "records", "rooms"
end
