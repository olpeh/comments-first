const isArticlePage = () => document.location.pathname.includes('/art-');

const resolveId = (path: string) =>
  path.substring(path.lastIndexOf('art-') + 4, path.lastIndexOf('.html'));

const addCommentsIframe = () => {
  // Clean up our previous mess
  const previousMess = document.getElementById('clean-me-up');
  if (previousMess) {
    previousMess.remove();
  }

  if (isArticlePage()) {
    const articleId = resolveId(document.location.pathname);
    const iframeUrl = `https://${document.location.host}/iframe/comments/${articleId}`;

    let target = document.querySelector('#page-main-content ~ div h2');
    if (!target) {
      // this means the headline is probably as h1?
      target = document.querySelector('h1');
    }

    target.insertAdjacentHTML(
      'afterend',
      '<div id="clean-me-up" class="m-auto max-w-wide mb-16"><iframe class="w-full bg-white p-16" src="' +
        iframeUrl +
        '" id="comments-on-top" scrolling="no" onload="window.iFrameResize({}, \'#comments-on-top\');"></iframe></div>'
    );
  }
};

let currentUrl = document.location.pathname;

const callback = function() {
  if (currentUrl !== document.location.pathname) {
    currentUrl = document.location.pathname;
    setTimeout(() => {
      addCommentsIframe();
    }, 500);
  }
};

const target = document.getElementById('__next');
const observer = new MutationObserver(callback);
const config = { childList: true, subtree: true };
observer.observe(target, config);

addCommentsIframe();
