require './server'
require 'rack-proxy'

class AppProxy < Rack::Proxy
  def rewrite_env(env)
    env['HTTP_HOST'] = 'localhost:8081'
    puts env
    env
  end
end

run Server
