# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

if Rails.env.development?
  user = User.new(email: "test@planet.kanazawa-it.ac.jp", password: "password")
  user.skip_confirmation!
  user.save!
  subUser = User.new(email: "c1195107@planet.kanazawa-it.ac.jp", password: "password")
  subUser.skip_confirmation!
  subUser.save!
end
