class TaskPost < ApplicationRecord
    belongs_to :employer
    has_one :task_agreement, dependent: :destroy
    has_one :task_post_category, dependent: :destroy
    has_one :task_category, through: :task_post_category

    validates :task_description, :hourly_rate, presence: true
end
