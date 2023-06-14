class TaskAgreement < ApplicationRecord
    belongs_to :assistant
    belongs_to :employer
    belongs_to :task_post
    has_one :task_category, through: :task_post
    has_one :review, dependent: :destroy

    validates :hourly_rate, :task_agreement_notes, presence: true
end
