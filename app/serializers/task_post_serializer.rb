class TaskPostSerializer < ActiveModel::Serializer
  attributes :id, :task_description, :hourly_rate, :is_active

  belongs_to :employer
  has_one :task_agreement
  has_one :task_post_category
  has_one :task_category
end
