
import os
import shutil
from PIL import Image

# مسار مجلد الصور
images_dir = "d:/cv builder/public/images"

# قائمة التصاميم والأسماء المستهدفة
designs = [
    {"name": "preview_sidebar_teal.png", "description": "شريط جانبي كحلي"},
    {"name": "preview_sidebar_gold.png", "description": "شريط جانبي أسود وذهبي"},
    {"name": "preview_sidebar_blue.png", "description": "شريط جانبي أزرق فاتح"},
    {"name": "preview_sidebar_purple.png", "description": "شريط جانبي بنفسجي"},
    {"name": "preview_single_minimal.png", "description": "عمود واحد بسيط"},
    {"name": "preview_single_bold.png", "description": "عمود واحد بخط عريض"},
    {"name": "preview_single_accent.png", "description": "عمود واحد بلمسة حمراء"},
    {"name": "preview_header_split.png", "description": "رأس مقسوم"},
    {"name": "preview_header_block.png", "description": "رأس أسود عريض"},
    {"name": "preview_visual_block.png", "description": "رأس ذهبي مع صورة"},
    {"name": "preview_sidebar_visual_yellow.png", "description": "شريط جانبي أصفر وداكن"},
    {"name": "preview_sidebar_classic_blue.png", "description": "شريط جانبي أزرق كلاسيكي"},
    {"name": "preview_header_summary_green.png", "description": "رأس أخضر"},
    {"name": "preview_sidebar_pro_darkblue.png", "description": "Software Eng - كحلي"},
    {"name": "preview_header_summary_peach.png", "description": "رأس بلون الخوخ"},
    {"name": "preview_sidebar_academic_grey.png", "description": "شريط جانبي رمادي"},
    {"name": "preview_single_minimal_plus.png", "description": "بسيط جداً"},
    {"name": "preview_sidebar_yellow_header.png", "description": "شريط جانبي أصفر ورأس أسود"},
    {"name": "preview_narrow_sidebar_serif.png", "description": "شريط جانبي رفيع"},
    {"name": "preview_quadrant_simple.png", "description": "تصميم رباعي"}
]

# الحصول على قائمة بجميع الملفات في مجلد الصور
files = [f for f in os.listdir(images_dir) if os.path.isfile(os.path.join(images_dir, f))]

# طباعة قائمة الملفات للمستخدم لتحديد كل صورة
print("الصور الموجودة في المجلد:")
for i, file in enumerate(files):
    print(f"{i+1}. {file}")

# طباعة قائمة التصاميم للمستخدم
print("
قائمة التصاميم المطلوبة:")
for i, design in enumerate(designs):
    print(f"{i+1}. {design['name']} - {design['description']}")

# إنشاء مجلد مؤقت للصور المعالجة
temp_dir = os.path.join(images_dir, "temp")
os.makedirs(temp_dir, exist_ok=True)

# معالجة كل صورة
for i, file in enumerate(files):
    file_path = os.path.join(images_dir, file)

    # تحديد ما إذا كانت الصورة بصيغة PNG أم لا
    is_png = file.lower().endswith('.png')

    # إذا لم تكن الصورة بصيغة PNG، قم بتحويلها
    if not is_png:
        try:
            img = Image.open(file_path)
            new_file_path = os.path.join(temp_dir, f"temp_{i}.png")
            img.save(new_file_path, "PNG")
            print(f"تم تحويل {file} إلى PNG")
            file_path = new_file_path
        except Exception as e:
            print(f"خطأ في تحويل {file}: {str(e)}")
            continue

# الآن سيقوم المستخدم بتحديد كل صورة وتعيينها للتصميم المناسب
print("
الرجاء تحديد كل صورة والتصميم المناسب لها:")
for i, file in enumerate(files):
    design_index = int(input(f"أدخل رقم التصميم المناسب للصورة {file} (1-{len(designs)}): ")) - 1
    if 0 <= design_index < len(designs):
        source_path = os.path.join(temp_dir if not file.lower().endswith('.png') else images_dir, 
                                  f"temp_{i}.png" if not file.lower().endswith('.png') else file)
        target_path = os.path.join(images_dir, designs[design_index]["name"])
        shutil.copy2(source_path, target_path)
        print(f"تم تعيين {file} إلى {designs[design_index]['name']}")

# حذف المجلد المؤقت
shutil.rmtree(temp_dir)

print("
اكتملت عملية تسمية الصور بنجاح!")
