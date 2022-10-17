class TaskPostCategorySerializer < ActiveModel::Serializer
  attributes :id, :task_post_id, :task_category_id

  belongs_to :task_post
  belongs_to :task_category
end
