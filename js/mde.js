/**
 * Created by go on 2014/07/19.
 */
;'use strict';


/**
 * Mde(MarkDownEditor) is attached TextArea Element to implemented Markdown Util
 * @param id {String} TextArea Element Id
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
 * This method is inserted Top Level Heading to Selected Text Head
 */
Mde.prototype.insertHeading1 = function(){

    this._insertHeading(1);

}

/**
 * This method is inserted Level2Heading to Selected Text Head
 */
Mde.prototype.insertHeading2 = function(){

    this._insertHeading(2);

}

/**
 * This method is inserted Level3Heading to Selected Text Head
 */
Mde.prototype.insertHeading3 = function(){

    this._insertHeading(3);

}

/**
 * This method is inserted Level4Heading to Selected Text Head
 */
Mde.prototype.insertHeading4 = function(){

    this._insertHeading(4);

}

/**
 * This method is inserted Level5Heading to Selected Text Head
 */
Mde.prototype.insertHeading5 = function(){

    this._insertHeading(5);

}

/**
 * This method is inserted Level6Heading to Selected Text Head
 */
Mde.prototype.insertHeading6 = function(){

    this._insertHeading(6);

}

/**
 * This method is sandwiched between Strong Mark and selected Text
 */
Mde.prototype.clipStrong = function(){

    if (!this._isSelected()){ return; }

    this._clipText('**');

}

/**
 * This method is sandwiched between Strike Through Mark and selected Text
 */
Mde.prototype.clipStrikeThrough = function(){

    if (!this._isSelected()){ return; }

    this._clipText('~~');

}

/**
 * This method is sandwiched between Emphasis Mark and selected Text
 */
Mde.prototype.clipEmphasis = function(){

    if (!this._isSelected()){ return; }

    this._clipText('*');

}

/**
 * this method is insert Block Quotes '>' to selected line top
 */
Mde.prototype.clipBlockQuotes = function(){

    if (!this._isSelected()){ return; }

    this._insertLineTop('>');

}

/**
 * this method is insert Unordered List '*' to selected line top
 */
Mde.prototype.appendUnorderedList = function(){

    if (!this._isSelected()){ return; }

    this._insertLineTop('*');

}

/**
 * this method is insert Ordered List '1.' to selected line top
 */
Mde.prototype.appendOrderedList = function(){

    if (!this._isSelected()){ return; }

    this._insertLineTop('1.');

}

/**
 * this method is insert Horizontal Rule to next line
 */
Mde.prototype.insertHorizontalRule = function(){

    var value = this._textAreaElem.value;
    var beforeText = value.substring(0, this._selectedStart);
    var afterText = value.substring(this._selectedStart);

    this._textAreaElem.value = beforeText + this._NEW_LNE + this._NEW_LNE + '- - -' +  this._NEW_LNE + this._NEW_LNE + afterText;

}

/**
 * This method is convert selected text to Linkage Style
 */
Mde.prototype.convertLink = function(){

    if (!this._isSelected()){return;}

    this._convertLink('[@selected@](@url@)');

}

/**
 * This methods is convert selected text to Image Style
 */
Mde.prototype.insertImage = function(){

    if (!this._isSelected()){return;}

    this._convertLink('![@selected@](@url@)');

}

/**
 * 
 * @returns {boolean}
 * @private
 */
Mde.prototype._isSelected = function(){

    return (this._selectionStart() != this._selectionEnd());

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

/**
 *
 * @param clipMark {String}
 * @private
 */
Mde.prototype._clipText = function(clipMark /* String */){

    var value = this._textAreaElem.value;
    var beforeText = value.substring(0, this._selectedStart);
    var selectedText = value.substring(this._selectedStart, this._selectedEnd);
    var afterText = value.substring(this._selectedEnd);

    selectedText = ' ' + clipMark + selectedText + clipMark + ' ';
    afterText = selectedText + afterText;

    this._textAreaElem.value = beforeText + afterText;

}

/**
 *
 * @param insertMark {String}
 * @private
 */
Mde.prototype._insertLineTop = function(insertMark /* String */){

    var value = this._textAreaElem.value;
    var lines = this._split(value);
    var totalLength = 0;
    var valueStack = '';

    for (var i = 0;i < lines.length; i++){

        totalLength += lines[i].length;

        if (totalLength < this._selectedStart || totalLength - lines[i].length > this._selectedEnd) {

            valueStack += lines[i] + this._NEW_LNE;
            continue;
        }

        valueStack += insertMark + ' ' + lines[i] + this._NEW_LNE;

    }

    this._textAreaElem.value = valueStack;

}

/**
 *
 * @param linkTemplate
 * @private
 */
Mde.prototype._convertLink = function(linkTemplate /* String */){

    var value = this._textAreaElem.value;
    var beforeText = value.substring(0, this._selectedStart);
    var url = '';
    var selectedText = value.substring(this._selectedStart, this._selectedEnd);
    var afterText = value.substring(this._selectedEnd);

    url = prompt('Enter Linkage URL');

    if (url === ''){return;}

    selectedText = linkTemplate.replace('@selected@', selectedText).replace('@url@',url);

    afterText = ' ' + selectedText + ' ' + afterText;

    this._textAreaElem.value = beforeText + afterText;



}
