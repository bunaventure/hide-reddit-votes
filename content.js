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
            // Remove "Vote" text node (the placeholder text)
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
            // Handled differently depending if the award button belongs to a post or a comment
            const awardButton = host.shadowRoot.querySelector('award-button');
            const awardButtonComments = document.querySelector('award-button');
            if (awardButton) awardButton.remove();
            if (awardButtonComments) awardButtonComments.remove();
        }
    }
    });
}

function hideAds() {
    // Hide ads / promoted posts
	const adElements = document.querySelectorAll('shreddit-ad-post, shreddit-comment-tree-ad, shreddit-comments-page-ad');
	adElements.forEach(el => el.remove());
}


// TODO: add this as an option
/*
function hideEverything() {
    // Hide ads, and the entire action bar under posts and comments
    document.querySelectorAll('*').forEach(host => {
    if (host.shadowRoot) {
        const postActionBar = host.shadowRoot.querySelector('[class*="shreddit-post-container"]');
        if (postActionBar) postActionBar.remove();

        const commentActionBar = document.querySelector('shreddit-comment-action-row');
        if (commentActionBar) commentActionBar.remove();

    }
}
*/

browser.storage.local.get({
    hideVotes: true, // Default is on
    hideDownvotes: false, // Default is off
    hideComments: false, // Default is off
    hideAwards: false, // Default is off
    hideAds: false,    // Default is off
    masterToggle: true  // Default is on
}).then((data) => {
    if (!data.masterToggle) return;

    const observerVotes = new MutationObserver(() => hideVotes(data.hideVotes, data.hideDownvotes, data.hideComments, data.hideAwards));
    observerVotes.observe(document.body, { childList: true, subtree: true });
    if (data.hideAds) {
        const observerAds = new MutationObserver(() => hideAds());
        observerAds.observe(document.body, { childList: true, subtree: true });
    }
});
