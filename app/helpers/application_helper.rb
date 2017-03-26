module ApplicationHelper
  include Twitter::Autolink

  def api_link(path)
    "#{request.base_url}#{path}"
  end
end
