require 'bcrypt'
require 'pry'

class User < Sequel::Model
  def to_api
    {
      id: @values[:id],
      name: @values[:name]
    }
  end
end
