class TaskPost < ApplicationRecord
    belongs_to :employer
    has_one :task_agreement
    has_many :task_post_categories
    has_many :task_categories, through: :task_post_categories
end
