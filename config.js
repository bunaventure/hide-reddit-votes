document.addEventListener('DOMContentLoaded', () => {
    const hideVotesToggle = document.getElementById('hide-votes');
    const hideDownvotesContainer = document.querySelector('.hide-downvotes-container');
    const hideDownvotesToggle = document.getElementById('hide-downvotes');
    const hideCommentsToggle = document.getElementById('hide-comments');
    const hideAwardsToggle = document.getElementById('hide-awards');
    const hideAdsToggle = document.getElementById('hide-ads');
    const masterToggle = document.getElementById('master-toggle');
    const powerText = document.querySelector('.power-button-text');
    const container = document.querySelector('.container');

    const updatePowerUI = () => {
        container.classList.toggle('master-disabled', !masterToggle.checked);
    };

    // Load saved settings
    browser.storage.local.get(['hideVotes', 'hideAds', 'hideDownvotes', 'hideComments', 'hideAwards', 'masterToggle']).then((data) => {
        hideVotesToggle.checked = data.hideVotes ?? true; // Default to true if no saved data
        hideDownvotesToggle.checked = data.hideDownvotes ?? false; // Default to false if no saved data
        hideCommentsToggle.checked = data.hideComments ?? false; // Default to false if no saved data
        hideAwardsToggle.checked = data.hideAwards ?? false; // Default to false if no saved data
        hideAdsToggle.checked = data.hideAds ?? false; // Default to false if no saved data
        masterToggle.checked = data.masterToggle ?? true; // Default to true if no saved data
        updatePowerUI();

    // Show/hide the hideDownvotes container based on the saved state
    hideDownvotesContainer.style.display = hideVotesToggle.checked ? 'block' : 'none';
    });

    // Save settings immediately on toggle change
    const saveSettings = () => {
        browser.storage.local.set({
        hideVotes: hideVotesToggle.checked,
        hideDownvotes: hideDownvotesToggle.checked,
        hideComments: hideCommentsToggle.checked,
        hideAwards: hideAwardsToggle.checked,
        hideAds: hideAdsToggle.checked,
        masterToggle: masterToggle.checked
        });
    };

    // Show/hide the hideDownvotes container when Hide Votes is toggled
    hideVotesToggle.addEventListener('change', () => {
        hideDownvotesContainer.style.display = hideVotesToggle.checked ? 'block' : 'none';
        saveSettings();
    });

    hideAdsToggle.addEventListener('change', saveSettings);
    hideDownvotesToggle.addEventListener('change', saveSettings);
    hideCommentsToggle.addEventListener('change', saveSettings);
    hideAwardsToggle.addEventListener('change', saveSettings);
    masterToggle.addEventListener('change', () => {
        saveSettings();
        updatePowerUI();
    });
});
