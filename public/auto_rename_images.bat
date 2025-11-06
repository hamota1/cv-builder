
@echo off
setlocal enabledelayedexpansion

echo Processing images...

:: List of target filenames and their corresponding source files
set "mapping[Modern-Resume.jpg]=preview_sidebar_teal.png"
set "mapping[Pro-CV-Template-Free-Download-MS-Word.jpg]=preview_sidebar_gold.png"
set "mapping[canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg]=preview_sidebar_blue.png"
set "mapping[cv-template-simple.b83ef691.png]=preview_sidebar_purple.png"
set "mapping[design.png]=preview_single_minimal.png"
set "mapping[download (1).jpeg]=preview_single_bold.png"
set "mapping[download (2).jpeg]=preview_single_accent.png"
set "mapping[download (3).jpeg]=preview_header_split.png"
set "mapping[download (4).jpeg]=preview_header_block.png"
set "mapping[download.jpeg]=preview_visual_block.png"
set "mapping[download.png]=preview_sidebar_visual_yellow.png"
set "mapping[good-resume-templates-for-someone-with-no-job-experience-v0-1uz5p6wv68nd1.jpg]=preview_sidebar_classic_blue.png"
set "mapping[images (1).jpeg]=preview_header_summary_green.png"
set "mapping[images (2).jpeg]=preview_sidebar_pro_darkblue.png"
set "mapping[images (3).jpeg]=preview_header_summary_peach.png"
set "mapping[images (4).jpeg]=preview_sidebar_academic_grey.png"
set "mapping[images (5).jpeg]=preview_single_minimal_plus.png"
set "mapping[images (6).jpeg]=preview_sidebar_yellow_header.png"
set "mapping[images (7).jpeg]=preview_narrow_sidebar_serif.png"
set "mapping[images.jpeg]=preview_quadrant_simple.png"

:: Create a temporary directory for converted images
if not exist "temp" mkdir temp

:: Process each file
for %%f in (*.jpg *.jpeg *.png) do (
    if defined mapping[%%f] (
        set "target=!mapping[%%f]!"
        echo Processing %%f to !target!

        if not "%%~xf"==".png" (
            echo Converting %%f to PNG...
            copy "%%f" "temp\!target!" >nul
        ) else (
            copy "%%f" "!target!" >nul
        )
        echo Assigned %%f to !target!
    ) else (
        echo No mapping found for %%f. Skipping.
    )
)

echo.
echo Processing complete!
pause
