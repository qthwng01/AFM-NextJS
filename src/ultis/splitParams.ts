export const SplitParams = (params: string) => {
  const temp = params?.split('.html') ?? []
  const nextTemp = (temp[0]?.split('-') ?? []) as string[]
  const getId = nextTemp[nextTemp.length - 1]
  return getId
}
