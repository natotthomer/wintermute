require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/namespace'

class Server < Sinatra::Base
  register Sinatra::Namespace
  
  get '/' do
    erb :index, layout: :layout
  end

  namespace '/api' do
    get '/commands' do
      content_type :json
      JSON.parse(File.read('commands.json')).to_json
    end
  end
end
