class TaskAgreementSerializer < ActiveModel::Serializer
  attributes :id, :hourly_rate, :task_agreement_notes, :is_completed, :assistant, :review, :task_category, :employer, :task_post, :created_at, :updated_at

  belongs_to :assistant
  belongs_to :employer
  belongs_to :task_post
  has_one :task_category, through: :task_post
  has_one :review
end
