#!/bin/bash

PROJECT="$1"
KEEP_IMAGES="$2"
# Получаем список образов по паттерну, отсортированный по дате создания в обратном порядке
# Формат вывода: <дата создания> <ID образа>
images=$(docker images -a --format "{{.Repository}}\t{{.CreatedAt}}\t{{.ID}}" | grep "ghcr.io/freelbee/freelbee-client/$PROJECT" | sort -r)
#echo $images

# Преобразуем список в массив
readarray -t images_arr <<<"$images"

# Определяем количество образов для удаления
num_images=${#images_arr[@]}
num_keep=$KEEP_IMAGES # Количество образов, которые нужно сохранить
let num_remove=num_images-num_keep

# Удаляем образы, если их больше, чем num_keep
if [ "$num_remove" -gt 0 ]; then
  echo "Удаляем $num_remove старых образов."
  for ((i=num_keep; i<num_images; i++)); do
    # Извлекаем ID образа для удаления из массива, используя $NF для получения последнего столбца
    image_id=$(echo "${images_arr[$i]}" | awk '{print $NF}')
    echo "Удаление образа с ID: $image_id"
    # Удаление образа
    docker rmi "$image_id"
  done
else
  echo "Нет образов для удаления. Сохраняются последние $num_keep образов."
fi
