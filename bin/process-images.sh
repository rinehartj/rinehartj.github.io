#!/bin/bash
INPUT_DIR="assets/img"

# Detect ImageMagick command
if command -v magick &> /dev/null; then
    IM_CMD="magick"
elif command -v convert &> /dev/null; then
    IM_CMD="convert"
else
    echo "ERROR: ImageMagick not found."
    exit 1
fi

find "$INPUT_DIR" -type f | while read -r file; do
  ext="${file##*.}"
  lower_ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  base="${file%.*}"

  # Convert HEIC/HEIF to JPG
  if [[ "$lower_ext" == "heic" || "$lower_ext" == "heif" ]]; then
    echo "Converting: $file"
    if $IM_CMD "$file" "${base}.jpg"; then
      rm "$file"
      file="${base}.jpg"
      lower_ext="jpg"
      echo "  → Converted to ${base}.jpg"
    else
      echo "  ERROR: Conversion failed for $file — skipping."
      continue
    fi
  fi
  
  # Strip metadata if file exists but preserve ICC color profile. Comment this entire
  # "if" statement to disable metadata scrubbing.
  if [[ "$lower_ext" =~ ^(jpg|jpeg|png|webp|tiff)$ ]] && [[ -f "$file" ]]; then
    echo "  Stripping metadata: $file"
    exiftool -all= --icc_profile:all -overwrite_original "$file"
  fi
done

echo "Done."