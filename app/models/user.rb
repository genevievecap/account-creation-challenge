require 'zxcvbn'
class User < ApplicationRecord
  validates :username, presence: true
  validates :password, presence: true

  def self.validate_username(username)
    return 'NO_USERNAME_GIVEN' if username.nil? || username.strip.empty?
    return 'USERNAME_NOT_VALID' unless username.length >= 10 && username.length <= 50
    true
  end

  def self.validate_password(password)
    return 'NO_PASSWORD_GIVEN' if password.nil? || password.strip.empty?
    return 'PASSWORD_NOT_VALID' unless password.length >= 20 && password.length <= 50
    return 'PASSWORD_LETTER_NUMBER_MISSING' unless password.match?(/[a-zA-Z]/)
    return 'PASSWORD_LETTER_NUMBER_MISSING' unless password.match?(/[0-9]/)

    zxcvbn = Zxcvbn.test(password)
    return 'PASSWORD_WEAK' if zxcvbn.score < 2

    true
  end
end
