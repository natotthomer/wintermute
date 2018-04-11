require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/namespace'
require 'sequel'
require 'bcrypt'
require 'pry'

class ApplicationController < Sinatra::Base
  register Sinatra::Namespace

  configure do
    set :public_folder, 'public'
    set :views, 'app/views'

    enable :sessions
    set :session_secret, "lkahsdlhqlsk5hkh23lkrhlskdhj"

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
      user = User.first(name: name)
      if user && user.authenticate(password)
        session[:name] = user.name
      else
        "invalid something"
      end
    end

    def logout!
      session.clear
    end

  end

  get '/' do
    erb :index, layout: :layout
  end
end
