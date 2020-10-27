class ReviewSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :score, :airline_id
  belongs_to :airline
end
