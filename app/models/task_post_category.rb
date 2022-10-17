class TaskPostCategory < ApplicationRecord
    belongs_to :task_post
    belongs_to :task_category
end
