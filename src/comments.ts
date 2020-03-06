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
    const iframeUrl = `/iframe/comments/${articleId}`;

    let target = document.querySelector('main article h1');
    if (!target) {
      target = document.querySelector('#page-main-content ~ div h2');
      console.log(
        'Comments first extension: Did not find article headline with first try, second try found ',
        target
      );
    }

    if (target) {
      console.log('Comments first extension: target is now ', target);
      target.insertAdjacentHTML(
        'afterend',
        '<div id="clean-me-up" class="m-auto max-w-wide mb-16"><iframe class="w-full bg-white p-16" src="' +
          iframeUrl +
          '" id="comments-on-top" scrolling="no" onload="window.iFrameResize({}, \'#comments-on-top\');"></iframe></div>'
      );

      setTimeout(() => {
        // Try to remove the normal comments from below article if it's in DOM
        const selector = `[src="${iframeUrl}"]:not(#comments-on-top)`;
        const normalComments = document.querySelector(selector);
        if (normalComments) {
          // LOL what could go wrong?
          normalComments.parentElement.parentElement.remove();
        } else {
          console.log(
            'Comments first extension: Could not hide normal comments iframe'
          );
        }
      }, 2000);
    } else {
      console.log(
        'Comments first extension: Did not know where to move comments to'
      );
    }
  }
};

let currentUrl = document.location.pathname;

const callback = function() {
  if (currentUrl !== document.location.pathname) {
    currentUrl = document.location.pathname;
    setTimeout(() => {
      addCommentsIframe();
    }, 800);
  }
};

const target = document.getElementById('__next');
const observer = new MutationObserver(callback);
const config = { childList: true, subtree: true };
observer.observe(target, config);

setTimeout(() => {
  // Wait a bit – not a bullet proof solution
  addCommentsIframe();
}, 100);
