# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def new?
    create?
  end

  def create?
    seller
  end

  def edit?
    update?
  end

  def update?
    seller || admin
  end

  def destroy?
    update?
  end

  def own?
    seller
  end

  def autocomplete
    true
  end

  def sellitem?
    seller
  end

  def buyerlist?
    true
  end

  def buy?
    seller || admin
  end

  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
