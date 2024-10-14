let allPets = [];
let currentPets = [];

// Load All Pets form API
const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    allPets = data.pets;
    currentPets = [...allPets];
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('card-container').classList.remove('grid');
    setTimeout(() => {
        displayAllPets(currentPets) 
    }, 2000)
}

// Load Categories form API
const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories)
}

// Load Details form API
const loadDetails = async (pet_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pet_id}`);
    const data = await res.json()
    displayDetails(data.petData)
}

// Category Wise Videos
const categoriesVideo = async (category_name, id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category_name}`);
    const data = await res.json();
    const activeBtn = document.getElementById(`btn-${id}`);
    const buttons = document.getElementsByClassName('btn-category');
    for (let btn of buttons) {
        btn.classList.remove('bg-[rgba(14,121,129,0.3)]')
        btn.removeAttribute('style')
    }
    activeBtn.classList.add('bg-[rgba(14,121,129,0.3)]');
    activeBtn.style.borderRadius = '2rem';
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('card-container').innerHTML = `
        <span class="loading loading-bars loading-lg py-24 mx-auto" ></span>
    `;
    setTimeout(() => {
        currentPets = data.data;
        displayAllPets(currentPets); 
    }, 1000)
}

// Display Details
const displayDetails = (items) => {
    const modalContainer = document.getElementById('modal-box');
    modalContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <img src=${items.image} class="rounded-lg mb-3 w-full h-60">
        <h2 class="font-bold mb-1 text-lg">${items.pet_name}</h2>
        <div class="text-gray-600 mb-3 md:flex gap-10">
            <div>
                <p><i class="fa-solid fa-location-crosshairs"></i> Breed: ${items.breed ? items.breed : 'Not Available'}</p>
                <p><i class="fa-regular fa-user"></i> Gender: ${items.gender ? items.gender : 'Not Available'}</p>
                <p><i class="fa-regular fa-calendar"></i> Vaccinated Status: ${items.vaccinated_status ? items.vaccinated_status : 'Not Available'}</p>
            </div>
            <div>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${items.date_of_birth ? items.date_of_birth : 'Not Available'}</p>
                <p><i class="fa-solid fa-sack-dollar"></i> Price : ${items.price ? items.price : 'Not Available'}$</p>
            </div>
        </div>
        <h2 class="font-semibold text-lg">Details Information</h2>
        <p class="py-2">${items.pet_details ? items.pet_details : 'Not Available'}</p>
        <div class="modal-action">
            <form method="dialog" class="block w-full">
                <button class="btn w-full block bg-[rgba(14,121,129,0.2)] text-primary border border-[rgba(14,121,129,0.4)]">Cancel</button>
            </form>
        </div>
    `
    modalContainer.appendChild(div)
    my_modal_5.showModal()
}

// Display Categories
const displayCategories = (items) => {
    const categoriesBtn = document.getElementById('categories-btn');
    items.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="categoriesVideo('${item.category}', '${item.id}')" class="flex gap-2 items-center font-extrabold text-lg rounded-lg px-14 py-3 border border-[#0E7A81] border-opacity-20 btn-category" id="btn-${item.id}"><img src=${item.category_icon} class="w-9"> ${item.category}</button>
        `;
        categoriesBtn.appendChild(div)
    })
}

// Display All Pets
const displayAllPets = (items) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (items.length === 0) {
        cardContainer.classList.remove('grid');
        cardContainer.innerHTML = `
            <div class="text-center py-10">
                <img src="images/error.webp" class="mx-auto">
                <h2 class="font-bold text-xl mt-3">No Content Here in this Category</h2>
            </div>
        `;
        return
    } else {
        cardContainer.classList.add('grid');
    }
    items.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'p-4 border rounded-lg';
        div.innerHTML = `
            <img src=${item.image} class="rounded-lg mb-3 w-full">
            <h2 class="font-bold mb-1 text-lg">${item.pet_name}</h2>
            <div class="space-y-1 text-gray-600 mb-3">
                <p><i class="fa-solid fa-location-crosshairs"></i> Breed: ${item.breed ? item.breed : 'Not Available'}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${item.date_of_birth ? item.date_of_birth : 'Not Available'}</p>
                <p><i class="fa-regular fa-user"></i> Gender: ${item.gender ? item.gender : 'Not Available'}</p>
                <p><i class="fa-solid fa-sack-dollar"></i> Price : ${item.price ? item.price : 'Not Available'}$</p>
            </div>
            <hr>
            <div class="mt-4 flex justify-around text-primary font-bold text-sm">
                <button class="border py-1 px-3 rounded hover:text-white hover:bg-primary duration-300" onclick="handleLikeBtn('${item.image}')">
                    <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button id='adopt-btn' onclick="ModalForAdoptBtn(this)" class="border py-1 px-3 rounded hover:text-white hover:bg-primary duration-300">Adopt</button>
                <button onclick="loadDetails('${item.petId}')" class="border py-1 px-3 rounded hover:text-white hover:bg-primary duration-300">Details</button>
            </div>
        `;
        cardContainer.appendChild(div)
    })
}

// Sort pets by price in descending order
const sortByPriceDescending = () => {
    const sortedPets = [...currentPets].sort((a, b) => {
        return b.price - a.price;
    });
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('card-container').innerHTML = `
        <span class="loading loading-bars loading-lg py-24 mx-auto" ></span>
    `;
    setTimeout(() => {
        displayAllPets(sortedPets);
    }, 1000)
};

const handleLikeBtn = (cardImage) => {
    const cardImages = document.getElementById('card-image');
    const div = document.createElement('div');
    div.classList = 'h-24';
    div.innerHTML = `
        <img src=${cardImage} class="rounded-lg h-full w-full">
    `;
    cardImages.appendChild(div)
}

// Countdown Modal For Adopt Button
const ModalForAdoptBtn = (button) => {
    let countdown = 3;
    const modalBtnContainer = document.getElementById("my_modal_2")
    modalBtnContainer.innerHTML = `
        <div class="modal-box text-center py-10">
                <img src="https://img.icons8.com/?size=100&id=q6BlPrJZmxHV&format=png&color=000000" class="w-16 mb-3 mx-auto">
                <h3 class="text-3xl font-bold">Congrats</h3>
                <p class="py-3">Adoption process is Start For you Pet</p>
                <span class="text-5xl font-black" id="countdown">${countdown}</span>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
    `;
    my_modal_2.showModal();
    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').innerText = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            my_modal_2.close()
            button.innerText = 'Adopted'
            button.classList.add('text-gray-400')
        }
    }, 1000)
}


loadCategories()
loadAllPets()


