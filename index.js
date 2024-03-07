class User {
    constructor(id, firstName, lastName, email, phone, image, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.address = address;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get fullAddress() {
        return `${this.address.address}, ${this.address.city}`;
    }
}
async function fetchUserData() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        const container = document.getElementById('user_information');

        data.users.forEach(userData => {
            // Create an instance of User
            const user = new User(
                userData.id,
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.phone,
                userData.image,
                userData.address
            );

            // Use the user instance to create the user card
            const usercard = document.createElement('div');
            usercard.className = 'user-card';

            const image = document.createElement('img');
            image.src = user.image;
            usercard.appendChild(image);

            const info = document.createElement('div');
            info.className = 'user-info';
            info.innerHTML = 
            `   <p> Firstname: ${user.firstName} Lastname: ${user.lastName}</p>
                <p> Email: ${user.email} </p>
                <p> Phone Number: ${user.phone} </p>
                <p> Address: ${user.fullAddress} </p>`
            ;

            usercard.appendChild(info);
            container.appendChild(usercard);
        });
    } catch (error) {
        console.error(`Error! ${error}`);
    }
}

fetchUserData();