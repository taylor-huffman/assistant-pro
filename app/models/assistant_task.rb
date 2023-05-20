class AssistantTask < ApplicationRecord
    belongs_to :assistant
    belongs_to :task_category

    validates :task_category_id, presence: true
end
