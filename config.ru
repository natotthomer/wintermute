require './server'
require 'rack-proxy'
require 'rack/protection'

# use Rack::Protection

run Server
