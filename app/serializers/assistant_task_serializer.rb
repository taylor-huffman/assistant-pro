class AssistantTaskSerializer < ActiveModel::Serializer
  attributes :id, :assistant_id, :task_category_id

  belongs_to :assistant
  belongs_to :task_category
end
