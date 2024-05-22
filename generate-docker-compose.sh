#!/bin/bash

> docker-compose.landing.deploy.yaml
> docker-compose.freelancer.deploy.yaml
> docker-compose.company.deploy.yaml
> docker-compose.admin.deploy.yaml

> deploy.sh

DEPLOY_PROJECTS="$1"
IMAGE_TAG="$2"
NUMBER_OF_SAVED_IMAGES="$3"
KEEP_IMAGES="$4"

echo "DEPLOY_PROJECTS: $DEPLOY_PROJECTS"
echo "IMAGE_TAG: $IMAGE_TAG"
echo "NUMBER_OF_SAVED_IMAGES: $NUMBER_OF_SAVED_IMAGES"
echo "KEEP_IMAGES: $KEEP_IMAGES"

# Проверка и добавление сервиса landing в файл docker-compose.deploy.yml, если он указан в DEPLOY_PROJECTS или если all
if [[ "$DEPLOY_PROJECTS" == *"landing"* || "$DEPLOY_PROJECTS" == *"all"* ]]; then
  echo "
version: '3.8'
services:
  landing:
    image: ghcr.io/freelbee/nx-client/landing-${IMAGE_TAG}
    ports:
      - '4200:4200'
    restart: unless-stopped
    labels:
       - 'project=landing'
" >> docker-compose.landing.deploy.yaml

  echo "
docker-compose -f docker-compose.landing.deploy.yaml pull
docker-compose -f docker-compose.landing.deploy.yaml up -d" >> deploy.sh
  if [[ "$KEEP_IMAGES" == *"remove"* ]]; then
    echo "
bash ./remove-old-images.sh landing $NUMBER_OF_SAVED_IMAGES
" >> deploy.sh
  fi
fi

# Проверка и добавление сервиса freelancer в файл docker-compose.deploy.yml, если он указан в DEPLOY_PROJECTS или если all
if [[ "$DEPLOY_PROJECTS" == *"freelancer"* || "$DEPLOY_PROJECTS" == *"all"* ]]; then
  echo "
version: '3.8'
services:
  freelancer:
    image: ghcr.io/freelbee/nx-client/freelancer-${IMAGE_TAG}
    ports:
      - '4201:4200'
    restart: unless-stopped
    labels:
      - 'project=freelancer'

" >> docker-compose.freelancer.deploy.yaml

  echo "
docker-compose -f docker-compose.freelancer.deploy.yaml pull
docker-compose -f docker-compose.freelancer.deploy.yaml up -d" >> deploy.sh
  if [[ "$KEEP_IMAGES" == *"remove"* ]]; then
    echo "
bash ./remove-old-images.sh freelancer $NUMBER_OF_SAVED_IMAGES
    " >> deploy.sh
  fi
fi

# Проверка и добавление сервиса company в файл docker-compose.deploy.yml, если он указан в DEPLOY_PROJECTS или если all
if [[ "$DEPLOY_PROJECTS" == *"company"* || "$DEPLOY_PROJECTS" == *"all"* ]]; then
  echo "
version: '3.8'
services:
  company:
    image: ghcr.io/freelbee/nx-client/company-${IMAGE_TAG}
    ports:
      - '4202:4200'
    restart: unless-stopped
    labels:
      - 'project=company'

" >> docker-compose.company.deploy.yaml

  echo "
docker-compose -f docker-compose.company.deploy.yaml pull
docker-compose -f docker-compose.company.deploy.yaml up -d" >> deploy.sh
  if [[ "$KEEP_IMAGES" == *"remove"* ]]; then
    echo "
bash ./remove-old-images.sh company $NUMBER_OF_SAVED_IMAGES
    " >> deploy.sh
  fi
fi

# Проверка и добавление сервиса admin в файл docker-compose.deploy.yml, если он указан в DEPLOY_PROJECTS или если all
if [[ "$DEPLOY_PROJECTS" == *"admin"* || "$DEPLOY_PROJECTS" == *"all"* ]]; then
  echo "
version: '3.8'
services:
  admin:
    image: ghcr.io/freelbee/nx-client/admin-${IMAGE_TAG}
    ports:
      - '4203:4200'
    restart: unless-stopped
    labels:
      - 'project=admin'

" >> docker-compose.admin.deploy.yaml

  echo "
docker-compose -f docker-compose.admin.deploy.yaml pull
docker-compose -f docker-compose.admin.deploy.yaml up -d" >> deploy.sh
  if [[ "$KEEP_IMAGES" == *"remove"* ]]; then
    echo "
bash ./remove-old-images.sh admin $NUMBER_OF_SAVED_IMAGES
    " >> deploy.sh
  fi
fi
