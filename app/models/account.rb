class Account < ApplicationRecord
    has_secure_password

    has_one_attached :image
    has_one :assistant, dependent: :destroy
    has_one :employer, dependent: :destroy
    # has_many :task_posts, through: :employer
    # has_many :task_agreements, through: :task_posts

    validates :name, :address, presence: true
    validates :phone, format: { with: /\d{3}-\d{3}-\d{4}/,
        message: 'must be in XXX-XXX-XXXX format' }
    validates :email, uniqueness: true, format: { with: /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,
        message: 'is not in a valid format' }
    # validates :image, presence: { message: 'must be uploaded' }
    # validates :image, attached: true
    # validate :image_present, on: :create

    # private
    
    # def image_present
    #     # @account.errors.add(:image, 'must be uploaded') unless params[:image] != "undefined"
    #     if image == "undefined"
    #         @account.errors.add(:image, 'must be uploaded')
    #     end
    # end
end
