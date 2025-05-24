<template>
  <div class="text-editor">
    <div class="v-field__input" :class="{ invalid: errorMessage }">
      <label :for="name" class="v-field__label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
      <div class="control-group" v-if="editor">
        <div class="button-group">
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            <Icon icon="ooui:bold-b" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            <Icon icon="tabler:italic" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            <Icon icon="oui:editor-strike" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
            <Icon icon="tabler:underline" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <Icon icon="ci:heading-h1" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <Icon icon="ci:heading-h2" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            <Icon icon="ci:heading-h3" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            <Icon icon="ci:list-unordered" width="20px"/>
          </el-button>
          <el-button  type="text" native-type="button" round @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
            <Icon icon="ri:list-ordered" width="20px"/>
          </el-button>
        </div>
        <editor-content :editor="editor"
        />
      </div>
    </div>
    <div class="v-field__error" v-if="errorMessage">
      <i class="ic-u_info-circle"></i> {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, watch, ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import Paragraph from '@tiptap/extension-paragraph';
import { Icon } from '@iconify/vue'


const props = defineProps({
  value: String,
  name: String,
  placeholder: String,
  label: String,
  modelValue: String,
  required: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);


const editor = useEditor({
  content: props.modelValue,
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML());
  },
  extensions: [
    StarterKit,
    Heading.configure({ levels: [1, 2, 3] }),
    BulletList,
    OrderedList,
    Underline,
    Paragraph
  ],
});

watch(
  () => props.modelValue,
  (value) => {
    // HTML
    const isSame = editor.value?.getHTML() === value;

    // JSON
    // const isSame = JSON.stringify(editor.value?.getJSON()) === JSON.stringify(value);

    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(value, false);
  }
);

</script>

<style scoped>
.text-editor {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.v-field__input.invalid {
  border-color: red;
}

.v-field__error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.5em;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.button-group button {
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-group button.is-active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.button-group button:hover {
  background-color: #e0e0e0;
}
</style>
