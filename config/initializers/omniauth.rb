Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, "i6KISWAobHGDP045DPp9g", "a3oBpKsAo3nVRFdxFW5YdtHybzj5sUXZHcRWtfqQU0"

  provider :facebook, "363527310425232", "234ed345894d48b91430e29f66e793fc", {:scope => "publish_stream"}
end
