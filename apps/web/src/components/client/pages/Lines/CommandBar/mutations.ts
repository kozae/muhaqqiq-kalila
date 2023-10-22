

export const postJob = async (input: any) => {
  const response = await fetch('https://kraken.kalila-and-dimna.de/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });
  const data = await response.json();
  return data;
}