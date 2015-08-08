function controller(request, reply) {
    return reply({
        owner_url: "https://api.customelements.io/owners/{owner}",
        owner_count_url: "https://api.customelements.io/count/owners",
        owner_repos_url: "https://api.customelements.io/owners/{owner}/repos",
        owner_search_url: "https://api.customelements.io/search/owners?q={query}{&page,per_page,sort,order}",
        repo_url: "https://api.customelements.io/repos/{owner}/{repo}",
        repo_count_url: "https://api.customelements.io/count/repos",
        repo_search_url: "https://api.customelements.io/search/repos?q={query}{&page,per_page,sort,order}"
    });
}

module.exports = controller;