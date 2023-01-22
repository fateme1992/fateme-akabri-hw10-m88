$(() => {
    $.ajax({
        url: 'https://reqres.in/api/users?page=1',
        type: 'GET',
        success: function (response, _status, jqXHR) {
            $.ajax({
                url: 'https://reqres.in/api/users?page=2',
                type: 'GET',
                success: function (response2) {
                    users = response.data.concat(response2.data);
                    console.log(users);
                    pagination()
                },
                error: function (err) {
                    console.log('error in gettting first items', err);
                },
            });


        },
        error: function (err) {
            console.log('error in gettting first items', err);
        },
    });

});

let users = [];
function pagination(currentPage = 1) {
    let numberOfUser = users.length
    let numberOfUserInPerPage = 6
    let currPaeg = currentPage
    let numberOfPages = Math.ceil(numberOfUser / numberOfUserInPerPage)
    let startUser = (currPaeg - 1) * numberOfUserInPerPage
    let endUser = startUser + numberOfUserInPerPage
    let showUserPerPage = users.slice(startUser, endUser)

    if (currPaeg == 2) {
        document.querySelector('.first').classList.remove('active')
        document.querySelector('.second').classList.add('active')
    }
    else {
        document.querySelector('.second').classList.remove('active')
        document.querySelector('.first').classList.add('active')
    }
    renderUsersList(showUserPerPage)
}

const usersListGenerator = (filterUsers) => {

    const usersToShow = filterUsers ? filterUsers : users;

    let usersListBody = '';
    for (const user of usersToShow) {
        usersListBody += cardGenerator(user);
    }
    return usersListBody;
}

const renderUsersList = (filterUsers) => {
    $('#usersList').html(usersListGenerator(filterUsers))
}


function cardGenerator({ id, first_name, last_name, avatar, email }) {
    console.log("test");
    return `
        <div class="col-12 col-md-6  col-lg-4">
            <div class="card shadow ">
                <img src="${avatar}" class="card-img-top" style="height:300px" alt="${id}">
                    <div class="card-body">
                        <h5 class="card-title">${first_name} ${last_name}</h5>
                        <p class='small'>${first_name} ${last_name} is Maktab 45 user by UID of ${id} , you caneasily get in toch with ${first_name} ${last_name} from <span class="small text-primary">${email}</span>.</p>
                        <hr />
                        <p class="small">UID: ${id}</p>
                        <hr />
                        <p class="small">Email:${email}</p>
                        <button
                            onclick="handleOnClickProfileBtn(${id})"
                            class="btn btn-primary rounded-3 w-100"
                            data-bs-toggle="modal" data-bs-target="#userProfileModal"
                        >
                            Profile
                        </button>
                    </div>
            </div>
        </div>
        `
}
function handleOnClickProfileBtn(id) {
    const targetUser = users.find(el => el.id === id);
    selectedUser = targetUser;
    showModalInformation(targetUser);
}
function showModalInformation({ first_name, last_name, ...params }) {
    const title = `${first_name} ${last_name}`;
    $('#userProfileModalTitle').text(title);

    const profileInfo = generateProfileInformation({ first_name, last_name, ...params }, false);

    $('#userProfileModalBody').html(profileInfo)
}
function updateUser(id) {
    console.log(users);
    const user = users.find(user => user.id === id)
    console.log(user);
    const updateInput = $('.updateInput')
    for (let i = 0; i < Object.keys(user).length; i++) {
        console.log(updateInput[i].value);
        // if (updateInput[i].value.trim() === "") return "invalid input"
        // console.log(updateInput[i].id);
        // if (input.id == 'id') {
        //     user[input.id] = Number(input.value)
        //     continue;
        // }
        user[updateInput[i].id] = updateInput[i].value
    }

    closeModal()
    renderUsersList(users)

}

function filterUserList() {
    let searchInput = document.querySelector('#searchUser').value

    let filterUsers = []
    users.forEach(user => {
        let containUser = Object.values(user).some((value) =>
            String(value).includes(searchInput))

        if (containUser) {
            filterUsers.push(user);
        }
    });

    renderUsersList(filterUsers)
}
function openModal() {
    $('.modal').css("display", "block")
    $('.modal-backdrop').css("display", "block")
}

function closeModal() {
    $('.modal').css("display", "none")
    $('.modal-backdrop').css("display", "none")
}
function renderUpdateUser(id) {
    console.log(id);
    resetModal()
    const user = users.find(user => user.id === +id)
    console.log(users);
    console.log(users.find(user => user.id == id));

    $('.modal-header').text('updae user')

    $('.modal-body').html(Object.keys(user)
        .map(property => {
            if (property === 'id') {
                return (`<input type="text" id="${property}" class="updateInput" value="${user[property]}" disabled></input>`)
            }
            return (`<input type="text" id="${property}" class="updateInput" value="${user[property]}"></input>`)
        }))

    $('.modal-footer').html(`
    <button onclick='updateUser(${user.id})'>save</button>
    <button onclick='renderUpdateUser(${user.id})cancle</button>
`)

}
const generateProfileInformation = ({ id, email, first_name, last_name, avatar }, collapse = true) => {
    return `
        <img src="${avatar}" class="rounded-circle shadow-1-strong d-flex m-auto mb-4" style="height:100px" alt="${id}">
        <h5 class="card-title">${first_name} ${last_name}</h5>
        <hr />
        <p class="small">UID: ${id}</p>
        <hr />
        <p class="small">Email:${email}</p>
        <button onclick=renderUpdateUser(${id})> Edit</button>
        <button onclick="deleteUser(${id})">delete</button> 
        `

}

function deleteUser(id) {
   
    users = users.filter(item => item.id !== +id)

    console.log(users);

    renderUsersList(users)
    closeModal()
}

function resetModal() {
    $('.modal-body').html("")
    $('.modal-header').html("")
    $('.modal-footer').html("")
}
