class TaskAgreementSerializer < ActiveModel::Serializer
  attributes :id, :hourly_rate, :task_agreement_notes, :is_completed, :task_post, :assistant, :review, :created_at, :updated_at

  belongs_to :assistant
  belongs_to :employer
  belongs_to :task_post
  has_one :review
end
