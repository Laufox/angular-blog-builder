import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor/public-api';
import { v4 as uuid } from 'uuid'
import { ArticleFormContent } from '../articleFormContent';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: Article}>()
  @Input() currentAuthorName = ''
  @Input() selectedArticle: Article | null = null

  activeArticle: Article | null = null
  //{title: '', id: '', author: '', date: '', image: null, htmlContent: undefined}

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
    this.activeArticle = this.articleService.getActiveArticle()
    if (this.activeArticle) {
      this.htmlContent = this.activeArticle.htmlContent
      this.localArticleImage = this.activeArticle.image ?? null
    }
    // console.log("first", this.activeArticle)
    // this.articleService.activeArticleSubject.subscribe(article => this.activeArticle = article)
    // if (this.selectedArticle) {
    //   this.localArticleImage = this.selectedArticle.image ?? null
    // }
    // if (this.selectedArticle.index !== null) {
    //   this.htmlContent = this.selectedArticle.htmlContent
    //   if (this.selectedArticle.image) {
    //     this.localArticleImage = this.selectedArticle.image
    //   }
    // }
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

    const articleContent: ArticleFormContent = {
      title: content.title,
      htmlContent: this.htmlContent,
      image: this.localArticleImage
    }

    if (this.activeArticle) {
      this.articleService.updateArticle(this.activeArticle.id, articleContent)
    } else {
      this.articleService.addArticle(articleContent, this.currentAuthorName)
    }
    this.closeForm()
  }

}
