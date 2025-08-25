<template>
  <div class="text-editor">
    <div class="v-field__input" :class="{ invalid: errorMessage }">
      <div style="display: flex; justify-content: space-between;">
        <label :for="name" class="v-field__label">
          {{ label }}
          <span v-if="required" class="text-danger">*</span>
        </label>
        <el-popover
          v-if="showInfo"
          placement="bottom"
          :title="infoTitle"
          width="200"
          trigger="click"
          :content="infoBody"
        >
          <template #reference>
            <i
              class="ic-u_info-circle menu-open-icon"
              style="
                cursor: pointer;
                margin-right: 5px;
                color: #0cc7a1;
                margin-top: 2px;
              "
            ></i>
          </template>
        </el-popover>
      </div>
      <ckeditor ref="editor"
                :editor="editor"
                :config="editorConfig"
                :model-value='inputValue'
                @input='handleChange'
                @blur='handleBlur'/>
    </div>
    <div class="v-field__error" v-if="errorMessage">
      <i class="ic-u_info-circle"></i> {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import axiosInstance, { baseurl } from '@/composables/axios'

import { useAuthStore } from '@/stores/auth.ts'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const props = defineProps({
  value: String,
  name: String,
  placeholder: String,
  label: String,
  required: {
    default: false,
    type: Boolean
  },
  readonly: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  uploadDirectory: String,
})

const editor = ClassicEditor;
const authStore = useAuthStore()

const editorConfig = {
  extraPlugins: [uploadingAdapter],
  language: { ui: 'en', content: 'ar' },
  mediaEmbed: {
    providers: [
      {
        name: 'aparat',
        url: /^https:\/\/www\.aparat\.com\/.+$/,
        html: (match: any) => {
          const url = match[0];
          const id = url.split('/').pop(); // expects .../v/VIDEO_ID
          return `
          <iframe
            src="https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame"
            frameborder="0"
            allow="fullscreen; picture-in-picture; encrypted-media; autoplay"
            allowfullscreen
            style="width:100%;aspect-ratio:16/9;display:block"
          ></iframe>
        `;
        }
      }
    ],
    previewsInData: true
  }
};


function uploadingAdapter(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return loader.file.then((file: any) => new Promise((resolve, reject) => {
          const headers = {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'multipart/form-data'
          }
          const formData = new FormData()
          formData.append('file', file)
          formData.append('directory', props?.uploadDirectory)
          axiosInstance.post(`storage/upload/`, formData, { headers })
            .then(response => {
              resolve({
                default: `${baseurl}/storage/download/?file_name=${response.data.data.stored_name}`
              });
            })
            .catch(reject);
        }));
      }
    };
  };
}

const name: any = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta: {touched}
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style scoped>
.text-editor {
  margin-bottom: 20px;
}

.v-field__input.invalid {
  border-color: red;
}

.v-field__error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.5em;
}
</style>
