import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor/public-api';
import { ArticleFormContent } from '../articleFormContent';
import { SiteMetaDataService } from '../site-meta-data.service';
import { MetaData } from '../metaData';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Output() closeModal = new EventEmitter()

  activeArticle: Article | null = null
  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}

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

  constructor(private articleService: ArticleService, private siteMetaDataService: SiteMetaDataService) {}

  ngOnInit() {
    this.activeArticle = this.articleService.getActiveArticle()
    if (this.activeArticle) {
      this.htmlContent = this.activeArticle.htmlContent
      this.localArticleImage = this.activeArticle.image ?? null
      if (this.localArticleImage) {
        //@ts-ignore
        document.querySelector('.article-image-preview').style.backgroundImage = `url(${this.localArticleImage})`
      }
    }
    this.siteMetaDataService.metaDataSubject.subscribe(metaData => this.metaData = metaData)
    this.siteMetaDataService.getMetaData()
  }

  onImageChange(e: any) {
    if (e.target && e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.localArticleImage = reader.result
        //@ts-ignore
        document.querySelector('.article-image-preview').style.backgroundImage = `url(${this.localArticleImage})`
      });
      reader.readAsDataURL(e.target.files[0])
    }
  }

  ngAfterViewInit() {
    //@ts-ignore
    document.querySelector('.angular-editor-toolbar').style.backgroundColor = `#fff`
    //@ts-ignore
    document.querySelector('.angular-editor-textarea').style.backgroundColor = `#fff`
  }

  removeLocalArticleImage() {
    this.localArticleImage = null
    //@ts-ignore
    document.querySelector('.article-image-preview').style.backgroundImage = `none`
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
      this.articleService.addArticle(articleContent, this.metaData.authorName)
    }
    this.closeModal.emit()
  }

}
