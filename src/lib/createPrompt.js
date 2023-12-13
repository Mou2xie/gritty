function createPrompt(selectionText) {
    const prompt = `
    请告诉我牛津词典中，${selectionText}这个词的中文释义和常用短语，使用json格式返回.

    key:
    1.word:该词本身
    2.partOfSpeech:该词的词性,使用词性缩写返回，例如"v."、"n."、"adj."
    3.translation:该词的汉语释义
    4.forms:该词的其他形式，例如动词形式、形成容词形式、第三人称单数形式、进行时形式、过去时形式、过去分词形式等等，以类似[{"word":"xxxxx","partOfSpeech":"verb","translation":"xxxxxx"}]的形式返回,其中partOfSpeech使用词性缩写返回，例如"v."、"n."、"adj."。
    7.phoneticSymbol:该词的音标，使用这种形式“/”包裹发音
    8.phrase:包含该词的常用短语，以牛津词典的为准，以[{phrase:xxxx,translation:xxxx}]的形式返回
    `;

    return prompt
}

export { createPrompt }