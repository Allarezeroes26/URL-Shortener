const form = document.querySelector('#shortenForm');
const result = document.querySelector('#result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let url = document.getElementById('urlInput').value.trim();
  if (!url) {
    result.innerHTML = "Error: Please enter a URL.";
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  result.innerHTML = 'Shortener doing its magic!!!';

  try {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    console.log('API response', data);

    if (data.shortUrl) {
      form.innerHTML = `
        <div class="shorteningResult">
          <input type="text" value="${data.shortUrl}" id="shortUrlInput" readonly>
          <button id="copyBtn" type="button"><i class="fa-solid fa-copy"></i></button>
        </div>
      `;

      const copyBtn = document.getElementById('copyBtn');
      const shortInput = document.getElementById('shortUrlInput');

      copyBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shortInput.value);
          } else {
            shortInput.select();
            shortInput.setSelectionRange(0, 99999);
            document.execCommand('copy');
          }

          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
          }, 1500);
        } catch (err) {
          console.error('Copy failed:', err);
          alert('Failed to copy link');
        }
      });
    } else {
      result.innerHTML = `Error: ${data.error || 'Failed to shorten URL'}`;
    }
  } catch (err) {
    console.error(err);
    result.innerHTML = `Error: Failed to shorten URL`;
  }
});
