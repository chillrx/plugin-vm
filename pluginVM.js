if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

function PluginVM() {

    this.increaseFontSize20 = function (node) {
        node = node || document.body;
        for (var nodeLength = node.childNodes.length, i = 0; i < nodeLength; i++) {
            const element = node.childNodes[i];

            if (element.nodeType === 3 && element.textContent.trim() !== '')
                element.parentNode.style.setProperty('font-size', parseFloat(getComputedStyle(element.parentNode).fontSize) * 1.2 + 'px');

            this.increaseFontSize20(element);
        }
    }

}

var PluginVM = new PluginVM();