document.addEventListener('DOMContentLoaded', () => {
  const hideVotesToggle = document.getElementById('hide-votes');
  const hideAdsToggle = document.getElementById('hide-ads');

  // Load saved settings
  browser.storage.local.get(['hideVotes', 'hideAds']).then((data) => {
    hideVotesToggle.checked = data.hideVotes ?? true;  // Default to true if no saved data
    hideAdsToggle.checked = data.hideAds ?? false;      // Default to true if no saved data
  });

  // Save settings immediately on toggle change
  const saveSettings = () => {
    browser.storage.local.set({
      hideVotes: hideVotesToggle.checked,
      hideAds: hideAdsToggle.checked
    });
  };

  hideVotesToggle.addEventListener('change', saveSettings);
  hideAdsToggle.addEventListener('change', saveSettings);
});