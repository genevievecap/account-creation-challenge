require "test_helper"

class UserTest < ActiveSupport::TestCase
  def with_stubbed_zxcvbn(score)
    original = Zxcvbn.method(:test)
    Zxcvbn.define_singleton_method(:test) { |_| OpenStruct.new(score: score) }
    yield
  ensure
    Zxcvbn.define_singleton_method(:test, original)
  end

  test "should not save user without username" do
    user = User.new(password: '123')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: '123')
    assert_not user.save
  end

  test "should save user" do
    user = User.new(username: '123', password: '123')
    assert user.save
  end

  test "validate_username returns NO_USERNAME_GIVEN for nil or blank" do
    assert_equal 'NO_USERNAME_GIVEN', User.validate_username(nil)
    assert_equal 'NO_USERNAME_GIVEN', User.validate_username('   ')
  end

  test "validate_username returns USERNAME_NOT_VALID for < 10 or > 50 chars" do
    assert_equal 'USERNAME_NOT_VALID', User.validate_username('short')
    assert_equal 'USERNAME_NOT_VALID', User.validate_username('a' * 51)
  end

  test "validate_username returns true for valid length" do
    assert_equal true, User.validate_username('a' * 10)
    assert_equal true, User.validate_username('a' * 50)
  end

  test "validate_password returns NO_PASSWORD_GIVEN for nil or blank" do
    assert_equal 'NO_PASSWORD_GIVEN', User.validate_password(nil)
    assert_equal 'NO_PASSWORD_GIVEN', User.validate_password('   ')
  end

  test "validate_password returns PASSWORD_NOT_VALID for < 20 or > 50 chars" do
    valid = 'w3althfrontCodingChallenge3'
    assert_equal 'PASSWORD_NOT_VALID', User.validate_password('aA1' * 6) # 18 chars
    assert_equal 'PASSWORD_NOT_VALID', User.validate_password('aA1' * 200) # 600 chars
    assert_equal true, User.validate_password(valid)
  end

  test "validate_password returns PASSWORD_LETTER_NUMBER_MISSING for missing letter or number" do
    pw_num = '1' * 21
    pw_letter = 'a' * 21
    assert_equal 'PASSWORD_LETTER_NUMBER_MISSING', User.validate_password(pw_num)
    assert_equal 'PASSWORD_LETTER_NUMBER_MISSING', User.validate_password(pw_letter)
  end

  test "validate_password returns PASSWORD_WEAK for weak password" do
    weak_pw = 'a1' * 11 # 22 chars, but weak
    with_stubbed_zxcvbn(1) do
      assert_equal 'PASSWORD_WEAK', User.validate_password(weak_pw)
    end
  end

  test "validate_password returns true for strong, valid password" do
    strong_pw = 'aA1' * 7 # 21 chars
    with_stubbed_zxcvbn(3) do
      assert_equal true, User.validate_password(strong_pw)
    end
  end
end
