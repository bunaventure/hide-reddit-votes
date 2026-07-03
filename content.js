function hideVotes(hideVotes, hideDownvotes, hideComments, hideAwards) {
    // Find all host elements that might contain the shadow DOM
    document.querySelectorAll('*').forEach(host => {
    if (host.shadowRoot) {
        // Look for 'shreddit-vote-animations' within each shadow DOM
        const container = host.shadowRoot.querySelector('shreddit-vote-animations');
        if (container && hideVotes) {
            // Hide downvote button (if chosen)
            if (hideDownvotes) {
                const downvoteButton = container.querySelector('button[downvote]');
                if (downvoteButton) downvoteButton.remove();
            }
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
        // Hide comments button (if chosen)
        if (hideComments) {
            const commentsButton = host.shadowRoot.querySelector('a[data-post-click-location="comments-button"]');
            if (commentsButton) commentsButton.remove();
        }
        // Hide award button (if chosen)
        if (hideAwards) {
            const awardButton = host.shadowRoot.querySelector('award-button');
            if (awardButton) awardButton.remove();
        }
    }
    });
}

function hideAds() {
    // Hide promoted posts 
	const adElements = document.querySelectorAll('shreddit-ad-post, shreddit-comment-tree-ad');
	adElements.forEach(el => el.remove());
}

browser.storage.local.get({
    hideVotes: true, // Default is on
    hideDownvotes: false, // Default is off
    hideComments: false, // Default is off
    hideAwards: false, // Default is off
    hideAds: false    // Default is off
}).then((data) => {
    const observerVotes = new MutationObserver(() => hideVotes(data.hideVotes, data.hideDownvotes, data.hideComments, data.hideAwards));
    observerVotes.observe(document.body, { childList: true, subtree: true });
    if (data.hideAds) {
        const observerAds = new MutationObserver(() => hideAds());
        observerAds.observe(document.body, { childList: true, subtree: true });
    }
});
