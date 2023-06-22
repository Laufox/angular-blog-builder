import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor/public-api';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: {title: string, htmlContent: Event | undefined, index: number, image: string | ArrayBuffer | null}}>()
  @Input() currentAuthorName = ''
  @Input() selectedArticle: {title: string, htmlContent: Event | undefined, index: number | null, image: string | ArrayBuffer | null} = {title: '', htmlContent: undefined, index: null, image: null}

  formErrors = {
    title: false
  }

  htmlContent?: Event

  localArticleImage: string | ArrayBuffer | null = null

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    if (this.selectedArticle.index !== null) {
      this.htmlContent = this.selectedArticle.htmlContent
      if (this.selectedArticle.image) {
        this.localArticleImage = this.selectedArticle.image
      }
    }
  }

  onImageChange(e: any) {
    if (e.target && e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.localArticleImage = reader.result
      });
      reader.readAsDataURL(e.target.files[0])
    }
  }

  closeForm() {
    this.toggleArticleForm.emit({state: false})
  }

  addArticle(content: {title: string}): void {
    this.formErrors.title = !content.title
    if (this.formErrors.title) {
      return
    }

    const newArticle: Article = {
      title: content.title,
      date: new Date().toUTCString().slice(5, 16),
      author: this.currentAuthorName,
      htmlContent: this.htmlContent,
      image: this.localArticleImage
    }

    if (this.selectedArticle.index !== null) {
      this.articleService.updateArticle(this.selectedArticle.index, {title: content.title, htmlContent: this.htmlContent, image: this.localArticleImage ?? null})
    } else {
      this.articleService.addArticle(newArticle)
    }
    this.closeForm()
  }

}
