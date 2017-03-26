json.(@trip, :id, :name, :location, :picture, :description, :total_cost, :average_cost_per_member, :total_members)

json.organizer do
  json.name @trip.organizer.name || @trip.organizer.email
  json.picture @trip.organizer.picture
end

json.href api_link(trip_path(@trip))
json.update api_link(trip_path(@trip)) if can?(:update, @trip)
json.delete api_link(trip_path(@trip)) if can?(:destroy, @trip)
