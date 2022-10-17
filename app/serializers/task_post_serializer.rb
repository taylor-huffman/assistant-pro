class TaskPostSerializer < ActiveModel::Serializer
  attributes :id, :task_description, :hourly_rate

  belongs_to :employer
  has_one :task_agreement
  has_many :task_categories
end
