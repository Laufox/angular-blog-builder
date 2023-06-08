import { Component } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  articles: Article[] = []
  articleFormOpen: boolean = false

  // Stuff thats happen on component startup
  ngOnInit(): void {
    // Try to get values from localstorgae
    const storageArticles = localStorage.getItem('articles')

    // If no values found from localstorage, return early
    if (!storageArticles) {
      return
    }
    
    // Turn storage value into a proper array and assign it to articles state
    const parsedArticles = JSON.parse(storageArticles)
    this.articles = parsedArticles
  }

  // Push new article to array and update localstorage
  addArticle(article: Article): void {
    this.articles.push(article)
    localStorage.setItem("articles",JSON.stringify(this.articles))
  }

  // Delete a specific article from array and update localstorage
  removeArticle(index: number): void {
    this.articles.splice(index, 1)
    localStorage.setItem("articles", JSON.stringify(this.articles))
  }

  // Open modal for adding new article
  openArticleForm(): void {
    this.articleFormOpen = true
  }

  // Close modal for adding new article
  closeArticleForm(): void {
    this.articleFormOpen = false
  }
}

/**
 * addArticle({
                title: 'My new blog post',
                date: '23-06-08',
                author: 'John Doe',
                body: 'Lorem ipsum dolor sit amet'
            })
 */
