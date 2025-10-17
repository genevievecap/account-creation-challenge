# frozen_string_literal: true

class ApiController < ApplicationController
	protect_from_forgery with: :null_session

	def validate_account
		username = params[:username]
		password = params[:password]

		username_result = User.validate_username(username)
		password_result = User.validate_password(password)

		if user
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
end
