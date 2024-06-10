#!/bin/bash
#
#PROJECT="$1"
## Получаем список образов по паттерну, отсортированный по дате создания в обратном порядке
## Формат вывода: <дата создания> <ID образа>
#images=$(docker images -a --format "{{.Repository}}\t{{.CreatedAt}}\t{{.ID}}" | grep "$PROJECT" | sort -r)
##echo $images
#
## Преобразуем список в массив
#readarray -t images_arr <<<"$images"
#
## Определяем количество образов для удаления
#num_images=${#images_arr[@]}
#num_keep=2 # Количество образов, которые нужно сохранить
#let num_remove=num_images-num_keep
#
## Удаляем образы, если их больше, чем num_keep
#if [ "$num_remove" -gt 0 ]; then
#  echo "Удаляем $num_remove старых образов."
#  for ((i=num_keep; i<num_images; i++)); do
#    # Извлекаем ID образа для удаления из массива, используя $NF для получения последнего столбца
#    image_id=$(echo "${images_arr[$i]}" | awk '{print $NF}')
#    echo "Удаление образа с ID: $image_id"
#    # Удаление образа
#    docker rmi "$image_id"
#  done
#else
#  echo "Нет образов для удаления. Сохраняются последние $num_keep образов."
#fi


# Проверка наличия хотя бы одного аргумента
if [ "$#" -lt 1 ]; then
  echo "Пожалуйста, укажите хотя бы одно имя проекта."
  exit 1
fi

# Определяем количество образов, которые нужно сохранить
num_keep=2

# Функция для обработки удаления образов для одного проекта
cleanup_images() {
  local PROJECT="$1"

  # Получаем список образов по паттерну, отсортированный по дате создания в обратном порядке
  images=$(docker images -a --format "{{.Repository}}\t{{.CreatedAt}}\t{{.ID}}" | grep "$PROJECT" | sort -r)

  # Преобразуем список в массив
  readarray -t images_arr <<<"$images"

  # Определяем количество образов для удаления
  num_images=${#images_arr[@]}
  num_remove=$((num_images - num_keep))

  # Удаляем образы, если их больше, чем num_keep
  if [ "$num_remove" -gt 0 ]; then
    echo "Удаляем $num_remove старых образов для проекта '$PROJECT'."
    for ((i = num_keep; i < num_images; i++)); do
      # Извлекаем ID образа для удаления из массива
      image_id=$(echo "${images_arr[$i]}" | awk '{print $NF}')
      echo "Удаление образа с ID: $image_id"
      # Удаление образа
      if docker rmi "$image_id"; then
        echo "Образ с ID $image_id успешно удалён."
      else
        echo "Ошибка при удалении образа с ID $image_id."
      fi
    done
  else
    echo "Нет образов для удаления для проекта '$PROJECT'. Сохраняются последние $num_keep образов."
  fi
}

# Проходимся по каждому переданному аргументу (именам проектов)
for PROJECT in "$@"; do
  cleanup_images "$PROJECT"
done
