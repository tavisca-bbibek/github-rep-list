const inpUserName = document.getElementById('inp-user-name');
const btnFetch = document.getElementById('btn-fetch');
const repoContainer = document.getElementById('repo-container');
const impRepoContainer = document.getElementById('important-repo-container');
const userName = document.getElementById('user-name-value');

class InfoComponent{
    constructor(label, value){
        this.label = label;
        this.value = value;
        this.initializeElement();
    }

    initializeElement(){
        this.element = document.createElement('div');
        this.element.classList.add('info-container');
        let labelSpan = document.createElement('span');
        labelSpan.classList.add('info-label');
        labelSpan.textContent = this.label + ': ';

        let valueSpan = document.createElement('span');
        valueSpan.classList.add('info-value'); 
        valueSpan.textContent = this.value;  
        
        this.element.appendChild(labelSpan);
        this.element.appendChild(valueSpan);
    }
}

class RepoComponent{
    constructor(){
        this.element = document.createElement('div');
        this.element.classList.add('repo');
        let markButton = document.createElement('button');
        markButton.textContent = 'Mark as important';
        markButton.addEventListener('click', 
        _=> this.handleMarkImportant(this.element));
        this.element.appendChild(markButton);
    }

    handleMarkImportant(repoElement){
        impRepoContainer.appendChild(repoElement);
    }

    addInfo(info) {
        let infoObj = new InfoComponent(info.label, info.value);
        this.element.appendChild(infoObj.element);
    }
}

inpUserName.addEventListener('change', _ => {
    handleRequest();
});
btnFetch.addEventListener('click', _ => {
    handleRequest();
});

function handleRequest(){
    fetchData(inpUserName.value);
    userName.textContent = inpUserName.value;
}

function fetchData(username){
    let url = `https://api.github.com/users/${username}/repos`;
    fetch(url).then(res => res.json())
    .then( data => displayToUi(data))
    .catch(error => console.log(error));
}

function displayToUi(data){
    data.map(repo => createRepoComponent(repo))
    .forEach(repoComponent => repoContainer.appendChild(repoComponent.element));
}

function createRepoComponent(repo){
    let infoList = extractInfo(repo);
    let repoComponent = new RepoComponent();
    infoList.forEach(info => repoComponent.addInfo(info));
    return repoComponent;
}

function extractInfo(repo){
    return [
        {label: 'Name',  value: repo.full_name},
        {label: 'Forks', value: repo.forks_count},
        {label: 'Watchers', value: repo.watchers},
        {label: 'Language', value: repo.language},
        {label: 'Open issues', value: repo.open_issues}
    ];
}