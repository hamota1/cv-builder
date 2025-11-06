
@echo off
setlocal enabledelayedexpansion

echo Processing images...

:: Create a temporary directory for converted images
if not exist "temp" mkdir temp

:: List of target filenames
set "files[1]=preview_sidebar_teal.png"
set "files[2]=preview_sidebar_gold.png"
set "files[3]=preview_sidebar_blue.png"
set "files[4]=preview_sidebar_purple.png"
set "files[5]=preview_single_minimal.png"
set "files[6]=preview_single_bold.png"
set "files[7]=preview_single_accent.png"
set "files[8]=preview_header_split.png"
set "files[9]=preview_header_block.png"
set "files[10]=preview_visual_block.png"
set "files[11]=preview_sidebar_visual_yellow.png"
set "files[12]=preview_sidebar_classic_blue.png"
set "files[13]=preview_header_summary_green.png"
set "files[14]=preview_sidebar_pro_darkblue.png"
set "files[15]=preview_header_summary_peach.png"
set "files[16]=preview_sidebar_academic_grey.png"
set "files[17]=preview_single_minimal_plus.png"
set "files[18]=preview_sidebar_yellow_header.png"
set "files[19]=preview_narrow_sidebar_serif.png"
set "files[20]=preview_quadrant_simple.png"

:: List of design descriptions
set "descriptions[1]=شريط جانبي كحلي"
set "descriptions[2]=شريط جانبي أسود وذهبي"
set "descriptions[3]=شريط جانبي أزرق فاتح"
set "descriptions[4]=شريط جانبي بنفسجي"
set "descriptions[5]=عمود واحد بسيط"
set "descriptions[6]=عمود واحد بخط عريض"
set "descriptions[7]=عمود واحد بلمسة حمراء"
set "descriptions[8]=رأس مقسوم"
set "descriptions[9]=رأس أسود عريض"
set "descriptions[10]=رأس ذهبي مع صورة"
set "descriptions[11]=شريط جانبي أصفر وداكن"
set "descriptions[12]=شريط جانبي أزرق كلاسيكي"
set "descriptions[13]=رأس أخضر"
set "descriptions[14]=Software Eng - كحلي"
set "descriptions[15]=رأس بلون الخوخ"
set "descriptions[16]=شريط جانبي رمادي"
set "descriptions[17]=بسيط جداً"
set "descriptions[18]=شريط جانبي أصفر ورأس أسود"
set "descriptions[19]=شريط جانبي رفيع"
set "descriptions[20]=تصميم رباعي"

:: Display the files in the directory
echo.
echo Images in the directory:
dir /b *.jpg *.jpeg *.png

:: Display the designs
echo.
echo Required designs:
for /l %%i in (1,1,20) do (
    echo %%i. !files[%%i]! - !descriptions[%%i]!
)

:: Process each file
echo.
echo Please match each image with the appropriate design:
for %%f in (*.jpg *.jpeg *.png) do (
    echo.
    echo Current file: %%f
    set /p "design_num=Enter the design number (1-20): "

    if !design_num! geq 1 if !design_num! leq 20 (
        if not "%%~xf"==".png" (
            echo Converting %%f to PNG...
            copy "%%f" "temp\!files[!design_num!]!" >nul
        ) else (
            copy "%%f" "!files[!design_num!]!" >nul
        )
        echo Assigned %%f to !files[!design_num]!
    ) else (
        echo Invalid design number. Skipping.
    )
)

echo.
echo Processing complete!
pause
