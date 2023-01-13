class Review < ApplicationRecord
    belongs_to :assistant
    belongs_to :employer
    belongs_to :task_agreement
    has_one :task_post, through: :task_agreement
end
