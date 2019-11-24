require 'csv'

csv = CSV.read('data/data.csv')
bulgarian_data = csv.select { |row| row[0] == 'Bulgaria' }

CSV.open('data/bulgarian_data.csv', 'w') do |bg_csv|
  bg_csv << csv[0]
  bulgarian_data.each { |ar| bg_csv << ar }
end

