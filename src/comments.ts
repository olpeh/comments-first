console.log('Comments first started!');

const inboxSendBtn = document.querySelector('[jsaction="compose2.send"]');
const inboxToReceivers = document.querySelectorAll(
  '[jsaction^="mousedown:compose"][jsaction*="chip_mousedown"]'
);

console.log({ inboxSendBtn, inboxToReceivers });
if (inboxSendBtn) {
  inboxSendBtn.addEventListener('click', (e) => {
    console.log(e, 'Clickedy click');
    inboxToReceivers.forEach((receiver) =>
      console.log({ receiver }, receiver['email'])
    );
  });
}

// Does not work because GMAIL is doing ugly stuff
document.addEventListener('click', (e) => {
  console.log(e.target, 'event captured');
  e.preventDefault();
  e.stopPropagation();
});

document.body.style.border = '5px solid red';
