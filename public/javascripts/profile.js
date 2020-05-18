let section = document.querySelector('.results')

function saveNewInfo(id) {
    let modalForm = document.querySelector( '.modalUserInfo' );
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    
    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        // /userPatch/:id
        let url = `profile/userPatch/${id}`;
        
        let nameInput = document.getElementById('input-name').value
        let ageInput = document.getElementById('input-age').value
        let heightInput = document.getElementById('input-height').value
        let actualWeightInput = document.getElementById('input-actual-weight').value
        let initialWeightInput = document.getElementById('input-initial-weight').value
        
        let data = {
            name : nameInput,
            age : ageInput,
            height: heightInput,
            actual_weight: actualWeightInput,
            initial_weight: initialWeightInput
        }
        
        let settings = {
            method : 'PATCH',
            headers : data
        }
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            profileFetchSection(id)
            
        })
        .catch( err => {
            console.log(err.message)
        });
    },{once : true})

    
    
}

function editInfoUser() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalUserInfo");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function profileFetchSection(id){
    console.log("ProfileFetchSection")
    // section.innerHTML = `profile`

    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            section.innerHTML = `
            <div class="userInfo">
                <label for="">Name:${responseJSON.name}</label>
                <br>
                <label for="">Age:${responseJSON.age} </label>
                <br>
                <label for="">Height:${responseJSON.height} </label>
                <br>
                <label for="">Actual Weight:${responseJSON.actual_weight} </label>
                <br>
                <label for="">Inicial Weight:${responseJSON.initial_weight} </label>
            </div>
            <div class="buttonInfo">
                <button id="modalUserInfo" onclick="editInfoUser()" >Modify Information</button>
            </div>
            `
        })
        .catch( err => {
            console.log(err.message)
        });
    
}

function progressFetchSection(id) {
    
    console.log("ProgressFetchSection")
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            if (responseJSON.goal != 0) {    
                progress = ((responseJSON.initial_weight-responseJSON.actual_weight) * 100) / (responseJSON.initial_weight - responseJSON.goal)
                section.innerHTML = `
                                    <div class = "userProgress"> 
                                    
                                    <h1>Current Weight:</h1>
                                    <h4>${responseJSON.actual_weight}</h4>
                                    
                                    <h2>Your progress is:</h2>
                                    <h4>${progress} %</h4>
                                    <div id="myProgress">
                                        <div id="myProgressBar"></div>
                                    </div>
                                    </div>
                                    `
            } else {
                section.innerHTML = `
                                    <div class = "userProgress"> 
                                    
                                    <h1>Current Weight:</h1>
                                    <h4>${responseJSON.actual_weight}</h4>
                                    
                                    <h2>Your actual goal is 0, please change it.</h2>
                                    </div>
                                    `
            }
            move()
        })
        .catch( err => {
            console.log(err.message)
        });
                            
}

function goalFetchSection(id) {
    console.log("GoalFetchSection")
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            section.innerHTML = `
            <div class = "userGoal">     
                <h1>Your goal is:</h1>
                <h4>${responseJSON.goal} </h4>      
            </div>
            <div class="buttonInfo">
                <button id="modalGoalInfo" onclick="editGoalUser()" >Modify Information</button>
            </div>
            `
        })
        .catch( err => {
            console.log(err.message)
        });

}

function editGoalUser() {
    // Get the modal
    var modal = document.getElementById("goalModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalUserGoal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function saveNewGoal(id) {
    let modalForm = document.querySelector( '.modalUserGoal' );
    var modal = document.getElementById("goalModal");
    modal.style.display = "none";
    
    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        // /userPatch/:id
        let url = `profile/userPatch/${id}`;
        
        let goalInput = document.getElementById('input-goal').value

        let data = {
            goal : goalInput
        }
        
        let settings = {
            method : 'PATCH',
            headers : data
        }
        
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            var modal = document.getElementById("goalModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            
        })
        .catch( err => {
            console.log(err.message)
        });
    },{once : true})

    goalFetchSection(id)
    
}

function routinesSection() {

    section.innerHTML = `routines`
}
function exerciseSection() {

    section.innerHTML = `exercise`
}
function goalSection() {
    
    section.innerHTML = `goal`
}

function userRequest(section, id) {
    if(section == 'profile') {
        profileFetchSection(id)
    }
    if(section == 'progress') {
        progressSection()
    }
    if(section == 'routines') {
        routinesSection()
    }
    if(section == 'exercise') {
        exerciseSection()
    }
    if(section == 'goal') {
        goalSection()
    }

}

function userLogOut() {
    console.log("User Logout")

    let url = `profile/logout`;
    
    let settings = {
        method : 'GET',
    }

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                location.reload()
                return response;
            }
            throw new Error( response.statusText );
        })
        .catch( err => {
            console.log(err.message)
        });
    
}


function init(){
    // watchUserProfile();
    // watchAddStudentForm();
    move()
}


var progress = 0
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myProgressBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= progress) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


// init();