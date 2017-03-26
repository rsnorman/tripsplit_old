json.(user, :id, :picture, :email)
json.name user.name || user.email
