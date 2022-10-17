class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review, :rating, :task_agreement

  belongs_to :assistant
  belongs_to :task_agreement
end
