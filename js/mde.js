/**
 * Created by go on 2014/07/19.
 */
;'use strict';


/**
 *
 * @param id {String}
 * @constructor
 */
function Mde(id /* String */){

    this._selectedStart = null;
    this._selectedEnd = null;
    this._NEW_LNE = '\n';

    var textAreaElem = document.getElementById(id);
    var self = this;

    if (!textAreaElem){

        console.log('not found element :' + id);
        return;

    }

    this._textAreaElem = textAreaElem;
    this._textAreaElem.onblur = function(){
        self._selectedStart = self._selectionStart();
        self._selectedEnd = self._selectionEnd();
    }

}

/**
 *
 */
Mde.prototype.insertHeading1 = function(){

    this._insertHeading(1);

}

/**
 *
 */
Mde.prototype.insertHeading2 = function(){

    this._insertHeading(2);

}

/**
 *
 */
Mde.prototype.insertHeading3 = function(){

    this._insertHeading(3);

}

/**
 *
 */
Mde.prototype.insertHeading4 = function(){

    this._insertHeading(4);

}

/**
 *
 */
Mde.prototype.insertHeading5 = function(){

    this._insertHeading(5);

}

/**
 *
 */
Mde.prototype.insertHeading6 = function(){

    this._insertHeading(6);

}

/**
 *
 */
Mde.prototype.clipStrong = function(){

}

/**
 *
 */
Mde.prototype.clipStrikeThrough = function(){

}

/**
 *
 */
Mde.prototype.clipEmphasis = function(){

}

/**
 *
 */
Mde.prototype.clipBlockQuotes = function(){


}

/**
 *
 */
Mde.prototype.appendUnorderedList = function(){

}

/**
 *
 */
Mde.prototype.appendOrderedList = function(){

}

/**
 *
 */
Mde.prototype.insertHorizontalRule = function(){

}

/**
 *
 */
Mde.prototype.convertLink = function(){

}

/**
 *
 */
Mde.prototype.insertImage = function(){

}

/**
 *
 * @returns {boolean}
 * @private
 */
Mde.prototype._isSelected = function(){

    return (this._textAreaElem.selectionStart != this._textAreaElem.selectionEnd);

}

/**
 *
 * @returns {Number}
 * @private
 */
Mde.prototype._selectionStart = function(){

    return this._textAreaElem.selectionStart;

}

/**
 *
 * @returns {Number}
 * @private
 */
Mde.prototype._selectionEnd = function(){

    return this._textAreaElem.selectionEnd;

}

/**
 *
 * @param headingLevel
 * @private
 */
Mde.prototype._insertHeading = function(headingLevel /* Number */){

    var headingMark = this._getHeadingMark(headingLevel);
    var value = this._textAreaElem.value;
    var beforeText = value.substring(0, this._selectedStart);
    var selectedText = '';
    var afterText = '';

    if (this._isSelected()){

        selectedText = value.substring(this._selectedStart, this._selectedEnd);
        afterText = value.substring(this._selectedEnd);
        selectedText = this._NEW_LNE + headingMark + ' ' + selectedText;
        afterText = selectedText + this._NEW_LNE + afterText;

    }else{

        afterText = value.substring(this._selectedStart);

        if (afterText === ''){ return; }

        afterText = this._NEW_LNE + headingMark + ' ' + afterText;
    }

    this._textAreaElem.value = beforeText + afterText;

}

/**
 *
 * @param headingLevel {Number}
 * @returns {string}
 * @private
 */
Mde.prototype._getHeadingMark = function(headingLevel /* Number */){

    var headingMark = '';
    var i;
    for (i = 0; i < headingLevel; i++){
        headingMark += '#';
    }

    return headingMark;
}

/**
 *
 * @param value
 * @returns {Array}
 * @private
 */
Mde.prototype._split = function(value /* String */){

    value = value.replace(/\r\n/g, '\n');
    value = value.replace(/\r/g, '\n');

    return value.split('\n');

}
