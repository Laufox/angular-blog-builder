import { Component } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentBlogTitle = 'My blog title'
  currentAuthorName = "John Doe"
  bannerImage: string | ArrayBuffer | null = null
  articleOpen: boolean = false
  aboutModalOpen: boolean = false
  settingsModalOpen: boolean = false
  articleModalOpen: boolean = false
  selectedArticle: Article | null = null
  // selectedArticle: {title: string, htmlContent: Event | undefined, index: number | null, image: string | ArrayBuffer | null} = {title: '', htmlContent: undefined, index: null, image: null}
  currentArticleIndex: number | null = null

  ngOnInit() {
    this.currentBlogTitle = localStorage.getItem("blogTitle") ?? "My blog title"
    this.currentAuthorName = localStorage.getItem("authorName") ?? "John Doe"
    const storageBanner = localStorage.getItem('bannerImage')
    if (storageBanner) {
      this.bannerImage = JSON.parse(storageBanner)
    }
  }

  toggleArticleForm(arg: {state: boolean, article?: Article}) {
    this.selectedArticle = arg.article ?? null
    this.articleOpen = arg.state
  }

  // toggleArticleForm(arg: {state: boolean, article ?: {title: string, htmlContent: Event | undefined, index: number, image: string | ArrayBuffer | null}} ) {
  //   if (arg.article) {
  //     this.selectedArticle.title = arg.article.title
  //     this.selectedArticle.index = arg.article.index
  //     this.selectedArticle.htmlContent = arg.article.htmlContent
  //     this.selectedArticle.image = arg.article.image
  //     this.articleOpen = arg.state
  //     return
  //   }

  //   this.selectedArticle.title = ''
  //   this.selectedArticle.htmlContent = undefined
  //   this.selectedArticle.index = null
  //   this.selectedArticle.image = null
  //   this.articleOpen = arg.state
  // }

  toggleAboutModal(state: boolean) {
    this.aboutModalOpen = state
  }

  toggleSettingsModal(state: boolean) {
    this.settingsModalOpen = state
  }

  toggleArticleModal(arg: {state: boolean, index?: number}) {
    this.articleModalOpen = arg.state
    this.currentArticleIndex = (arg.index || arg.index === 0) ? arg.index : null
  }

  setCurrentBlogTitle(title: string) {
    this.currentBlogTitle = title
    localStorage.setItem("blogTitle", this.currentBlogTitle)
  }

  setCurrentAuthorName(name: string) {
    this.currentAuthorName = name
    localStorage.setItem("authorName", this.currentAuthorName)
  }

  setBannerImage(image: ArrayBuffer) {
    this.bannerImage = image
    localStorage.setItem('bannerImage', JSON.stringify(image))
  }

}
