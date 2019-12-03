require 'csv'
require 'byebug'
require 'net/http'
require 'json'
require 'pr_geohash'

HASHES = {
  sofia: %w(sx8e sx8d),
  plovdiv: %w(sx3x),
  vidin: %w(sxb4r sxb62 sxb4p sxb60)
}

def get_city hash
  HASHES.each do |city, hashes|
    hashes.each do |hash_start|
      if hash.start_with? hash_start
        return city
      end
    end
  end

  nil
end

def get_month date
  date.split('-')[1]
end

puts "Loading CSV into memory..."
csv = CSV.read('data/airtube-data-BG-2018.csv')
puts "CSV loaded into memory. Start processing data..."

by_city_by_date = {}

csv_rows_total = csv.size
csv_rows_done = 0

csv[1..].each do |row|
  csv_rows_done += 1

  if csv_rows_done % 100_000 == 0
    percent = 100 * csv_rows_done / csv_rows_total
    puts "Adding to by_city_by_date hash: Done #{csv_rows_done} out of #{csv_rows_total} (#{percent}%)"
  end

  next unless row[1]

  city = get_city row[1]
  next if city.nil?

  month = get_month row[0]
  p10 = row[2]
  p25 = row[3]
  temperature = row[4]

  by_city_by_date[city] = {} unless by_city_by_date.key? city
  by_city_by_date[city][month] = [] unless by_city_by_date[city].key? month
  by_city_by_date[city][month] << [p10, p25, temperature]
end

CSV.open('processed_data/airtube_data_by_month_2018.csv', 'wb') do |new_csv|
  new_csv << %w(city month p10 p2.5 temp)

  by_city_by_date.each do |current_city, city_data|
    puts "Writing data for city #{current_city}..."

    city_data.each do |date, date_data|
      date_size = date_data.size

      p1_sum = 0
      p2_sum = 0
      temp_sum = 0

      date_data.each do |instance|
        p1_sum += instance[0].to_i
        p2_sum += instance[1].to_i
        temp_sum += instance[2].to_i
      end

      p1_sum /= date_size
      p2_sum /= date_size
      temp_sum /= date_size

      new_csv << [current_city, date, p1_sum, p2_sum, temp_sum]
    end
  end
end

