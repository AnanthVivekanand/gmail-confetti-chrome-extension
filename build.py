import shutil
import os

source_dir = '.'
zip_file = 'build.zip'

# Clean previous build
if os.path.exists(zip_file):
    os.remove(zip_file)

# Create ZIP archive excluding itself
shutil.make_archive('build', 'zip', source_dir)

print('Build complete!')
