# This will guess the User class
FactoryGirl.define do
  factory :user do
    name "Ryan Norman"
    email  "rsnorman15@gmail.com"
    # facebook_access_token "CAAFKoEw0PJABAHkXnS2ug68rYpg8l2VjdZAt9IIhKvPhZCnkR9"
    # facebook_access_token_expires_at Time.now
    # facebook_id "234234"
    # twitter_access_token "16950200-zfRfnbhjJRnJNFQ7NYJO8M015aaucrCGqJ81zOg"
    # twitter_access_secret "1KfojHF14c28GTirds8yZnZrT18Ib1hDZ5WSP2p4"
    # twitter_id "16950200"
  end

  factory :trip do
  	name 'Mt BROhemia'
  	association :organizer, :factory => :user
  end

  factory :trip_membership do
  	association :user, :factory => :user
  	association :trip, :factory => :trip
  end

  factory :expense do
  	association :trip, :factory => :trip
  	association :purchaser, :factory => :user
  	sequence(:name) {|n| ['BP Gas Station', 'Applebees', 'Paddy\' Pub', 'Walmart'][n % 4] }
  	sequence(:expense_type) {|n| ['Gas', 'Food', 'Alcohol', 'Misc'][n % 4] }
  	sequence(:cost) {|n| [50.00, 25.00, 10.00, 100][n % 4] }
  end

  factory :contribution, :class => ExpenseContribution do
    association :user, :factory => :user
    association :expense, :factory => :expense
    amount 10
  end

  factory :obligation, :class => ExpenseObligation do
    association :user, :factory => :user
    association :expense, :factory => :expense
    name "Expense Portion"
    is_average true
    is_tip false
    amount 10
  end

  factory :friendship do
    association :user, :factory => :user
    association :friend, :factory => :user
  end
end