# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# #   Character.create(name: "Luke", movie: movies.first)
# require 'faker'

# puts "Begin seeding"

# account1 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account2 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account3 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account4 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account5 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account6 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account7 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account8 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account9 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account10 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account11 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)
# account12 = Account.create!(name: Faker::Name.name, email: Faker::Internet.email, password_digest: Faker::Internet.password, address: Faker::Address.full_address, phone: Faker::PhoneNumber.phone_number)

# employer1 = Employer.create!(account_id: account1.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'))
# employer2 = Employer.create!(account_id: account4.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 6), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'))
# employer3 = Employer.create!(account_id: account7.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 10), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'))
# employer4 = Employer.create!(account_id: account9.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 4), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'))
# employer5 = Employer.create!(account_id: account12.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 12), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'))

# assistant1 = Assistant.create!(account_id: account1.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant2 = Assistant.create!(account_id: account2.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant3 = Assistant.create!(account_id: account3.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant4 = Assistant.create!(account_id: account5.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant5 = Assistant.create!(account_id: account6.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant6 = Assistant.create!(account_id: account7.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant7 = Assistant.create!(account_id: account9.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))
# assistant8 = Assistant.create!(account_id: account10.id, company_name: Faker::Company.name, company_bio: Faker::Lorem.paragraph(sentence_count: 8), company_start_date: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'), company_hourly_rate: rand(10..150))

# task_category1 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category2 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category3 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category4 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category5 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category6 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category7 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category8 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category9 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category10 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category11 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category12 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category13 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category14 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category15 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category16 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category17 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category18 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category19 = TaskCategory.create!(name: Faker::Job.unique.field)
# task_category20 = TaskCategory.create!(name: Faker::Job.unique.field)

# task_post1 = TaskPost.create!(employer_id: employer1.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: false)
# task_post2 = TaskPost.create!(employer_id: employer1.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: false)
# task_post3 = TaskPost.create!(employer_id: employer1.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: true)
# task_post4 = TaskPost.create!(employer_id: employer2.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: false)
# task_post5 = TaskPost.create!(employer_id: employer3.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: false)
# task_post6 = TaskPost.create!(employer_id: employer5.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: true)
# task_post7 = TaskPost.create!(employer_id: employer5.id, task_description: Faker::Lorem.paragraph(sentence_count: 8), hourly_rate: rand(10..150), is_active: true)

# task_post_category1 = TaskPostCategory.create!(task_post_id: task_post1.id, task_category_id: task_category1.id)
# task_post_category2 = TaskPostCategory.create!(task_post_id: task_post2.id, task_category_id: task_category11.id)
# task_post_category3 = TaskPostCategory.create!(task_post_id: task_post3.id, task_category_id: task_category20.id)
# task_post_category4= TaskPostCategory.create!(task_post_id: task_post4.id, task_category_id: task_category20.id)
# task_post_category5 = TaskPostCategory.create!(task_post_id: task_post5.id, task_category_id: task_category8.id)
# task_post_category6 = TaskPostCategory.create!(task_post_id: task_post6.id, task_category_id: task_category17.id)
# task_post_category7 = TaskPostCategory.create!(task_post_id: task_post7.id, task_category_id: task_category19.id)

# task_agreement1 = TaskAgreement.create!(assistant_id: assistant1.id, employer_id: employer5.id, hourly_rate: rand(10..150), task_agreement_notes: Faker::Lorem.paragraph(sentence_count: 8), is_completed: true, task_post_id: task_post1.id)
# task_agreement2 = TaskAgreement.create!(assistant_id: assistant1.id, employer_id: employer4.id, hourly_rate: rand(10..150), task_agreement_notes: Faker::Lorem.paragraph(sentence_count: 8), is_completed: false, task_post_id: task_post2.id)
# task_agreement3 = TaskAgreement.create!(assistant_id: assistant2.id, employer_id: employer2.id, hourly_rate: rand(10..150), task_agreement_notes: Faker::Lorem.paragraph(sentence_count: 8), is_completed: true, task_post_id: task_post4.id)
# task_agreement4 = TaskAgreement.create!(assistant_id: assistant4.id, employer_id: employer1.id, hourly_rate: rand(10..150), task_agreement_notes: Faker::Lorem.paragraph(sentence_count: 8), is_completed: true, task_post_id: task_post5.id)

# assistant_task1 = AssistantTask.create!(assistant_id: assistant1.id, task_category_id: task_category10.id)
# assistant_task2 = AssistantTask.create!(assistant_id: assistant2.id, task_category_id: task_category18.id)
# assistant_task3 = AssistantTask.create!(assistant_id: assistant3.id, task_category_id: task_category15.id)
# assistant_task4 = AssistantTask.create!(assistant_id: assistant4.id, task_category_id: task_category2.id)
# assistant_task5 = AssistantTask.create!(assistant_id: assistant5.id, task_category_id: task_category8.id)
# assistant_task6 = AssistantTask.create!(assistant_id: assistant6.id, task_category_id: task_category11.id)
# assistant_task7 = AssistantTask.create!(assistant_id: assistant7.id, task_category_id: task_category14.id)
# assistant_task8 = AssistantTask.create!(assistant_id: assistant8.id, task_category_id: task_category1.id)

# review1 = Review.create!(assistant_id: assistant1.id, employer_id: employer5.id, review_text: Faker::Lorem.paragraph(sentence_count: 8), rating: 4.0, task_agreement_id: task_agreement1.id)
# review2 = Review.create!(assistant_id: assistant2.id, employer_id: employer2.id, review_text: Faker::Lorem.paragraph(sentence_count: 8), rating: 4.3, task_agreement_id: task_agreement3.id)
# review3 = Review.create!(assistant_id: assistant4.id, employer_id: employer1.id, review_text: Faker::Lorem.paragraph(sentence_count: 8), rating: 3.9, task_agreement_id: task_agreement4.id)

# puts "Done seeding"