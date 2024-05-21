export const convertTextToArr = (text: string) => (
  text.split(' ')
)

export const prepareWordToTranslate = (text: any) => {
  const regexForSingleWord = /[-!.,?/]/g;

  const preparedText = !!text
    ? text
      .replace(regexForSingleWord, '')
      .toLowerCase()
    : '';

  return preparedText;
}
