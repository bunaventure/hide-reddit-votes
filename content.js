function hideVotes() {
  // Find all host elements that might contain the shadow DOM
  document.querySelectorAll('*').forEach(host => {
    if (host.shadowRoot) {
      // Look for 'shreddit-vote-animations' within each shadow DOM
      const container = host.shadowRoot.querySelector('shreddit-vote-animations');
      if (container) {
        // Hide downvote button
		const downvoteButton = container.querySelector('button[downvote]');
		if (downvoteButton) downvoteButton.remove();
        // Hide vote number
		const voteNumber = container.querySelector('faceplate-number');
		if (voteNumber) voteNumber.style.display = 'none';
        // Remove "Vote" text node
		const voteTextSpan = container.querySelector('span[data-post-click-location="vote"]');
		if (voteTextSpan) {
		  for (const node of voteTextSpan.childNodes) {
		    if (node.nodeType === Node.TEXT_NODE) {
			  node.remove();
			  break; // Stop after removing the first text node
			}
		  }
		}
      }
    }
  });
}

function hideAds() {
	// Hide promoted posts 
	const adElements = document.querySelectorAll('shreddit-ad-post');
	adElements.forEach(el => el.remove());
}

browser.storage.local.get({
  hideVotes: true, // Default is on
  hideAds: false    // Default is off
}).then((data) => {
  if (data.hideVotes) {
    const observerVotes = new MutationObserver(() => hideVotes());
    observerVotes.observe(document.body, { childList: true, subtree: true });
  }
  if (data.hideAds) {
    const observerAds = new MutationObserver(() => hideAds());
    observerAds.observe(document.body, { childList: true, subtree: true });
  }
});
