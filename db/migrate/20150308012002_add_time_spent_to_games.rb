class AddTimeSpentToGames < ActiveRecord::Migration
  def change
    add_column :games, :time_spent, :integer
  end
end
