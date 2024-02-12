window.onload = () => {
    fetch('https://my-json-server.typicode.com/typicode/demo/posts',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            const postsContainer = document.getElementById('posts');
            
            for (let i = 0; i < result.length; i++) {
                let postContainer = document.createElement('div');
                let postParagraph = document.createElement('span');
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'x';
                deleteButton.setAttribute('onclick', `deletePost(${result[i].id})`);
                let updateButton = document.createElement('button');
                updateButton.innerHTML = 'update';
                updateButton.setAttribute('onclick', `updatePost(${result[i].id})`);
                postParagraph.innerHTML = result[i].title;
                postContainer.append(postParagraph);
                postContainer.append(updateButton);
                postContainer.append(deleteButton);
                postsContainer.append(postContainer);
            }
        })
        .catch(error => console.log(error));
    
    document.getElementById('create-post-button').addEventListener('click', () => {
        console.log('creating new post');
        const postToCreate = {
            title: "new post"
        };
        fetch('https://my-json-server.typicode.com/typicode/demo/posts/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(postToCreate)
            })
            .then(response => response.json())
            .then(result => {
                console.log('post was created successfully');
                // refresh whole page:
                //location.reload();
            })
            .catch(error => console.log(error));
    })
}
    
function deletePost(id) {
    console.log('deleting post with id ' + id);
    fetch('https://my-json-server.typicode.com/typicode/demo/posts/' + id,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('post was deleted successfully');
            // refresh whole page:
            //location.reload();
        })
        .catch(error => console.log(error));
}

function updatePost(id) {
    console.log('updating post ' + id);
    const postToUpdate = {
        id: id,
        title: "updated post title" + id
    };
    fetch('https://my-json-server.typicode.com/typicode/demo/posts/' + id,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
        })
        .then(response => response.json())
        .then(result => {
            console.log('post was updated successfully');
            // refresh whole page:
            //location.reload();
        })
        .catch(error => console.log(error));
}