class TaskCategory < ApplicationRecord
    has_one :task_post_category
    has_one :task_agreement
    has_one :assistant_task
end
