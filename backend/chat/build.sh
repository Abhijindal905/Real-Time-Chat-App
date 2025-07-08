set -o errexit

cd "$(dirname "$0")"

pip install -r ../chat/requirements.txt

python ../chat/manage.py collectstatic --no-input

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('Abhi123', 'admin@example.com', 'Abhi@123')" | python ../manage.py shell

python ../chat/manage.py makemigrations

python ../chat/manage.py migrate --no-input