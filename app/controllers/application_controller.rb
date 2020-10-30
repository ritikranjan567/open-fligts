class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    render json: {error: ["The resource you are looking for is not found"]}, status: 404
  end
end
