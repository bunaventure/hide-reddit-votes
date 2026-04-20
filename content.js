function hideVotes() {
  // Find all host elements that might contain the shadow DOM
  document.querySelectorAll('*').forEach(host => {
    if (host.shadowRoot) {
      // Look for 'shreddit-vote-animations' within each shadow DOM
      const container = host.shadowRoot.querySelector('shreddit-vote-animations');
      if (container) {
        // Hide downvote buttons within the container
        container.querySelectorAll('button[downvote]').forEach(button => {
          button.remove();
        });
        // Hide vote numbers within the container
        container.querySelectorAll('faceplate-number').forEach(el => {
          el.style.display = 'none';
        });
        // Remove "Vote" text nodes within the container
        container.querySelectorAll('span[data-post-click-location="vote"]').forEach(span => {
          Array.from(span.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "Vote") {
              node.remove();
            }
          });
        });
      }
    }
  });
}

const observerVotes = new MutationObserver(() => hideVotes());
observerVotes.observe(document.body, { childList: true, subtree: true });