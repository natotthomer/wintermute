#\ -s Puma -p 3000

require './server'
require 'rack-proxy'
require 'rack/protection'

# use Rack::Protection

run ApplicationController
