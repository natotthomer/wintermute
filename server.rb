require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/namespace'
require 'sequel'
require 'bcrypt'
require 'pry'

class Server < Sinatra::Base

  enable :sessions

  DB = Sequel.connect(
    adapter: 'postgres',
    host: 'localhost',
    database: 'wintermute_dev'
  )

  require './models/user'

  register Sinatra::Namespace

  before do
    if request.POST
      @request_payload = request.POST
    elsif request.body
      body = request.body.read
      @request_payload = body
    end
  end

  get '/' do
    erb :index, layout: :layout
  end

  namespace '/api' do
    get '/commands' do
      content_type :json
      JSON.parse(File.read('commands.json')).to_json
    end

    post '/sign_up' do
      password_salt = BCrypt::Engine.generate_salt
      password_digest = BCrypt::Engine.hash_secret(@request_payload["password"], password_salt)

      user = User.new(
        name: @request_payload["username"],
        password_digest: password_digest,
        password_salt: password_salt
      )

      if user.save
        session[:username] = user[:username]
        json user.to_api
      else
        'hello'
      end
    end
  end

end
