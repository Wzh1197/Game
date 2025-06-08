// 从 localStorage 加载网站列表
function loadWebsites() {
    const websites = JSON.parse(localStorage.getItem('websites')) || [];
    const websiteList = document.getElementById('websiteList');
    websiteList.innerHTML = '';

    websites.forEach((website, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${website}" target="_blank">${website}</a>`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            deleteWebsite(index);
        });

        li.appendChild(deleteButton);
        websiteList.appendChild(li);
    });
}

// 添加网站到 localStorage
function addWebsite() {
    const websiteUrl = document.getElementById('websiteUrl').value;
    if (websiteUrl) {
        const websites = JSON.parse(localStorage.getItem('websites')) || [];
        websites.push(websiteUrl);
        localStorage.setItem('websites', JSON.stringify(websites));
        document.getElementById('websiteUrl').value = '';
        loadWebsites();
    }
}

// 从 localStorage 删除网站
function deleteWebsite(index) {
    const websites = JSON.parse(localStorage.getItem('websites')) || [];
    websites.splice(index, 1);
    localStorage.setItem('websites', JSON.stringify(websites));
    loadWebsites();
}

// 初始化加载网站列表
loadWebsites();

// 监听添加按钮点击事件
document.getElementById('addWebsite').addEventListener('click', addWebsite);

// 监听回车键事件
document.getElementById('websiteUrl').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addWebsite();
    }
});