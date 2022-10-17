class Account < ApplicationRecord
    has_one :assistant
    has_one :employer
    # has_many :task_posts, through: :employer
    # has_many :task_agreements, through: :task_posts
end
