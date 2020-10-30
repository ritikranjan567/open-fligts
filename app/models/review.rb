class Review < ApplicationRecord
  belongs_to :airline

  validates :title, :description, :score, presence: true 
  
end
