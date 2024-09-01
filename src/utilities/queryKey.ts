export const createQueryKey = (
  key: string,
  params: Record<string, string | number | undefined>
) => {
  return [key, params]
}
