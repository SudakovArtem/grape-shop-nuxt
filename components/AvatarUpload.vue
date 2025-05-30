<script setup lang="ts">
interface Props {
  modelValue?: string | null
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | null): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false
})

const emit = defineEmits<Emits>()

const { upload: uploadService } = useServices()
const fileInput = ref<HTMLInputElement>()
const isUploading = ref(false)

function triggerFileInput() {
  if (props.disabled || isUploading.value) return
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // Проверка типа файла
  if (!file.type.startsWith('image/')) {
    alert('Пожалуйста, выберите изображение')
    return
  }
  
  // Проверка размера файла (максимум 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Размер файла не должен превышать 5MB')
    return
  }
  
  isUploading.value = true
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await uploadService.uploadFile(formData, 'avatars')
    emit('update:modelValue', response.url)
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Ошибка при загрузке файла')
  } finally {
    isUploading.value = false
    // Очищаем input для возможности загрузки того же файла
    if (target) target.value = ''
  }
}

function removeAvatar() {
  if (props.disabled) return
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <!-- Avatar Preview -->
    <div class="relative">
      <div 
        class="w-20 h-20 rounded-full border-2 border-vine-200 overflow-hidden bg-vine-50 flex items-center justify-center cursor-pointer transition-colors hover:bg-vine-100"
        :class="{ 'opacity-50': disabled }"
        @click="triggerFileInput"
      >
        <img 
          v-if="modelValue" 
          :src="modelValue" 
          alt="Avatar" 
          class="w-full h-full object-cover"
        />
        <div v-else class="text-vine-400">
          <Icon name="i-lucide-user" class="w-6 h-6" />
        </div>
        
        <!-- Upload overlay -->
        <div 
          v-if="isUploading"
          class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full"
        >
          <Icon name="i-lucide-loader-2" class="w-5 h-5 text-white animate-spin" />
        </div>
      </div>
      
      <!-- Remove button -->
      <button
        v-if="modelValue && !disabled"
        @click.stop="removeAvatar"
        type="button"
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <Icon name="i-lucide-x" class="w-2.5 h-2.5" />
      </button>
    </div>
    
    <!-- Upload button -->
    <div class="text-center">
      <UiButton
        @click="triggerFileInput"
        variant="outline"
        size="sm"
        type="button"
        :disabled="disabled || isUploading"
        class="text-xs"
      >
        {{ isUploading ? 'Загрузка...' : (modelValue ? 'Изменить' : 'Загрузить') }}
      </UiButton>
      <p class="text-xs text-vine-500 mt-1">
        JPG, PNG до 5MB
      </p>
    </div>
    
    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template> 