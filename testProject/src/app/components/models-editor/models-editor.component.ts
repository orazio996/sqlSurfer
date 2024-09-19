import { Component, Input, SimpleChanges } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-models-editor',
  templateUrl: './models-editor.component.html',
  styleUrl: './models-editor.component.css'
})
export class ModelsEditorComponent {
  @Input() fileContent:string | ArrayBuffer = null;
  @Input() selectedModel:any;
  theme = 'vs-light';
  model: CodeModel = {
    language: 'sql',
    uri: 'main.sql',
    value: ''
  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    tabSize: 2, 
    insertSpaces: true,
    automaticLayout: true  
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileContent'] && !changes['fileContent'].isFirstChange()) {
      this.updateModelSelection();
    }
    if (changes['selectedModel'] && !changes['selectedModel'].isFirstChange()) {
      this.updateEditorContent();
    }
  }

  updateModelSelection(){
    this.model = {
      ...this.model,
      value: this.fileContent.toString()
    };
  }

  updateEditorContent(){
    this.model = {
      ...this.model,
      value: this.selectedModel.def.toString()
    };
  }
}
