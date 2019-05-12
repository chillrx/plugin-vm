function PluginVM() {

    this.onInit = function () {
        const button = document.createElement('button'),
            div = document.createElement('div');

        button.innerHTML = "Executar plugin";

        button.addEventListener("click", PluginVM.makeChanges);

        button.className += "btn btn-danger";

        button.setAttribute("id", "buttonPluginVM");

        button.style.position = "fixed";
        button.style.zIndex = "2";
        button.style.bottom = "10px";
        button.style.fontFamily = "Arial";

        div.style.width = "100%";
        div.style.display = "flex";
        div.style.justifyContent = "center";

        document.body.appendChild(div);
        div.appendChild(button);
    }

    this.makeChanges = function () {
        var aux, temp, filterFunction, filteredTree, textNodes = [];

        filterFunction = function (node) {
            return (node.nodeType === 3 && node.textContent.trim() !== '' && node.parentNode.id != 'buttonPluginVM') || node.tagName == "IMG" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        };

        temp = /MSIE|Trident/.test(navigator.userAgent) ? filterFunction : {
            acceptNode: filterFunction
        };

        filteredTree = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, temp, false);

        while (aux = filteredTree.nextNode())
            textNodes[textNodes.length] = aux;

        for (var nodesLength = textNodes.length, i = 0; i < nodesLength; i++) {
            const element = textNodes[i];

            setFontSizeAndFamily(element.parentNode);

            setHighlightsInLinks(element.parentNode);

            setHighlightsInImages(element);
        }

    }

    function setFontSizeAndFamily(element) {
        element.style.setProperty('font-size', parseFloat(getComputedStyle(element).fontSize) * 1.2 + 'px');
        element.style.setProperty('font-family', 'Arial');
    }

    function setHighlightsInLinks(element) {
        if (element.tagName === 'A') {
            element.style.setProperty('background-color', '#FFE599');
            element.style.setProperty('text-decoration', 'underline');
            element.style.setProperty('font-style', 'italic');
        }
    }

    function setHighlightsInImages(element) {
        if (element.tagName == "IMG" && !element.getAttribute('alt'))
            element.style.setProperty('border', '5px dotted red');
    }

}

var PluginVM = new PluginVM();

PluginVM.onInit();