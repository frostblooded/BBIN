require 'csv'
require 'byebug'

def get_month date
  date.split('-')[1]
end

csv = CSV.read('data/airtube_locality_data_2019.csv')
# csv = CSV.read('data/airtube_test.csv')
result = {}
by_city_by_date = {}

csv.each do |row|
  month = get_month row[0]
  city = row[1]

  by_city_by_date[city] = {} unless by_city_by_date.key? city
  by_city_by_date[city][month] = [] unless by_city_by_date[city].key? month
  by_city_by_date[city][month] << [row[2], row[3], row[4]]
end

CSV.open('data/airtube_data_by_month_2019.csv', 'wb') do |new_csv|
  new_csv << ['city', 'month', 'p10', 'p2.5', 'temp']

  by_city_by_date.each do |city, city_data|
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

      new_csv << [city, date, p1_sum, p2_sum, temp_sum]
    end
  end
end

