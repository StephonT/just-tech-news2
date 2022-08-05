async function upvoteClickHandler(event) {
    event.preventDefault();

    //Need post_id and user_id for the PUT request for an upvote to go through. user_id is available on the session on the back end. Below code is how you find the post_id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
      const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);