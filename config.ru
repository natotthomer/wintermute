#\ -s Puma -p 3000

require_relative './config/environment'

use Rack::MethodOverride
use SessionsController
use CommandsController

run ApplicationController
