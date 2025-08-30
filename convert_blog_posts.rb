#!/usr/bin/env ruby

require 'fileutils'
require 'date'

# Configuration
BLOG_DIR = '/Users/Chris/Projects/AET/Blog'
POSTS_DIR = '/Users/Chris/Projects/AET/_posts'
START_DATE = Date.new(2025, 8, 31) # Starting tomorrow

# Category mappings based on content analysis
CATEGORIES = {
  'Tesla Coil' => ['energy-devices', 'tesla', 'electromagnetic'],
  'Scalar Energy' => ['scalar-energy', 'alternative-physics', 'tesla'],
  'Orgone Energy' => ['orgone', 'reich', 'energy-healing'],
  'Rife' => ['rife', 'frequency-healing', 'bioresonance'],
  'PEMF' => ['pemf', 'electromagnetic-therapy', 'medical'],
  'Casimir Effect' => ['quantum-physics', 'casimir', 'zero-point'],
  'Zero-Point' => ['zero-point-energy', 'quantum-physics', 'vacuum-energy'],
  'Rodin Coil' => ['rodin-coils', 'vortex-math', 'toroidal-energy'],
  'Tachyon' => ['tachyon-energy', 'faster-than-light', 'subtle-energy'],
  'Tensor Ring' => ['tensor-rings', 'cubit-measurement', 'sacred-geometry'],
  'Crystal' => ['crystal-technology', 'sacred-geometry', 'vibrational-healing'],
  'Solfeggio' => ['solfeggio-frequencies', 'sound-healing', 'vibrational-therapy'],
  'Kozyrev' => ['kozyrev-mirrors', 'time-research', 'consciousness'],
  'ABHA' => ['abha-torus', 'vortex-math', 'toroidal-energy'],
  'Hutchison' => ['hutchison-effect', 'levitation', 'antigravity'],
  'Grebennikov' => ['cavity-structural-effect', 'antigravity', 'insect-research'],
  'Searl' => ['searl-effect', 'antigravity', 'magnetic-levitation'],
  'Keely' => ['sympathetic-vibratory-physics', 'keely', 'sound-physics'],
  'Backster' => ['plant-consciousness', 'biocommunication', 'consciousness-research'],
  'Gariaev' => ['wave-genetics', 'dna-linguistics', 'quantum-biology'],
  'Peterson' => ['pete-peterson', 'consciousness-technology', 'healing-devices'],
  'Shoulders' => ['vacuum-charge-clusters', 'exotic-vacuum-objects', 'plasma-physics'],
  'Spurling' => ['slim-spurling', 'environmental-harmonics', 'tensor-technology'],
  'Emoto' => ['water-structuring', 'water-memory', 'consciousness-effects'],
  'Holographic' => ['holographic-energy', 'holographic-universe', 'information-field'],
  'Plasma' => ['plasma-energy', 'plasma-devices', 'fourth-state-matter'],
  'Bioresonance' => ['bioresonance', 'frequency-therapy', 'energy-medicine'],
  'Bionetic' => ['bionetic-technology', 'biofield', 'subtle-energy'],
  'Starship' => ['starship-coil', 'exotic-propulsion', 'antigravity'],
  'Vortex-Based Mathematics' => ['vortex-math', 'rodin-math', 'numerical-patterns']
}

def get_categories(filename)
  # Find matching categories based on filename
  matching_categories = []
  
  CATEGORIES.each do |key, categories|
    if filename.include?(key)
      matching_categories = categories
      break
    end
  end
  
  # Default categories if no match found
  if matching_categories.empty?
    matching_categories = ['alternative-science', 'energy-technology', 'consciousness']
  end
  
  matching_categories
end

def generate_slug(title)
  # Convert title to URL-friendly slug
  title.downcase
       .gsub(/[^\w\s-]/, '')
       .gsub(/\s+/, '-')
       .gsub(/-+/, '-')
       .strip
end

