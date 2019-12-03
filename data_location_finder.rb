require 'csv'
require 'json'

HASHES = {
  sofia: %w(sx8e sx8d),
  plovdiv: %w(sx3x),
  vidin: %w(sxb4r sxb62 sxb4p sxb60)
}

FILES_TO_PROCESS = {
  'data/airtube-data-BG-2018.csv' => 'processed_data/airtube_data_by_month_2018.csv',
  'data/airtube-data-BG-2019.csv' => 'processed_data/airtube_data_by_month_2019.csv',
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

def process_data input_file, output_file
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
    p25 = row[3]
    temperature = row[4]

    by_city_by_date[city] = {} unless by_city_by_date.key? city
    by_city_by_date[city][month] = [] unless by_city_by_date[city].key? month
    by_city_by_date[city][month] << [p10, p25, temperature]
  end

  puts "Start writing into #{output_file}"

  CSV.open(output_file, 'wb') do |new_csv|
    new_csv << %w(city month p10 p2.5 temp)

    by_city_by_date.each do |current_city, city_data|
      puts "Writing data for city #{current_city}..."

      city_data.each do |date, date_data|
        p1_arr = []
        p2_arr = []
        temp_arr = []

        date_data.each do |instance|
          p1_arr << instance[0].to_i
          p2_arr << instance[1].to_i
          temp_arr << instance[2].to_i
        end

        new_csv << [current_city, date, median(p1_arr), median(p2_arr), median(temp_arr)]
      end
    end
  end
end

FILES_TO_PROCESS.each do |input_file, output_file|
  process_data input_file, output_file
end
