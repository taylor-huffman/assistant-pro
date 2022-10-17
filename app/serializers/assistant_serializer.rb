class AssistantSerializer < ActiveModel::Serializer
  attributes :id, :company_name, :company_bio, :company_start_date, :company_hourly_rate

  # has_many :task_agreements
  # has_many :reviews, through: :task_agreements
  # has_many :task_categories, through: :assistant_tasks
  # belongs_to :account
  has_many :task_agreements
  has_many :reviews, through: :task_agreements
  # has_many :assistant_tasks
  has_many :task_categories, through: :assistant_tasks
end
