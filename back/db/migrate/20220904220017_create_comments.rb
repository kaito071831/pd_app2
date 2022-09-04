class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :name, null: false, default: "名無し"
      t.text :comment, null: false
      t.references :user, foreign_key: true, null: false
      t.references :board, foreign_key: true, null: false
      t.timestamps
    end
  end
end
