class UsersController < ApplicationController
  before_action :set_user, :correct_user_or_admin, only: [:destroy, :show]
  before_action :check_is_admin, only: [:index]
  
  def index
    @users = User.paginate(page: params[:page], per_page: 5)
  end
  
  def destroy
    flash[:success] = "User #{@user.name} (#{@user.id}) deleted"
    @user.destroy
    redirect_to users_url
  end
  
  def show
    @games = @user.games.paginate(page: params[:page], per_page: 5)
  end
  
  private
  
    def set_user
      @user = User.find(params[:id])
    end
    
    def is_correct_user?
       @user == current_user
    end
    
    def correct_user_or_admin
      bounce_chumps "You need to be the correct user or admin to do that." unless is_correct_user? || is_admin?
    end
end