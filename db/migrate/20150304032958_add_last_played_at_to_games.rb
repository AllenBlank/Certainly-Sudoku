class AddLastPlayedAtToGames < ActiveRecord::Migration
  def change
    add_column :games, :last_played_at, :datetime
    add_index :games, :last_played_at
  end
end
