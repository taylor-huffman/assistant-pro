class AssistantTask < ApplicationRecord
    belongs_to :assistant
    belongs_to :task_category
end
