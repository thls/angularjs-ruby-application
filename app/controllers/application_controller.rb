class ApplicationController < ActionController::Base
  protect_from_forgery only: []
  def index
    render 'layouts/application'
  end
end
