
export default defineEventHandler(async (event) => {
  // Получаем query параметры
  const query = getQuery(event)
  
  // Временные данные для демонстрации
  const mockProducts = [
    {
      id: 1,
      name: "Виноград Кишмиш",
      description: "Сладкий сорт без косточек",
      cuttingPrice: 150,
      seedlingPrice: 300,
      categoryId: 1,
      categoryName: "Столовые сорта",
      variety: "Кишмиш",
      maturationPeriod: "Ранний",
      berryShape: "Овальная",
      color: "Зеленый",
      taste: "Сладкий",
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: []
    },
    {
      id: 2,
      name: "Виноград Изабелла",
      description: "Популярный технический сорт",
      cuttingPrice: 120,
      seedlingPrice: 250,
      categoryId: 2,
      categoryName: "Технические сорта",
      variety: "Изабелла",
      maturationPeriod: "Поздний",
      berryShape: "Круглая",
      color: "Синий",
      taste: "Простой",
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: []
    }
  ]

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const total = mockProducts.length

  return {
    data: mockProducts.slice((page - 1) * limit, page * limit),
    meta: {
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit)
    }
  }
})
