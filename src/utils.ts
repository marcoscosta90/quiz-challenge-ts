export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

  export const createMarkup = (text: any) => {
    return { __html: text };
  };
