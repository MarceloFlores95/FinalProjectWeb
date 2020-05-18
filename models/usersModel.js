const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    actual_weight: {
        type: Number
    },
    initial_weight: {
        type: Number
    },
    goal: {
        type: Number
    },
    routines: [{
        monday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        tuesday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        wednesday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        thursday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        friday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        saturday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        sunday: {
            muscle: {
                type: String
            },
            exercise: {
                type: String
            }
        },
        private: {
            type: Boolean
        }
    }] 

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5), null)
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
};

const userCollection = mongoose.model('users', userSchema);

const Users = {
   createUser : function(newUser) {
       return userCollection // db.students.insert(newStudent)
                .create(newUser)
                .then(createUser =>{
                    return createUser;
                })
                .catch(err => {
                    return err;
                });
   },
   getAllUsers : function() {
       return userCollection
                .find()
                .then(allUsers => {
                    return allUsers
                })
                .catch(err => {
                    return err
                });
   },
   getUserById : function(userID) {
       filter = {
           _id: userID
       }
        return userCollection
            .findOne(filter)
            .then(user => {
                return user
            })
            .catch(err => {
                return err
            })
    },
    updateUser: function (userInfo){
        const id = {_id: userInfo.id};
        upUser = userInfo
        // console.log("Im in the schema")
        // console.log(id)
        // console.log(upUser)
        return userCollection
                .updateOne(id, upUser)
                    .then(result => {
                        console.log(result)
                        return result
                    })
                    .catch(err => {
                        return err
                    })

    }
    /*
   },
   deleteStudentById : function (studentId) {
        const filter = {id: studentId};
        return studentsCollection
                    .deleteOne(filter)
                        .then(deleted => {
                            if(deleted.n == 0) {
                                return undefined
                            } else {
                                return true
                            } 
                        })
                        .catch(err => {
                            return err
                        })
   }
   */
}

module.exports = {
    User: userCollection,
    Users: Users
}
// module.exports = {Users}