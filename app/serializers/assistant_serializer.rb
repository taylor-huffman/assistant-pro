class AssistantSerializer < ActiveModel::Serializer
  attributes :id, :company_name, :company_bio, :company_start_date, :company_hourly_rate, :task_category, :average_rating

  # has_many :task_agreements
  # has_many :reviews, through: :task_agreements
  # has_many :task_categories, through: :assistant_tasks
  # belongs_to :account
  has_many :task_agreements
  has_many :reviews, through: :task_agreements
  has_one :assistant_task
  has_one :task_category, through: :assistant_task
end
