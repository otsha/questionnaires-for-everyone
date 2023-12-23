const baseURL = import.meta.env.VITE_API_URL

const translate = async (text, from, to) => {
  const response = await fetch(`${baseURL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: text,
      listType: 'single',
      sourceLang: from,
      targetLang: to
    }),
  })

  const result = await response.json()
  return result.translated
}

export { translate }