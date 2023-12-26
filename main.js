document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('search').value.trim();
    if (username !== '') {
      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('User not found');
          }
        })
        .then(data => {
          displayUser(data);
          document.getElementById('notFoundCard').style.display = 'none';
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          document.getElementById('userCard').style.display = 'none';
          document.getElementById('notFoundCard').style.display = 'block';
        });
    }
  });
  
  function displayUser(user) {
    const userCard = document.getElementById('userCard');
    const {
      avatar_url,
      name,
      bio,
      followers,
      following,
      public_repos,
      twitter_username,
      location
    } = user;
  
    if (user) {
      document.getElementById('avatar').src = avatar_url;
      document.getElementById('name').textContent = name || 'Name not available';
      document.getElementById('bio').textContent = bio || 'No bio provided';
      document.getElementById('followersCount').textContent = followers;
      document.getElementById('followingCount').textContent = following;
      document.getElementById('repoCount').textContent = public_repos;
      document.getElementById('twitterUsername').textContent = twitter_username || 'Not provided';
      document.getElementById('location').textContent = location || 'Not provided';
      userCard.style.display = 'block';
    } else {
      userCard.style.display = 'none';
    }
  }
  