class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.datetime :started_at
      t.datetime :completed_at
      t.datetime :total_time
      t.text :board_state
      
      t.belongs_to :user, index: true
      t.belongs_to :puzzle, index: true
      t.timestamps null: false
      
    end
  end
end


