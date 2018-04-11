require 'bundler'
Bundler.require
require 'require_all'
# require 'sinatra/activerecord'


# ActiveRecord::Base.establish_connection(
#   :adapter => "sqlite3",
#   :database => "db/development.sqlite"
# )

require_all 'app'
