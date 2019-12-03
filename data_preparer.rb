require 'csv'
require 'json'

LOCATION_HASHES = {
  sofia: %w(sx8e sx8d),
  plovdiv: %w(sx3x),
  vidin: %w(sxb4r sxb62 sxb4p sxb60)
}

FILES_TO_PROCESS = [
  { input_file: 'data/airtube-data-BG-2018.csv', year: "2018" },
  { input_file: 'data/airtube-data-BG-2019.csv', year: "2019" }
]

OUTPUT_FILE = 'processed_data/airtube_data.json'

def get_city hash
  LOCATION_HASHES.each do |city, hashes|
    hashes.each do |hash_start|
      if hash.start_with? hash_start
        return city
      end
    end
  end

  nil
end

# Return the month as a single digit
def get_month date
  month_two_digits = date.split('-')[1]
  return month_two_digits[1].to_s if month_two_digits[0] == '0'
  month_two_digits
end

def median array
  sorted = array.sort
  len = sorted.length
  (sorted[(len - 1) / 2] + sorted[len / 2]) / 2.0
end

def process_data input_file
  puts "Start processing data from #{input_file}"
  puts "Loading file into memory..."
  csv = CSV.read(input_file)
  puts "File loaded into memory. Start processing data..."

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

    by_city_by_date[city] = {} unless by_city_by_date.key? city
    by_city_by_date[city][month] = [] unless by_city_by_date[city].key? month
    by_city_by_date[city][month] << p10.to_i
  end

  puts "Start generating result json"

  result_json = {}

  by_city_by_date.each do |city, city_data|
    puts "Writing data for city #{city}..."

    result_json[city] = {}

    city_data.each do |month, month_data|
      result_json[city][month] = median(month_data)
    end
  end

  result_json
end

total_result_json = {}

FILES_TO_PROCESS.each do |processed_group|
  total_result_json[processed_group[:year]] = process_data processed_group[:input_file]
end

File.open(OUTPUT_FILE, 'wb') do |f|
  f.write JSON.pretty_generate(total_result_json)
end
