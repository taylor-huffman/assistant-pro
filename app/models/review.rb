class Review < ApplicationRecord
    belongs_to :assistant
    belongs_to :task_agreement
end
