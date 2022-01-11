# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

u1 = User.create(email: "test@test.com", password: 123456)
u2 = User.create(email: "test2@test.com", password: 123456)
u3 = User.create(email: "test3@test.com", password: 123456)
u4 = User.create(email: "test4@test.com", password: 123456)

users = [u1, u2, u3, u4]

collection1 = u1.collections.create(name: "collection1")
collection1.collection_comments.create(user_id: users.sample.id, content: "i like this")
3.times do
    card = collection1.cards.create(name: "charizard", user_id: u1.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
    offer = card.offers.create(user_id: users.sample.id, sale_offer: 100.00)
end
collection2 = u2.collections.create(name: "collection1")
collection2.collection_comments.create(user_id: users.sample.id, content: "i like this")
3.times do
    card = collection2.cards.create(name: "charizard", user_id: u2.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
    offer = card.offers.create(user_id: users.sample.id, sale_offer: 100.00)
end
collection3 = u3.collections.create(name: "collection1")
collection3.collection_comments.create(user_id: users.sample.id, content: "i like this")
3.times do
    card = collection3.cards.create(name: "charizard", user_id: u3.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
    offer = card.offers.create(user_id: users.sample.id, sale_offer: 100.00)
end
collection4 = u4.collections.create(name: "collection1")
collection4.collection_comments.create(user_id: users.sample.id, content: "i like this")
3.times do
    card = collection4.cards.create(name: "charizard", user_id: u4.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
    offer = card.offers.create(user_id: users.sample.id, sale_offer: 100.00)
end

p "seeded #{User.all.length} users"
p "seeded #{Collection.all.length} collections"
p "seeded #{Card.all.length} cards"
p "seeded #{CollectionComment.all.length} collection comments"
p "seeded #{CardComment.all.length} card comments"
p "seeded #{Offer.all.length} offers"
p "-----------------------"

p "samples:"
p "collection: #{Collection.first}"
p "card: #{Card.first}"
p "collection_comment: #{CollectionComment.first}"
p "card_comment: #{CardComment.first}"
p "offer: #{Offer.first}"