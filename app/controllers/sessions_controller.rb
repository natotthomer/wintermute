class SessionsController < ApplicationController

  namespace '/api' do

    post '/users' do
      password_salt = BCrypt::Engine.generate_salt
      password_digest = BCrypt::Engine.hash_secret(params["password"], password_salt)

      new_user_data = {
        name: params["name"],
        password_salt: password_salt,
        password_digest: password_digest
      }

      user = User.new(new_user_data)

      if user.save
        session[:name] = user[:name]
        json user.to_api
      else
        'hello'
      end
    end

    post '/login' do
      @user = User.first(name: params['name'])
      password_digest = BCrypt::Engine.hash_secret(params["password"], @user.password_salt)

      if password_digest == @user.password_digest
        session[:name] = @user[:name]
        json user: @user.to_api
      end
    end

    post '/logout' do
      p 'hi'
      json user: {}
    end

  end

end
