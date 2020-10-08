const formSubmit = document.querySelector('form')
const url = document.querySelector('#url')
const shorturl = document.querySelector('#shorturl')
const loading = document.querySelector('#loading')

formSubmit.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = { url: url.value }
  loading.textContent = 'Loading...'
  shorturl.textContent = ''

  const res = await fetch('/urlshortener', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const hashedData = await res.json()

  shorturl.textContent = `${window.location.origin}/${hashedData.hashed}`
  loading.textContent = ''
  url.value = ''
})
