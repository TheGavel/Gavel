# host = 'localhost:9200'
host = ENV['BONSAI_URL'] ||= 'localhost:9200'
Searchkick.client = Elasticsearch::Client.new(host: [host],retry_on_failure: true)
