export default async function fetcher(url: string): Promise<any> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Failed to load data.')
    }
    return await res.json()
  } catch (e) {
    console.error(e)
    throw e
  }
}
