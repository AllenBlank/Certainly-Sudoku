class StaticPagesController < ApplicationController
  def home
    @game = Game.first
  end

  def about
  end
end
