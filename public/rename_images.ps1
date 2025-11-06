
# List of target filenames and their corresponding source files
$mapping = @{
    "Modern-Resume.jpg" = "preview_sidebar_teal.png"
    "Pro-CV-Template-Free-Download-MS-Word.jpg" = "preview_sidebar_gold.png"
    "canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg" = "preview_sidebar_blue.png"
    "cv-template-simple.b83ef691.png" = "preview_sidebar_purple.png"
    "design.png" = "preview_single_minimal.png"
    "download (1).jpeg" = "preview_single_bold.png"
    "download (2).jpeg" = "preview_single_accent.png"
    "download (3).jpeg" = "preview_header_split.png"
    "download (4).jpeg" = "preview_header_block.png"
    "download.jpeg" = "preview_visual_block.png"
    "download.png" = "preview_sidebar_visual_yellow.png"
    "good-resume-templates-for-someone-with-no-job-experience-v0-1uz5p6wv68nd1.jpg" = "preview_sidebar_classic_blue.png"
    "images (1).jpeg" = "preview_header_summary_green.png"
    "images (2).jpeg" = "preview_sidebar_pro_darkblue.png"
    "images (3).jpeg" = "preview_header_summary_peach.png"
    "images (4).jpeg" = "preview_sidebar_academic_grey.png"
    "images (5).jpeg" = "preview_single_minimal_plus.png"
    "images (6).jpeg" = "preview_sidebar_yellow_header.png"
    "images (7).jpeg" = "preview_narrow_sidebar_serif.png"
    "images.jpeg" = "preview_quadrant_simple.png"
}

# Create a temporary directory for converted images
$tempDir = Join-Path $PSScriptRoot "temp"
if (-not (Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir | Out-Null
}

# Get all image files
$imageFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.jpg" -File
$imageFiles += Get-ChildItem -Path $PSScriptRoot -Filter "*.jpeg" -File
$imageFiles += Get-ChildItem -Path $PSScriptRoot -Filter "*.png" -File

# Process each file
foreach ($file in $imageFiles) {
    if ($mapping.ContainsKey($file.Name)) {
        $targetName = $mapping[$file.Name]
        Write-Host "Processing $($file.Name) to $targetName"

        if ($file.Extension -ne ".png") {
            Write-Host "Converting $($file.Name) to PNG..."
            $targetPath = Join-Path $tempDir $targetName
        } else {
            $targetPath = Join-Path $PSScriptRoot $targetName
        }

        Copy-Item -Path $file.FullName -Destination $targetPath
        Write-Host "Assigned $($file.Name) to $targetName"
    } else {
        Write-Host "No mapping found for $($file.Name). Skipping."
    }
}

Write-Host "Processing complete!"
