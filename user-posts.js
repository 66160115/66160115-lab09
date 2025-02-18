document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();
  document.getElementById("user-name").textContent = user.name;

  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  const posts = await postsResponse.json();
  const postsList = document.getElementById("posts-list");

  posts.forEach(async (post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><button class="toggle-comments">ดูความคิดเห็น</button><div class="comments" style="display: none;"></div>`;
    postsList.appendChild(postDiv);

    const commentsDiv = postDiv.querySelector(".comments");
    const toggleButton = postDiv.querySelector(".toggle-comments");

    toggleButton.onclick = async () => {
      if (commentsDiv.style.display === "none") {
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        const comments = await commentsResponse.json();
        commentsDiv.innerHTML = comments
          .map(
            (comment) =>
              `<p><strong>${comment.name}</strong>: ${comment.body}</p>`
          )
          .join("");
        commentsDiv.style.display = "block";
        toggleButton.textContent = "ซ่อนความคิดเห็น";
      } else {
        commentsDiv.style.display = "none";
        toggleButton.textContent = "ดูความคิดเห็น";
      }
    };
  });
});
