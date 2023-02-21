class Assistant < ApplicationRecord
    belongs_to :account
    has_many :task_agreements
    has_many :reviews, through: :task_agreements
    has_one :assistant_task
    has_one :task_category, through: :assistant_task

    def average_rating
        self.reviews.average(:rating)
    end
end
