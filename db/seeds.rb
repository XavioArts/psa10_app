User.destroy_all

u1 = User.create(email: "test@test.com", password: 123456)
u2 = User.create(email: "test2@test.com", password: 123456)
u3 = User.create(email: "test3@test.com", password: 123456)
u4 = User.create(email: "test4@test.com", password: 123456)

users = [u1, u2, u3, u4]

card_names = [
    "Charizard",
    "Pikachu",
    "Mew",
    "Lugia",
    "Jirachi"
]

collection_contents = [
    "I like this!",
    "Cool Stuff",
    "Where did you get these?"
]


collection1 = u1.collections.create(name: "collection1 1")
collection1.collection_comments.create(user_id: users.sample.id, content: collection_contents.sample)
3.times do
    card = collection1.cards.create(name: card_names.sample, user_id: u1.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
end
collection2 = u2.collections.create(name: "collection1 2")
collection2.collection_comments.create(user_id: users.sample.id, content: collection_contents.sample)
3.times do
    card = collection2.cards.create(name: card_names.sample, user_id: u2.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
end
collection3 = u3.collections.create(name: "collection1 3")
collection3.collection_comments.create(user_id: users.sample.id, content: collection_contents.sample)
3.times do
    card = collection3.cards.create(name: card_names.sample, user_id: u3.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
end
collection4 = u4.collections.create(name: "collection1 4")
collection4.collection_comments.create(user_id: users.sample.id, content: collection_contents.sample)
3.times do
    card = collection4.cards.create(name: card_names.sample, user_id: u4.id)
    comment = card.card_comments.create(user_id: users.sample.id, content: "radical")
end

## topics and messages

topics = ["Pokemon", "Baseball", "Basketball", "Magic the Gathering"]

3.times do
    topic = users.sample.topics.create(title: topics.sample + " Rares", body: "Show us your rarest cards!")
    topic.messages.create(user_id: users.sample.id, content: "I have this super rare card")
end

s1= u1.showcases.create(name: "Never Selling These", user_id: u1.id, description: "I just want the world to know they can't have these rare cards.")
s2 = u2.showcases.create(name: "Pokemon Cards", user_id: u2.id, description: "All Pokemon all the time.")
s3 = u3.showcases.create(name: "Really Expensive Cards", user_id: u3.id, description: "These are my best cards that I've been collecting since I was 10.")


p "seeded #{User.all.length} users"
p "seeded #{Collection.all.length} collections"
p "seeded #{Card.all.length} cards"
p "seeded #{CollectionComment.all.length} collection comments"
p "seeded #{CardComment.all.length} card comments"
p "seeded #{Offer.all.length} offers"
p "seeded #{Showcase.all.length} showcases"
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
p "showcase: #{Showcase.first}"