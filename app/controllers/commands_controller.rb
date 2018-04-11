class CommandsController < ApplicationController

  namespace '/api' do
    get '/commands' do
      content_type :json
      JSON.parse(File.read('commands.json')).to_json
    end
  end

end
