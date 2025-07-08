set -o errexit

cd "$(dirname "$0")"

pip install -r ../chat/requirements.txt

python ../chat/manage.py collectstatic --no-input

python ../chat/manage.py migrate