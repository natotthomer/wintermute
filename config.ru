require './server'
require 'rack-proxy'

class AppProxy < Rack::Proxy
  def rewrite_env(env)
    env['HTTP_HOST'] = 'localhost:8081'
    env
  end
end

run Rack::URLMap.new(
    '/api' => Server,
    '/' => AppProxy.new
)
