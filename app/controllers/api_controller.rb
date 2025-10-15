# frozen_string_literal: true

class ApiController < ApplicationController
	protect_from_forgery with: :null_session

	def validate_account
		username = params[:username]
		password = params[:password]

		username_result = User.validate_username(username)
		password_result = User.validate_password(password)

		#  This is created the user on the table
		user = User.create(username: username, password: password)

		if user
			session[:user_id] = user.id
			render json: {
				logged_in: true,
				status: :created,
				user: user,
			}
			# redirect_to signup_account_selection_path
		else 
			render json: {
				username: username_result,
				password: password_result
			}
		end
	end

	def get_account
		if session[:user_id]
			user = User.find(session[:user_id])
			render json: {
				logged_in: true,
				user: user
			}
		else
			render json: {
				logged_in: false,
				message: 'No user logged in'
			}
		end
	end
end
