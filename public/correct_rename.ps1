
# Set working directory
Set-Location "d:/cv builder/public/images"

# Copy and rename images based on the correct mapping
Copy-Item "images (7).jpeg" "preview_single_accent.png"
Copy-Item "images.jpeg" "preview_header_split.png"
Copy-Item "download.png" "preview_single_bold.png"
Copy-Item "images (2).jpeg" "preview_sidebar_gold.png"
Copy-Item "images (1).jpeg" "preview_visual_block.png"
Copy-Item "download (4).jpeg" "preview_sidebar_teal.png"
Copy-Item "images (6).jpeg" "preview_single_minimal.png"
Copy-Item "images (4).jpeg" "preview_header_block.png"
Copy-Item "images (5).jpeg" "preview_sidebar_purple.png"
Copy-Item "images (3).jpeg" "preview_sidebar_blue.png"
Copy-Item "design.png" "preview_sidebar_academic_grey.png"
Copy-Item "cv-template-simple.b83ef691.png" "preview_single_minimal_plus.png"
Copy-Item "download (2).jpeg" "preview_sidebar_yellow_header.png"
Copy-Item "canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg" "preview_sidebar_classic_blue.png"
Copy-Item "download (3).jpeg" "preview_narrow_sidebar_serif.png"
Copy-Item "download.jpeg" "preview_header_summary_peach.png"
Copy-Item "Pro-CV-Template-Free-Download-MS-Word.jpg" "preview_sidebar_pro_darkblue.png"
Copy-Item "Modern-Resume.jpg" "preview_sidebar_visual_yellow.png"
Copy-Item "download (1).jpeg" "preview_header_summary_green.png"
Copy-Item "good-resume-templates-for-someone-with-no-job-experience-v0-1uz5p6wv68nd1.jpg" "preview_quadrant_simple.png"

Write-Host "Processing complete!"
