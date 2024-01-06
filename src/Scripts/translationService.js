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

const evaluate = async (original, translation, backTranslation, originalLang, targetLang) => {
  const response = await fetch(`${baseURL}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      listType: "single",
      sourceItems: original,
      newItems: translation,
      backtranslatedItems: backTranslation,
      sourceLang: originalLang,
      targetLang: targetLang
    })
  })
  
  const result = await response.json()
  const gemba = result.gemba
  const semantic = await JSON.parse(result.semantic)

  return {
    gemba: gemba,
    semantic: semantic
  }
}

export { translate, evaluate }