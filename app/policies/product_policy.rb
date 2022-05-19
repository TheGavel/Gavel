# frozen_string_literal: true

class ProductPolicy < ApplicationPolicy
  def index?
    visitor
  end

  def show?
    seller || admin
  end

  def new?
    seller || admin
  end

  def create?
    seller || admin
  end

  def edit?
    seller || admin
  end

  def update?
    seller || admin
  end

  def destroy?
    seller || admin
  end

  def own?
    seller || admin
  end

  def search?
    visitor
  end


  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
