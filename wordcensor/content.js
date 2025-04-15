(function () {
  function censorWords() {
    const targetWords = ['employment', 'job', 'employer', 'occupation', 'work'];
    const textNodes = [];

    // Find all text nodes in the body of the HTML document
    function findTextNodes(element) {
      if (element.nodeType === Node.TEXT_NODE) {
        if (element.textContent.trim() !== '') {
          textNodes.push(element);
        }
      } else {
        for (let i = 0; i < element.childNodes.length; i++) {
          findTextNodes(element.childNodes[i]);
        }
      }
    }
    findTextNodes(document.body);

    // Replace words in each text node
    textNodes.forEach((node) => {
      let content = node.textContent;
      let modified = false;

      targetWords.forEach((word) => {
        const regex = new RegExp(`\\b\\w*${word}\\w*\\b`, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, '****');
          modified = true;
        }
      });

      if (modified) {
        node.textContent = content;
      }
    });
  }

  // 2) Kickoff the censoring by running the censorWords function
  censorWords();

  //3)  Also run when the DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        censorWords();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log('😈 saving you from employment one word a way 😈');
})();
