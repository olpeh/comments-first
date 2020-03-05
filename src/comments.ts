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

    console.log('Comments first started!', isArticlePage(), {
      articleId,
      iframeUrl
    });

    const mainContent = document.getElementById('page-main-content');

    mainContent.insertAdjacentHTML(
      'afterend',
      '<div id="clean-me-up" class="mb-16 bg-white border-b p-16 lg:px-32"><iframe class="w-full" src="' +
        iframeUrl +
        '" id="comments-on-top" scrolling="no" onload="window.iFrameResize({ log: true }, \'#comments-on-top\');"></iframe></div>'
    );
  }
};

(window as any).tryToResizeThisIframe = function() {
  if ((window as any).iFrameResize) {
    console.log('trying to iframe-resize');
    window as any;
  }
};

window.addEventListener('content-loaded', addCommentsIframe);

addCommentsIframe();
