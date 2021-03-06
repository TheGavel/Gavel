# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      raise NotImplementedError, "You must define #resolve in #{self.class}"
    end

    private
    attr_reader :user, :scope
  end

  def buyer_without_email_authenticate
    user && (user.activation_state == "pending" || user.activation_state == nil) && !(user.role == 'seller')
  end

  def buyer
    user && user.activation_state == "active" && !(user.role == 'seller')
  end

  def seller
    user && user.role == 'seller'
  end

  def admin
    user && user.role == 'admin'
  end

end
