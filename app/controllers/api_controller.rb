# frozen_string_literal: true

class ApiController < ApplicationController
	protect_from_forgery with: :null_session

	def validate_account
		username = params[:username]
		password = params[:password]

		username_result = User.validate_username(username)
		password_result = User.validate_password(password)

		render json: {
			username: username_result,
			password: password_result
		}
	end
end
