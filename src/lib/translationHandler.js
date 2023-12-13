function translationHandler(translation) {

    let _translation = translation;

    //处理中文翻译
    _translation.translation = _translation.translation.split('\\n');
    for (let i = 0; i < _translation.translation.length; i++) {
        if (_translation.translation[i].includes('.')) {
            _translation.translation[i] = _translation.translation[i].split('.');
        } else {
            _translation.translation[i] = _translation.translation[i].split('.');
            _translation.translation[i].unshift(null);
        }

    }

    //处理标签
    if (_translation.tag) {
        const tags = _translation.tag.split(' ');
        for (let i = 0; i < tags.length; i++) {
            switch (tags[i]) {
                case 'zk': {
                    tags[i] = '中考';
                    break;
                }
                case 'gk': {
                    tags[i] = '高考';
                    break;
                }
                case 'cet4': {
                    tags[i] = '4级';
                    break;
                }
                case 'cet6': {
                    tags[i] = '6级';
                    break;
                }
                case 'ky': {
                    tags[i] = '考研';
                    break;
                }
                case 'ielts': {
                    tags[i] = '雅思';
                    break;
                }
                case 'toefl': {
                    tags[i] = '托福';
                    break;
                }
                case 'gre': {
                    tags[i] = 'GRE';
                    break;
                }
                default: { }
            }
        }
        _translation.tag = tags;
    }

    //处理词形变化
    if (_translation.exchange) {
        _translation.exchange = _translation.exchange.split('/');
        for (let i = 0; i < _translation.exchange.length; i++) {
            _translation.exchange[i] = _translation.exchange[i].split(':');
            switch (_translation.exchange[i][0]) {
                case 'p': {
                    _translation.exchange[i][0] = '过去式';
                    break;
                }
                case 'd': {
                    _translation.exchange[i][0] = '过去分词';
                    break;
                }
                case 'i': {
                    _translation.exchange[i][0] = '现在分词';
                    break;
                }
                case '3': {
                    _translation.exchange[i][0] = '第三人称单数';
                    break;
                }
                case 'r': {
                    _translation.exchange[i][0] = '比较级';
                    break;
                }
                case 't': {
                    _translation.exchange[i][0] = '最高级';
                    break;
                }
                case 's': {
                    _translation.exchange[i][0] = '复数形式';
                    break;
                }
                case '0': {
                    _translation.exchange[i][0] = '词元';
                    break;
                }
                case '1': {
                    _translation.exchange[i][0] = null;
                    break;
                }
                default: {
                    _translation.exchange[i][0] = '变体';
                }
            }
        }
    }

    return _translation
}

export { translationHandler }