export class RenderData {
    /**
     * @type {string[]}
     */
    data = [];
    /**
     * @private
     */
    _index = 0;

    constructor(data) {
        if (typeof data === 'string') data = data.split('\n');
        this.data = data;
    }

    next() {
        if (this._index >= this.data.length) return '';
        return this.data[this._index++];
    }

    hasNext() {
        if (this._index >= this.data.length) return false;
        return true;
    }
}

/**
 * @param {string} text
 * @param {number} width
 * @returns {string}
 */
export function center(text, width) {
    width = Math.round(width)
    text = text.trim();
    let l = text.length;
    let w2 = Math.floor(width / 2);
    let l2 = Math.floor(l / 2);
    let s = new Array(w2 - l2 + 1).join(' ');
    text = s + text + s;
    if (text.length < width) {
        text += new Array(width - text.length + 1).join(' ');
    }
    return text;
}