def extract_title(content)
  # Extract title from first # heading
  lines = content.split("\n")
  title_line = lines.find { |line| line.start_with?('# ') }
  
  if title_line
    title_line.gsub(/^# /, '').strip
  else
    "Untitled Post"
  end
end

def create_excerpt(content)
  # Create excerpt from introduction section
  lines = content.split("\n")
  intro_started = false
  excerpt_lines = []
  
  lines.each do |line|
    if line.start_with?('## Introduction')
      intro_started = true
      next
    elsif intro_started && line.start_with?('## ')
      break
    elsif intro_started && !line.strip.empty?
      excerpt_lines << line
    end
  end
  
  excerpt = excerpt_lines.join(' ').strip
  # Limit excerpt to first 2 sentences
  sentences = excerpt.split(/[.!?]+/)
  sentences[0..1].join('.').strip + (sentences.length > 2 ? '.' : '')
end

def process_blog_post(file_path, post_date)
  puts "Processing: #{File.basename(file_path)}"
  
  # Read the original content
  content = File.read(file_path)
  
  # Extract title and create slug
  title = extract_title(content)
  slug = generate_slug(title)
  
  # Get categories based on filename
  categories = get_categories(File.basename(file_path))
  
  # Create excerpt
  excerpt = create_excerpt(content)
  
  # Generate Jekyll front matter
  front_matter = <<~YAML
    ---
    layout: post
    title: "#{title}"
    date: #{post_date.strftime('%Y-%m-%d')} 10:00:00 -0400
    categories: [#{categories.map { |c| "\"#{c}\"" }.join(', ')}]
    tags: [#{categories.map { |c| "\"#{c}\"" }.join(', ')}]
    excerpt: "#{excerpt}"
    image: "/assets/images/blog/#{slug}-hero.jpg"
    author: "Ascension Energy Technologies"
    featured: false
    ---
    
  YAML
  
  # Combine front matter with content
  jekyll_content = front_matter + content
  
  # Create the new filename
  new_filename = "#{post_date.strftime('%Y-%m-%d')}-#{slug}.md"
  new_file_path = File.join(POSTS_DIR, new_filename)
  
  # Write the new file
  File.write(new_file_path, jekyll_content)
  
  puts "Created: #{new_filename}"
  return new_filename
end

# Main execution
puts "🚀 Starting blog post conversion..."
puts "Source directory: #{BLOG_DIR}"
puts "Destination directory: #{POSTS_DIR}"

# Ensure posts directory exists
FileUtils.mkdir_p(POSTS_DIR)

# Get all markdown files from Blog directory (excluding index.md)
blog_files = Dir.glob(File.join(BLOG_DIR, '*.markdown')).reject do |file|
  File.basename(file) == 'index.md'
end

puts "Found #{blog_files.length} blog posts to convert"

# Process each file with sequential dates
converted_files = []
blog_files.sort.each_with_index do |file_path, index|
  post_date = START_DATE + index
  begin
    converted_file = process_blog_post(file_path, post_date)
    converted_files << converted_file
  rescue => e
    puts "❌ Error processing #{File.basename(file_path)}: #{e.message}"
  end
end

puts "\n✅ Conversion complete!"
puts "Converted #{converted_files.length} blog posts"
puts "Posts will be published starting #{START_DATE.strftime('%B %d, %Y')}"

# Generate summary report
puts "\n📊 Conversion Summary:"
puts "=" * 50

converted_files.each_with_index do |filename, index|
  date = (START_DATE + index).strftime('%Y-%m-%d')
  puts "#{date}: #{filename}"
end

puts "\n🔧 Next steps:"
puts "1. Review the converted posts in #{POSTS_DIR}"
puts "2. Add hero images to /assets/images/blog/ directory"
puts "3. Run 'bundle exec jekyll build' to test"
puts "4. Commit and push to deploy"
puts "\n🎉 Your blog is about to get 35 amazing new posts!"
