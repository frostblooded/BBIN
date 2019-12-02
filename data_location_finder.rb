require 'csv'
require 'byebug'
require 'net/http'
require 'json'
require 'pr_geohash'

HASHES = {
  sofia: ['sx8e', 'sx8d'],
  plovdiv: ['sx3x'],
  vidin: ['sxb4r', 'sxb62', 'sxb4p', 'sxb60']
}

def get_locality hash
  HASHES.each do |locality, hashes|
    hashes.each do |hash_start|
      if hash.start_with? hash_start
        return locality
      end
    end
  end

  nil
end

HOST = "api.bigdatacloud.net"
csv = CSV.read('data/airtube-data-BG-2019.csv')

CSV.open('data/airtube_locality_data_2019.csv', 'wb') do |new_csv|
  csv[1..].each do |row|
    unless row[1]
      byebug
      next
    end

    locality = get_locality row[1]
    next if locality.nil?

    data = [row[0], locality, row[2], row[3]]
    new_csv << data
    puts "[#{row[0]}, #{locality}, #{row[2]}, #{row[3]}]"
  end
end

