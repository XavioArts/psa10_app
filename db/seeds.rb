# 5.times do
#   u = User.create(
#     # first_name: Faker::Name.first_name,
#     # last_name: Faker::Name.last_name,
#     password: 123456,
#     email: Faker::Internet.email,
#     # username: Faker::Internet.username
#   )

#   1.times do
#     c = Collection.create(
#       name: "Pokemon",
#       user_id: u.id)
#       5.times do
#         price = rand(0..300);
#         ca = Card.create(
#           name: Faker::Games::Pokemon.name,
#           price: rand(1..300).to_f,
#           user_id: u.id,
#           collection_id: c.id)
#           2.times do
#             CardComment.create(
#               user_id: u.id,
#               card_id: ca.id
#           )
#           end
        
#       end
#   end

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

## topics and messages

topics = ["Pokemon", "Baseball", "Basketball", "Magic the Gathering"]

3.times do
    topic = users.sample.topics.create(title: topics.sample + " Rares", body: "Show us your rarest cards!")
    topic.messages.create(user_id: users.sample.id, content: "I have this super rare card")
end

p "seeded #{User.all.length} users"
p "seeded #{Collection.all.length} collections"
p "seeded #{Card.all.length} cards"
p "seeded #{CollectionComment.all.length} collection comments"
p "seeded #{CardComment.all.length} card comments"
p "seeded #{Offer.all.length} offers"
p "-----------------------"
p "seeded #{Topic.all.length} topics"
p "seeded #{Message.all.length} messages"
p "-----------------------"

p "samples:"
p "collection: #{Collection.first}"
p "card: #{Card.first}"
p "collection_comment: #{CollectionComment.first}"
p "card_comment: #{CardComment.first}"
p "offer: #{Offer.first}"