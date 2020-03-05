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

    const mainContent = document.getElementById('page-main-content');

    if (!mainContent && isArticlePage()) {
      console.warn('mainContent not found – retrying in 500ms');
      setTimeout(() => {
        console.log('now retrying');
        addCommentsIframe();
      }, 500);
    } else {
      mainContent.insertAdjacentHTML(
        'afterend',
        '<div id="clean-me-up" class="mb-16 mt-16"><iframe class="w-full bg-white border-b p-16" src="' +
          iframeUrl +
          '" id="comments-on-top" scrolling="no" onload="window.iFrameResize({}, \'#comments-on-top\');"></iframe></div>'
      );
    }
  }
};

window.addEventListener('content-loaded', addCommentsIframe);

addCommentsIframe();
