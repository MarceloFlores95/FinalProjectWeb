<h1>Final Proyect Web</h1>
<hr>
<h3>How to run the project:</h3>
<p> First install all dependencies with this:</p>
<pre>
    <code>npm install</code>
</pre>
<p> Then run the project with this command:</p>
<pre>
    <code>npm run</code>
</pre>
<hr>
<h3>Endpoints: </h3>
<h4>Profile:<h4>
<p>To get all the informaion for the profile page we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('profile', { 
    title: 'Profile',
    name: req.user.name,
    id: req.user.id,
    age: req.user.age,
    actual_weight: req.user.actual_weight,
    initial_weight: req.user.initial_weight,
    height: req.user.height,
    goal: req.user.goal,
    routines: req.user.routines
  });
});
</p>

<p>
router.get('/userInfo/:id',isLoggedIn ,(req,res,next) => {
  let userID = req.params.id
  Users
  .getUserById(userID)
  .then(result => {
      console.log(result)
      return res.status(200).json(result);
  })
  .catch(err =>{
      res.statusMessage = "Something is wrong with the Database. Try again later."
      return res.status(500).end();
  })
})
</p>

<p>
router.get('/deleteUser/:id',isLoggedIn,(req,res,next) => {
  let userID = req.params.id
  console.log("Delete")
  console.log(userID)

  Users
    .deleteUser(userID)
    .then(result => {
      res.redirect('/')
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).end();
    })
})
</p>
<p>
router.patch('/userPatch/:id', isLoggedIn, (req,res,next) => {
  let userID = req.params.id
  
  let userUpdate = {}
  if (req.params.id) {
    userUpdate['id'] = req.params.id
  }
  if (req.headers.name) {
    userUpdate['name'] = req.headers.name
  }
  if (req.headers.age) {
    userUpdate['age'] = req.headers.age
  }
  if (req.headers.height) {
    userUpdate['height'] = req.headers.height
  }
  if (req.headers.actual_weight) {
    userUpdate['actual_weight'] = req.headers.actual_weight
  }
  if (req.headers.initial_weight) {
    userUpdate['initial_weight'] = req.headers.initial_weight
  }
  if (req.headers.goal) {
    userUpdate['goal'] = req.headers.goal
  }
  // console.log(userUpdate)
  Users
    .updateUser(userUpdate)
        .then(result => {
            return res.status(202).json(result); 
        })
        .catch(err => {
            return err
        })
      
})
</p>
<p>
router.post('/userPushRoutine/:id',[jsonParser,isLoggedIn],(req,res,next) => {
    let userID = req.params.id
    // console.log()
    let userRoutine = req.body
    // console.log(userID,userRoutine)
    Users
      .addRoutineUser(userID,userRoutine)
          .then(result => {
            return res.status(202).json(result)
          })
          .catch(err => {
            return err
          })
})
</p>
<p>
router.patch('/userModifyRoutine/:id',[jsonParser,isLoggedIn], (req,res,next) => {
  let userID = req.params.id
  let positionRoutine = req.body[0]
  let userNewRoutine = req.body[1]
  
  Users
    .updateRoutine(userID,positionRoutine,userNewRoutine)
      .then(result => {
        console.log(result)
        return res.status(202).json(result)
      })
      .catch(err => {
        return err
      })

})
</p>
<p>
router.delete('/userDeleteRoutine/:id', isLoggedIn, (req,res,next) => { 
  let userID = req.params.id
  let positionRoutine = req.headers.position
  let idRoutine = req.headers.idroutine
  //console.log("Delete")
  //console.log(userID)
  //console.log(positionRoutine)
  //console.log(idRoutine)
  
  Users
    .deleteRoutine(userID,positionRoutine,idRoutine)
      .then(result => {
        console.log(result)
        return res.status(404).json(result)
      })
      .catch(err => {
        return err
      })
  
}),
</p>
<p>
router.delete('/userDeleteFavorite/:id', isLoggedIn, (req,res,next) => { 
  let userID = req.params.id
  let positionRoutine = req.headers.position
  let idRoutine = req.headers.idroutine
  //console.log("Delete")
  //console.log(userID)
  //console.log(positionRoutine)
  //console.log(idRoutine)
  
  Users
    .deleteFavoriteRoutine(userID,positionRoutine,idRoutine)
      .then(result => {
        console.log(result)
        return res.status(404).json(result)
      })
      .catch(err => {
        return err
      })
  
})
</p>
<p>
router.get('/logout',isLoggedIn, (req,res, next) => {
  req.logout()
  res.redirect('/');
})
</p>
<p>
router.use('/',notLoggedIn, (req,res,next) => {
  next();
})
</p>
<p>
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'profile'});
  //res.send('login')
});
</p>


module.exports = router;


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

function notLoggedIn(req,res,next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile')
}
