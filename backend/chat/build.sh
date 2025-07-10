#!/usr/bin/env bash
set -o errexit

cd "$(dirname "$0")"

pip install -r ../chat/requirements.txt

python ../chat/manage.py collectstatic --no-input

# Optional: explicitly call makemigrations on the app
python ../chat/manage.py makemigrations core
python ../chat/manage.py migrate --no-input

# ✅ Create or update admin user
echo "
from django.contrib.auth import get_user_model;
User = get_user_model();
admin = User.objects.filter(username='admin').first()
if admin:
    admin.is_staff = True
    admin.is_superuser = True
    admin.set_password('newpassword123')
    admin.save()
    print('✅ Admin updated with staff and superuser status');
else:
    User.objects.create_superuser('admin', 'admin@example.com', 'newpassword123')
    print('✅ Admin created');
" | python ../chat/manage.py shell
