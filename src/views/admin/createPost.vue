<template>  
    <main>
        <header>
             <h1>Create Post</h1>
        </header>
        <body>
            <form @submit.prevent="">
            <label for="title"> Title: </label>
            <input type="text" placeholder="Post Title" required>

            <label for="desc"> Description: </label>
            <input type="text" placeholder="Post Description" required>
            <label for="tags"> Tags: </label>
            <input type="text" placeholder="Post Tags" required>
            <label for="content"> Contents: </label>
            <div class="markdown">
                <MdEditor
                   language="en-US"
                    preview-theme="default"
                    :preview="false"
                    code-theme="atom"
                    v-model="content"
                    :no-prettier="false"
                    :no-katex="false"
                    
                />
            </div>
           
            
            </form>
        </body>
       
    </main>
    
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';

const content = ref('### hello world!')

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'en-US': {
        toolbarTips: {
          bold: 'bold',
          underline: 'underline',
          italic: 'italic',
          strikeThrough: 'strikeThrough',
          title: 'title',
          sub: 'subscript',
          sup: 'superscript',
          quote: 'quote',
          unorderedList: 'unordered list',
          orderedList: 'ordered list',
          codeRow: 'inline code',
          code: 'block-level code',
          link: 'link',
          image: 'image',
          table: 'table',
          mermaid: 'mermaid',
          katex: 'formula',
          revoke: 'revoke',
          next: 'undo revoke',
          save: 'save',
          prettier: 'prettier',
          pageFullscreen: 'fullscreen in page',
          fullscreen: 'fullscreen',
          preview: 'preview',
          htmlPreview: 'html preview',
          catalog: 'catalog',
          github: 'source code'
        },
        titleItem: {
          h1: 'Lv1 Heading',
          h2: 'Lv2 Heading',
          h3: 'Lv3 Heading',
          h4: 'Lv4 Heading',
          h5: 'Lv5 Heading',
          h6: 'Lv6 Heading'
        },
        imgTitleItem: {
          link: 'Add Img Link',
          upload: 'Upload Img',
          clip2upload: 'Clip Upload'
        },
        linkModalTips: {
          title: 'Add ',
          descLable: 'Desc:',
          descLablePlaceHolder: 'Enter a description...',
          urlLable: 'Link:',
          UrlLablePlaceHolder: 'Enter a link...',
          buttonOK: 'OK'
        },
        clipModalTips: {
          title: 'Crop Image',
          buttonUpload: 'Upload'
        },
        copyCode: {
          text: 'Copy',
          successTips: 'Copied!',
          failTips: 'Copy failed!'
        },
        mermaid: {
          flow: 'flow',
          sequence: 'sequence',
          gantt: 'gantt',
          class: 'class',
          state: 'state',
          pie: 'pie',
          relationship: 'relationship',
          journey: 'journey'
        },
        katex: {
          inline: 'inline',
          block: 'block'
        },
        footer: {
          markdownTotal: 'Word Count',
          scrollAuto: 'Scroll Auto'
        }
      },
    },
    // mermaid template
    mermaidTemplate: {
      flow: `flow tempalte`,
      sequence: `sequence template`,
      gantt: `gantt template`,
      class: `class template`,
      state: `state template`,
      pie: `pie template`,
      relationship: `relationship template`,
      journey: `journey template`
    },
    // delay rendering time(ms)
    renderDelay: 0
  }
});

</script>

<style scoped>


.markdown {
    text-align: left;
    display: block;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>