class Payment
  def initialize(attributes)
    attributes.each_pair do |key, value|
      instance_variable_set("@#{key}", value)
      self.class.send(:define_method, key) { instance_variable_get("@#{key}") }
    end
  end
end
