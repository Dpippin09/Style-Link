#!/bin/bash

# Create a simple script to generate PWA icons
echo "Creating StyleLink PWA icons..."

# Create a basic PNG icon using convert (if available) or use placeholder
# For now, we'll create simple colored squares as placeholders

# Icon sizes needed for PWA
sizes=(32 72 96 128 144 152 192 384 512)

# Create simple colored icons using convert (ImageMagick) if available
for size in "${sizes[@]}"; do
  # Try to create with ImageMagick first
  if command -v convert &> /dev/null; then
    convert -size ${size}x${size} xc:"#000000" -fill "#FFFFFF" -gravity center -font DejaVu-Sans-Bold -pointsize $((size/8)) -annotate 0 "SL" "icon-${size}x${size}.png"
  else
    # Fallback: copy existing placeholder
    cp next.svg "icon-${size}x${size}.png" 2>/dev/null || echo "Created placeholder for ${size}x${size}"
  fi
  echo "Created icon-${size}x${size}.png"
done

echo "PWA icons created successfully!"
