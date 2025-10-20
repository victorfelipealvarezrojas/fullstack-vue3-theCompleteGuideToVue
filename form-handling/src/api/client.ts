export const apiClient = {
  count: 1,

  loadItems(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('items') || '[]'
        resolve(JSON.parse(stored))
      }, 1000)
    })
  },

  saveItems(items: string[]): Promise<{ success: boolean }> {
    const success = !!(this.count++ % 2)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success })
        localStorage.setItem('items', JSON.stringify(items))
        resolve({ success })
      }, 1000)
    })
  },
}
