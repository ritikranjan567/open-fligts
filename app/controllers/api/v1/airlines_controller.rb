class Api::V1::AirlinesController < ApplicationController

  def index
    airlines = Airline.all
    
    render json: AirlineSerializer.new(airlines, options).to_json
  end

  def show
    airline = Airline.find_by(id: params[:id])
    render json: AirlineSerializer.new(airline, options).to_json
  end

  def create
    airline = Airline.new(airline_params)

    if airline.save
      render json: AirlineSerializer.new(airline).to_json
    else
      render json: {error: airline.errors.messages }, status: 422
    end
  end

  def update
    airline = Airline.find_by(id: params[:id])

    if airline.update(airline_params)
      render json: AirlineSerializer.new(airline, options).to_json
    else
      render json: {error: airline.errors.messages }, status: 422
    end
  end

  def destroy
    airline = Airline.find_by(id: params[:id])

    if airline.destroy
      head :no_content
    else
      render json: {error: airline.errors.messages }, status: 422
    end
  end
  private

  def airline_params
    print params.inspect
    params.require(:airline).permit(:name, :image_url)
  end

  def options
    @options ||= { include: %i[reviews] }
  end

end