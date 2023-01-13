class TaskAgreement < ApplicationRecord
    belongs_to :assistant
    belongs_to :employer
    belongs_to :task_post
    has_one :review
end
