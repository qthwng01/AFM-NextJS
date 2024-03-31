import slugify from 'slugify'

export const convertSlug = (str: string) => {
  if (!str) {
    return ''
  }
  const convert = slugify(str, {
    lower: true,
    locale: 'vi',
  })
  return convert
}
