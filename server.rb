require 'sinatra/base'
require 'sinatra/json'

class Server < Sinatra::Base
  pid = Process.spawn('./node_modules/.bin/webpack-dev-server')
  Process.detach(pid)
  puts "webpack dev server pid: #{pid}"

  file = File.read('commands.json')

  get '/commands' do
    puts 'commands'
    JSON file
  end
end
