class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_text, :rating, :task_agreement, :task_post

  belongs_to :assistant
  belongs_to :employer
  belongs_to :task_agreement
  has_one :task_post, through: :task_agreement
end
