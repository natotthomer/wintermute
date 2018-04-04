require 'sinatra/base'
require 'sinatra/json'

class Server < Sinatra::Base

  # pid = Process.spawn('./node_modules/.bin/webpack-dev-server')
  # Process.detach(pid)
  # puts "webpack dev server pid: #{pid}"



  get '/' do
    erb :index, layout: :layout
  end

  get '/commands' do
    content_type :json
    JSON.parse(File.read('commands.json')).to_json
  end
end
