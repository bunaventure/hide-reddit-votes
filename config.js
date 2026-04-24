document.addEventListener('DOMContentLoaded', () => {
  const hideVotesToggle = document.getElementById('hide-votes');
  const hideDownvotesContainer = document.querySelector('.hide-downvotes-container');
  const hideDownvotesToggle = document.getElementById('hide-downvotes');
  const hideAdsToggle = document.getElementById('hide-ads');

  // Load saved settings
  browser.storage.local.get(['hideVotes', 'hideAds', 'hideDownvotes']).then((data) => {
    hideVotesToggle.checked = data.hideVotes ?? true;      // Default to true if no saved data
	hideDownvotesToggle.checked = data.hideDownvotes ?? false; // Default to false if no saved data
    hideAdsToggle.checked = data.hideAds ?? false;        // Default to false if no saved data

    // Show/hide the hideDownvotes container based on the saved state
    hideDownvotesContainer.style.display = hideVotesToggle.checked ? 'block' : 'none';
  });

  // Save settings immediately on toggle change
  const saveSettings = () => {
    browser.storage.local.set({
      hideVotes: hideVotesToggle.checked,
	  hideDownvotes: hideDownvotesToggle.checked,
      hideAds: hideAdsToggle.checked
    });
  };

  // Show/hide the hideDownvotes container when Hide Votes is toggled
  hideVotesToggle.addEventListener('change', () => {
    hideDownvotesContainer.style.display = hideVotesToggle.checked ? 'block' : 'none';
    saveSettings();
  });

  hideAdsToggle.addEventListener('change', saveSettings);
  hideDownvotesToggle.addEventListener('change', saveSettings);
});
