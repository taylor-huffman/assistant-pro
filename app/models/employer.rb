class Employer < ApplicationRecord
    belongs_to :account
    has_many :task_posts, dependent: :destroy
    has_many :task_agreements, through: :task_posts
    has_many :assistants, -> { distinct }, through: :task_agreements
    has_many :reviews, through: :task_agreements

    # def assistant_list
    #     self.assistants.uniq
    # end
end
