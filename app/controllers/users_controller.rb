class UsersController < ApplicationController
  before_action :check_logged_in, :check_is_admin
  def index
    @users = User.paginate(page: params[:page], per_page: 5)
  end
  
  def destroy
    @user = User.find(params[:id])
    flash[:success] = "User #{@user.name} (#{@user.id}) deleted"
    @user.destroy
    redirect_to users_url
  end
  
  def show
    @user = User.find(params[:id])
    @games = @user.games
  end
end