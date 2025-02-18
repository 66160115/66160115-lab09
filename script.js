document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  const userList = document.getElementById("user-list");

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.textContent = user.name;
    userDiv.onclick = () => {
      window.location.href = `user-detail.html?userId=${user.id}`;
    };
    userList.appendChild(userDiv);
  });
});
