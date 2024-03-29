
window.addEventListener("load", async () => {
   loadUsers()
})


const form= document.querySelector("form")

let usersList=[]

form.addEventListener("submit", (e)=>
{
    e.preventDefault()
    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username,password) 

    if (!authenticated) {
        localStorage.currentUser=JSON.stringify(undefined)
        alert("Incorrect user ID or password")
        
    }else{
        localStorage.currentUser=JSON.stringify(authenticated)
    }
    
})

async function loadUsers(){
    console.log("loaded");
    const data = await fetch('/database/user.json')
    const users = await data.json()
    usersList= users.users
    localStorage.users = JSON.stringify(usersList)

}


function authentication(username1,password) {
   let acc;
   for (const user of usersList) {
    if (username1 == user.username) {
        acc = user;
        if(password=== user.password){
            alert("loged in")
            return acc
        }else{

            return null
        }
    }
   }
console.log(acc);
    
}

