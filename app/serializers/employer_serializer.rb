class EmployerSerializer < ActiveModel::Serializer
  attributes :id, :company_name, :company_bio, :company_start_date, :reviews, :task_posts, :task_agreements, :assistants, :account
  
  belongs_to :account
  has_many :task_posts
  has_many :task_agreements, through: :task_posts
  has_many :assistants, through: :task_agreements
  has_many :reviews, through: :task_agreements
end
