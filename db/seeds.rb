# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Tag.all.delete_all
Tag.create([{ name: '3c' }, { name: '手機' }, { name: 'iphone' }, { name: 'samsung' }, { name: '運動' }, { name: '跑步機' }, { name: '喬山' }, { name: 'iphone11' }, { name: 'android' }])
