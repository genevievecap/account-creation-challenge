class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
      session[:session_id] = user.id
      redirect_to user_path(user)
  end

  def destroy
    reset_session
    redirect_to root_path, notice: "You have been logged out."
  end
end