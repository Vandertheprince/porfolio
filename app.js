(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

function diffCalc() { //age
    const diff =
        (new Date().getTime() - new Date("December 30, 2000").getTime()) /
        1000 /
        60 /
        60 /
        24 /
        365;
    return diff.toFixed(9);
}

let age = diffCalc();
let mounted = false;

setInterval(() => {
    age = diffCalc();
    document.getElementById('age').innerText = age;
}, 10);

mounted = true;

const token = "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"; // Replace with your actual token
const apiUrl = `https://api.github.com/users/Vandertheprince`;
const followersUrl = `${apiUrl}/followers`;

let userData;

fetch( apiUrl , {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Log user data for debugging
    console.log('User Data:', data);

    // Save user data for later use
    userData = data;

    // Fetch the number of followers
    return fetch(followersUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
})
.then(response => {
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
})
.then(followersData => {
    // Log followers data for debugging
    console.log('Followers Data:', followersData);

    // Update the content of the .github-info paragraph
    const githubInfoContainer = document.querySelector("#github-info");
    githubInfoContainer.textContent = `${userData.name}`;
    const githubFollowerContainer = document.querySelector("#github-follow");
    githubFollowerContainer.textContent = `${followersData.length}`;
})
.catch(error => {
    console.error('Error fetching GitHub data:', error.message);
});
