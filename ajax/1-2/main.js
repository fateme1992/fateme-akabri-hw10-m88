const usersListContainer = document.getElementById('usersList');
const userProfileModalTitle = document.getElementById('userProfileModalTitle');
const userProfileModalBody = document.getElementById('userProfileModalBody');
const modalBody=document.querySelector('.modal-body')
const modalHeader = document.querySelector('.modal-header')
const modalFooter = document.querySelector('.modal-footer')
const modal=document.querySelector('.modal')

const generateProfileInformation = ({ id, email, first_name, last_name, avatar }, collapse = true) => {
    return `
        <img src="${avatar}" class="rounded-circle shadow-1-strong d-flex m-auto mb-4" style="height:100px" alt="${id}">
        <h5 class="card-title">${first_name} ${last_name}</h5>
        <hr />
        <p class="small">UID: ${id}</p>
        <hr />
        <p class="small">Email:${email}</p>
        <button onclick=renderUpdateUser()> Edit</button>
        <button> Delete</button>
        `

}

function resetModal() {
    modalBody.innerHTML = ""
    modalHeader.innerHTML = ""
    modalFooter.innerHTML=""
}

function openModal() {
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none'
}
function renderUpdateUser({ id, ...params }) {
    console.log(id);
    resetModal()
    const user = users.find(user => user.uid === uid)

    document.querySelector('.modal-header').textContent = 'updae user'

    document.querySelector('.modal-body').innerHTML = Object.keys(user)
        .map(property => {
            if (property === 'uid') {
                return (`<input type="text" id="${property}" class="updateInput" value="${user[property]}" disabled></input>`).join('')
            }


            return (`<input type="text" id="${property}" class="updateInput" value="${user[property]}"></input>`)

        })
    modalFooter.innerHTML = `
            <button onclick='updateUser(${user.id})'>save</button>
            <button onclick='renderUpdateUser(${user.id})cancle</button>
        `

}


function updateUser({ id, ...params }) {
    console.log(users);
    const user = users.find(user => user.id === id)

    const updateInputs = document.querySelectorAll('.updateInputs')

    for (const input of updateInputs) {
        if (input.value.trim() === "") return "invalid input"

        if (input.id == 'id') {
            user[input.id] = Number(input.value)
            continue;
        }


        user[input.id] = input.value
    }
    closeModal()
    cardGenerator ({ id, ...params })
}

function showModalInformation({ first_name, last_name, ...params }) {
    const title = `${first_name} ${last_name}`;
    userProfileModalTitle.innerText = title;

    const profileInfo = generateProfileInformation({ first_name, last_name, ...params }, false);

    userProfileModalBody.innerHTML = profileInfo
}

function handleOnClickProfileBtn(id) {
    const targetUser = users.find(el => el.id === id);
    selectedUser = targetUser;
    showModalInformation(targetUser);
}

function cardGenerator({ id, first_name, last_name, avatar, email }) {
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

const usersListGenerator = (filterUsers) => {

    const usersToShow = filterUsers ? filterUsers : users;

    let usersListBody = '';
    for (const user of usersToShow) {
        usersListBody += cardGenerator(user);
    }
    return usersListBody;
}

const renderUsersList = (filterUsers) => {
    usersListContainer.innerHTML = usersListGenerator(filterUsers);
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
pagination()
