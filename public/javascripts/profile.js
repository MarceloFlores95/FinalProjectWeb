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
                <button id="modalUserInfo" onclick="deleteInfoUser('${id}')" >Delete Account</button>
            </div>
            `
        })
        .catch( err => {
            console.log(err.message)
        });
    
}

function deleteInfoUser(id) {
    console.log("DeleteUserSection")
    let url = `profile/deleteUser/${id}`;
    
    let settings = {
        method : 'GET',
    }

    fetch(url,settings)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err =>{
            console.log(err)
        })

    
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
            goalFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });
    },{once : true})
    
}

function createNewRoutine(id) {
    console.log("CreateNewRoutine")
    // console.log(id)
    // Get the modal
    var modal = document.getElementById("createRoutineModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalCreateRoutine");

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

function saveNewRoutine(id) {
    console.log("Save New Routine")

    let modalForm = document.querySelector( '.modalCreateRoutine' );
    var modal = document.getElementById("createRoutineModal");
    modal.style.display = "none";

    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let firstMuscleMonday = document.getElementById("First_Muscle_Monday")
        firstMuscleMonday = firstMuscleMonday.options[firstMuscleMonday.selectedIndex].value;
        let secondMuscleMonday = document.getElementById("Second_Muscle_Monday")
        secondMuscleMonday = secondMuscleMonday.options[secondMuscleMonday.selectedIndex].value;
        
        let firstMuscleTuesday = document.getElementById("First_Muscle_Tuesday")
        firstMuscleTuesday = firstMuscleTuesday.options[firstMuscleTuesday.selectedIndex].value;
        let secondMuscleTuesday = document.getElementById("Second_Muscle_Tuesday")
        secondMuscleTuesday = secondMuscleTuesday.options[secondMuscleTuesday.selectedIndex].value;
        
        let firstMuscleWednesday = document.getElementById("First_Muscle_Wednesday")
        firstMuscleWednesday = firstMuscleWednesday.options[firstMuscleWednesday.selectedIndex].value;
        let secondMuscleWednesday = document.getElementById("Second_Muscle_Wednesday")
        secondMuscleWednesday = secondMuscleWednesday.options[secondMuscleWednesday.selectedIndex].value;
        
        let firstMuscleThursday = document.getElementById("First_Muscle_Thursday")
        firstMuscleThursday = firstMuscleThursday.options[firstMuscleThursday.selectedIndex].value;
        let secondMuscleThursday = document.getElementById("Second_Muscle_Thursday")
        secondMuscleThursday = secondMuscleThursday.options[secondMuscleThursday.selectedIndex].value;
        
        let firstMuscleFriday = document.getElementById("First_Muscle_Friday")
        firstMuscleFriday = firstMuscleFriday.options[firstMuscleFriday.selectedIndex].value;
        let secondMuscleFriday = document.getElementById("Second_Muscle_Friday")
        secondMuscleFriday = secondMuscleFriday.options[secondMuscleFriday.selectedIndex].value;
        
        let privateRoutine = document.getElementById("privateRoutine")
        privateRoutine = privateRoutine.options[privateRoutine.selectedIndex].value;

        if (privateRoutine != "True") {
            privateRoutine = true
        } else {
            privateRoutine = false
        }

        let data = { 
            routines:{ 
                monday:{
                    muscle1: firstMuscleMonday,
                    muscle2: secondMuscleMonday,
                    exercise: "Null"
                },
                tuesday:{
                    muscle1: firstMuscleTuesday,
                    muscle2: secondMuscleTuesday,
                    exercise: "Null"
                },
                wednesday:{
                    muscle1: firstMuscleWednesday,
                    muscle2: secondMuscleWednesday,
                    exercise: "Null"
                },
                thursday:{
                    muscle1: firstMuscleThursday,
                    muscle2: secondMuscleThursday,
                    exercise: "Null"
                },
                friday:{
                    muscle1: firstMuscleFriday,
                    muscle2: secondMuscleFriday,
                    exercise: "Null"
                },
                private: privateRoutine
            }
        }
        
        let url = `profile/userPushRoutine/${id}`;
        
        let settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }
        console.log(settings)
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
            console.log(responseJSON)
            
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
            routinesFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });

    }, {once : true})
}

function routinesFetchSection(id) {
    console.log("Routines Fetch Section")
    section.innerHTML = `
        <div class= 'routineClass'>
            <button id = 'createRoutine' onclick="createNewRoutine('${id}')"> Create new routine</button>
    `
    console.log(id)
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
            if (responseJSON.routines.length > 0) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    section.innerHTML += ` 
                                <div class= 'eachRoutineClass'>
                                    <div class = "daysofexercise"> 
                                        <section>
                                            <h3>Monday:<h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].monday.muscle1} and ${responseJSON.routines[i].monday.muscle2}</h4>
                                        </section>
                                        <section>
                                            <h3>Tuesday:<h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].tuesday.muscle1} and ${responseJSON.routines[i].tuesday.muscle2}</h4>
                                        </section>
                                        <section>
                                            <h3>Wednesday:<h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].wednesday.muscle1} and ${responseJSON.routines[i].wednesday.muscle2}</h4>
                                        </section>
                                        <section>
                                            <h3>Thursday:<h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].thursday.muscle1} and ${responseJSON.routines[i].thursday.muscle2}</h4>
                                        </section>
                                        <section>
                                            <h3>Friday:<h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].friday.muscle1} and ${responseJSON.routines[i].friday.muscle2}</h4>
                                        </section>
                                        <p>This routine is ${responseJSON.routines[i].private}</p>
                                    </div>
                                    <button onclick=modifyRoutine(${JSON.stringify(responseJSON.routines[i])},${i})>Modify routine</button>
                                    <button onclick=eraseRoutine(${i})>Erase routine</button>
                                </div> 
                    `
                }
            } else {
                section.innerHTML += `
                <p>You dont have routines, please add one.<p>
                `
            }
            
        })
        .catch( err => {
            console.log(err.message)
        });

    
    section.innerHTML +=`</div> `
}

function eraseRoutine() {
    
}

function modifyRoutine(routine,positionRoutine) {
    console.log("PositionNewRoutine")
    // console.log(id)
    // Get the modal
    var modal = document.getElementById("modifyRoutineModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalModifyRoutine");

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
    // console.log(routine)
    // console.log(positionRoutine)
    var labelRt = document.querySelector("#labelForIDRoutine").innerHTML = JSON.stringify(positionRoutine)
    // console.log(labelRt)
}

function saveModifyRoutine(positionRoutine, id) {
    console.log("Save Modify Routine")
    
    routine = JSON.parse(positionRoutine)
    // console.log(routine)
    // console.log(routine._id)
    // console.log(id)
    let modalForm = document.querySelector( '.modalModifyRoutine' );
    var modal = document.getElementById("modifyRoutineModal");

    modal.style.display = "none";

    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let firstMuscleMonday = document.getElementById("First_Muscle_MondayNew")
        firstMuscleMonday = firstMuscleMonday.options[firstMuscleMonday.selectedIndex].value;
        let secondMuscleMonday = document.getElementById("Second_Muscle_MondayNew")
        secondMuscleMonday = secondMuscleMonday.options[secondMuscleMonday.selectedIndex].value;
        
        let firstMuscleTuesday = document.getElementById("First_Muscle_TuesdayNew")
        firstMuscleTuesday = firstMuscleTuesday.options[firstMuscleTuesday.selectedIndex].value;
        let secondMuscleTuesday = document.getElementById("Second_Muscle_TuesdayNew")
        secondMuscleTuesday = secondMuscleTuesday.options[secondMuscleTuesday.selectedIndex].value;
        
        let firstMuscleWednesday = document.getElementById("First_Muscle_WednesdayNew")
        firstMuscleWednesday = firstMuscleWednesday.options[firstMuscleWednesday.selectedIndex].value;
        let secondMuscleWednesday = document.getElementById("Second_Muscle_WednesdayNew")
        secondMuscleWednesday = secondMuscleWednesday.options[secondMuscleWednesday.selectedIndex].value;
        
        let firstMuscleThursday = document.getElementById("First_Muscle_ThursdayNew")
        firstMuscleThursday = firstMuscleThursday.options[firstMuscleThursday.selectedIndex].value;
        let secondMuscleThursday = document.getElementById("Second_Muscle_ThursdayNew")
        secondMuscleThursday = secondMuscleThursday.options[secondMuscleThursday.selectedIndex].value;
        
        let firstMuscleFriday = document.getElementById("First_Muscle_FridayNew")
        firstMuscleFriday = firstMuscleFriday.options[firstMuscleFriday.selectedIndex].value;
        let secondMuscleFriday = document.getElementById("Second_Muscle_FridayNew")
        secondMuscleFriday = secondMuscleFriday.options[secondMuscleFriday.selectedIndex].value;
        
        let privateRoutine = document.getElementById("privateRoutineNew")
        privateRoutine = privateRoutine.options[privateRoutine.selectedIndex].value;

        if (privateRoutine != "True") {
            privateRoutine = false
        } else {
            privateRoutine = true
        }

        let data = { 
            routines:{ 
                monday:{
                    muscle1: firstMuscleMonday,
                    muscle2: secondMuscleMonday,
                    exercise: "Null"
                },
                tuesday:{
                    muscle1: firstMuscleTuesday,
                    muscle2: secondMuscleTuesday,
                    exercise: "Null"
                },
                wednesday:{
                    muscle1: firstMuscleWednesday,
                    muscle2: secondMuscleWednesday,
                    exercise: "Null"
                },
                thursday:{
                    muscle1: firstMuscleThursday,
                    muscle2: secondMuscleThursday,
                    exercise: "Null"
                },
                friday:{
                    muscle1: firstMuscleFriday,
                    muscle2: secondMuscleFriday,
                    exercise: "Null"
                },
                private: privateRoutine
            }
        }


        let Arr = [routine,data]
        let url = `profile/userModifyRoutine/${id}`;
        
        let settings = {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(Arr)
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
            console.log(responseJSON)
            
            var modal = document.getElementById("labelForIDRoutine");

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
            routinesFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });

    }, {once : true})
}

function returnIDRoutine() {
    console.log('returnIDRoutine')
    var labelRt = document.querySelector("#labelForIDRoutine").innerHTML
    return labelRt
}


function exerciseSection() {

    section.innerHTML = `exercise`
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
    // move()
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