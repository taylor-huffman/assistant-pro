class TaskPostSerializer < ActiveModel::Serializer
  attributes :id, :task_description, :hourly_rate, :is_active

  belongs_to :employer
  has_one :task_agreement
  has_many :task_categories
end
