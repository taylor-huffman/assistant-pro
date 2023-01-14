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

ActiveRecord::Schema[7.0].define(version: 2023_01_14_194152) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.string "address"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assistant_tasks", force: :cascade do |t|
    t.integer "assistant_id"
    t.integer "task_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assistants", force: :cascade do |t|
    t.string "company_name"
    t.string "company_bio"
    t.date "company_start_date"
    t.integer "company_hourly_rate"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employers", force: :cascade do |t|
    t.string "company_name"
    t.string "company_bio"
    t.date "company_start_date"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.float "rating"
    t.integer "task_agreement_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "review_text"
  end

  create_table "task_agreements", force: :cascade do |t|
    t.integer "employer_id"
    t.integer "assistant_id"
    t.integer "hourly_rate"
    t.string "task_agreement_notes"
    t.boolean "is_completed"
    t.integer "task_post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_post_categories", force: :cascade do |t|
    t.integer "task_post_id"
    t.integer "task_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_posts", force: :cascade do |t|
    t.integer "employer_id"
    t.string "task_description"
    t.integer "hourly_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_active"
  end

end
