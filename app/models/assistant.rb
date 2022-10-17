class Assistant < ApplicationRecord
    belongs_to :account
    has_many :task_agreements
    has_many :reviews, through: :task_agreements
    has_many :assistant_tasks
    has_many :task_categories, through: :assistant_tasks
end
