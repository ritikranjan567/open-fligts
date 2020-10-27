class Airline < ApplicationRecord
  has_many :reviews, dependent: :destroy

  before_create :slugify

  def slugify
    self.slug = self.name.parameterize
  end

  def avg_score
    return 0 unless self.reviews.any?
    self.reviews.average(:score).round(2).to_f 
  end
end
