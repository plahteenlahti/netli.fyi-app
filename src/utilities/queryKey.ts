export const createQueryKey = (
  key: string,
  params: Record<string, string | null | number | undefined>
) => {
  return [key, params]
}
