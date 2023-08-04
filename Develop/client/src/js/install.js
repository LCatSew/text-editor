const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    //To store triggered event
    window.deferredPrompt = event;

    //To show the install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // Show the install prompt
    promptEvent.prompt();

    // reset the deferred prompt variable, since prompt() can only be called once.
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log install to analytics
    console.log('J.A.T.E was installed', event);

    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});
