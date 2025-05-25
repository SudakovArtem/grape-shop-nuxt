export namespace Article {
  export interface Model {
    id: number
    title: string
    content: string
    imageUrl: string
    slug: string
    authorId: number
    categoryId: number
    published: boolean
    createdAt: string
    updatedAt: string
    authorName: string
    categoryName: string
  }
}
