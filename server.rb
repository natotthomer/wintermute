require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/namespace'
require 'sequel'
require 'bcrypt'
require 'pry'


class ApplicationController < Sinatra::Base

  configure do
    set :public_folder, 'public'
    set :views, 'app/views'

    enable :sessions
    set :session_secret, '857yu34ht5o39vn345n0v9w4856mv3094682v309'

    DB = Sequel.connect(
      adapter: 'postgres',
      host: 'localhost',
      database: 'wintermute_dev'
    )
  end

  helpers do

    def current_user
      @current_user ||= User.first(name: session[:name]) if session[:name]
    end

    def logged_in?
      !!current_user
    end

    def login(email, password)
      user = User.first(email: email)
      if user && user.authenticate(password)
        session[:email] = user.email
      else
        "invalid something"
      end
    end

    def logout!
      session.clear
    end

  end

  require './models/user'

  register Sinatra::Namespace

  before do
    p session
    p params['name']
    p session[:user_name]
    p session[:user_id]
    @user = User.first(name: params['name'] || session[:user_name] )
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
      password_digest = BCrypt::Engine.hash_secret(params["password"], password_salt)

      new_user_data = {
        name: params["name"],
        password_salt: password_salt,
        password_digest: password_digest
      }

      user = User.new(new_user_data)

      if user.save
        session[:user_name] = user[:name]
        session[:user_id] = user[:id]
        json @user.to_api
      else
        'hello'
      end
    end

    post '/sign_in' do
      password_digest = BCrypt::Engine.hash_secret(params["password"], @user.password_salt)

      if password_digest == @user.password_digest
        session[:user_name] = @user[:name]
        session[:user_id] = @user[:id]
        json @user.to_api
      end
    end

    # get '/protected', auth: :user do
    #   p 'protected!!!!'
    #   json(protected: 'hi im protected')
    # end
  end

end
