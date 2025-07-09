#!/usr/bin/env bash
set -o errexit

cd "$(dirname "$0")"

pip install -r ../chat/requirements.txt

python ../chat/manage.py collectstatic --no-input
python ../chat/manage.py makemigrations
python ../chat/manage.py migrate --no-input

# ✅ Create admin user
echo "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'adminpass');
    print('✅ Superuser created');
else:
    print('ℹ️ Superuser already exists');
" | python ../chat/manage.py shell
