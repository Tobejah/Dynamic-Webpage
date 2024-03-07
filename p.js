const fetchPost = async () => {
    try {
        const postResponse = await fetch(`https://dummyjson.com/posts`);
        const postData = await postResponse.json();

        // Iterate over each post
        for (const post of postData.posts) {
            const userSection = await userPost(post.userId); 

            const postCard = document.createElement('div');
            postCard.className = 'post-card';


        
            const username = document.createElement('div');
            username.className = 'username';
            username.appendChild(userSection); // Append user details to username div

            const userTitle = document.createElement('div');
            userTitle.className = 'userTitle';
            userTitle.innerHTML = `<p>Title: ${post.title}</p>`;

            const userBody = document.createElement('div');
            userBody.className = 'userBody';
            userBody.innerHTML = `<p>Body: ${post.body}</p>`;

            const userTag = document.createElement('div');
            userTag.className = 'userTag';
            userTag.innerHTML = `<p>Tag: ${post.tags.join(', ')}</p>`;

            const userReaction = document.createElement('div');
            userReaction.className = 'userReaction';
            userReaction.innerHTML = `<p>Reaction: ${post.reactions}</p>`;

            const commentSection = await fetchComment(post.id); // Fetch comments for the post

            // Append elements to postCard
            postCard.appendChild(username);
            postCard.appendChild(userTitle);
            postCard.appendChild(userBody);
            postCard.appendChild(userTag);
            postCard.appendChild(userReaction);
            postCard.appendChild(commentSection);

            // Append postCard to the 'user-post' container in your HTML
            const postsContainer = document.getElementById('post-information');
            postsContainer.appendChild(postCard);
        }
    } catch (error) {
        console.error(error);
    }
};

const userPost = async (userId) => {
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
        const userData = await userResponse.json();

        // Create a container for the user's details
        const userDiv = document.createElement('div');
        userDiv.className = 'user-div'; 

        
        const tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'tooltip';
        tooltipDiv.innerHTML = 
        `<strong>${userData.firstName} ${userData.lastName}</strong><br>
            Email: ${userData.email}<br>
            Phone: ${userData.phone}`
        ;
        tooltipDiv.style.display = 'none'; 

        // Create a div for the username that will show the tooltip on hover
        const usernameDiv = document.createElement('div');
        usernameDiv.className = 'username';
        usernameDiv.textContent = userData.username;

       
        usernameDiv.addEventListener('mouseenter', () => {
            tooltipDiv.style.display = 'block';
        });

        
        usernameDiv.addEventListener('mouseleave', () => {
            tooltipDiv.style.display = 'none';
        });

        userDiv.appendChild(usernameDiv);
        userDiv.appendChild(tooltipDiv);

        return userDiv;
    } catch (error) {
        console.error(error);
        return document.createElement('div'); // Return an empty div in case of error
    }
};



const fetchComment = async (postId) => {
    const commentSection = document.createElement('div');
    commentSection.className = 'commentSection';

    try {
        const commentResponse = await fetch(`https://dummyjson.com/comments/post/${postId}`);
        const commentData = await commentResponse.json();

        commentData.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<p>${comment.user.username}: ${comment.body}</p>`; 
            commentSection.appendChild(commentDiv);
        });
    } catch (error) {
        console.error(error);
    }

    return commentSection;
};


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Validate inputs
        const firstName = document.getElementById('firstname').value.trim();
        const lastName = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!firstName || !lastName || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

       
        alert('Form submitted successfully!');
        form.reset(); 
    });
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});


fetchPost();