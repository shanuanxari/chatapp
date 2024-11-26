const Employee = require("../model/Employee")

async function home(req, res) {
   try {
      let data = await Employee.find().sort({ _id: -1 })
      res.render("index", { data: data }) //hbs files in views
   } catch (error) {
      console.log(error)
   }
}

async function searchRecord(req, res) {
   try {
      let search = req.query.search
      let data = await Employee.find({
         $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { designation: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { state: { $regex: search, $options: "i" } },
         ]
      }).sort({ _id: -1 })
      res.render('index', { data: data })
   } catch (error) {
      console.log(error)
   }
}
function addRecord(req, res) {
   res.render("add", {
      data: {},
      errorMessage: {}
   })
}

async function storeRecord(req, res) {
   try {
      var data = new Employee(req.body)
      await data.save()
      res.redirect("/")
   } catch (error) {
      let errorMessage = {}
      error.errors?.name ? errorMessage['name'] = error.errors?.name?.message : null
      error.errors?.email ? errorMessage['email'] = error.errors?.email?.message : null
      error.errors?.phone ? errorMessage['phone'] = error.errors?.phone?.message : null
      error.errors?.designation ? errorMessage['designation'] = error.errors?.designation?.message : null
      error.errors?.salary ? errorMessage['salary'] = error.errors?.salary?.message : null
      res.render("add", {
         data: data,
         errorMessage: errorMessage
      })
   }
}

async function deleteRecord(req, res) {
   try {
      // let data=await Employee.findOne({_id:req.params._id})
      // await data.deleteOne()
      await Employee.deleteOne({ _id: req.params._id })
      res.redirect("/")
   } catch (error) {
      console.log(error)
   }
}
async function editRecord(req, res) {
   try {
      let data = await Employee.findOne({ _id: req.params._id })
      res.render("edit", { data: data, errorMessage: {} })
   } catch (error) {
      console.log(error)
   }
}
async function updatetRecord(req, res) {
   try {
      var data = await Employee.findOne({ _id: req.params._id })
      let resbody = req.body
      data.name = resbody.name
      data.email = resbody.email
      data.phone = resbody.phone
      data.designation = resbody.designation
      data.salary = resbody.salary
      data.city = resbody.city
      data.state = resbody.state

      // data.name=req.body.name
      // data.email=req.body.email
      // data.phone=req.body.phone
      // data.designation=req.body.designation
      // data.salary=req.body.salary
      // data.city=req.body.city
      // data.state=req.body.state

      data.save()
      res.redirect("/")

   } catch (error) {
      let errorMessage = {}
      error.errors?.name ? errorMessage['name'] = error.errors?.name?.message : null
      error.errors?.email ? errorMessage['email'] = error.errors?.email?.message : null
      error.errors?.phone ? errorMessage['phone'] = error.errors?.phone?.message : null
      error.errors?.designation ? errorMessage['designation'] = error.errors?.designation?.message : null
      error.errors?.salary ? errorMessage['salary'] = error.errors?.salary?.message : null
      res.render("edit", {
         data: data,
         errorMessage: errorMessage
      })
   }
}
module.exports = {
   home: home,
   addRecord: addRecord,
   storeRecord: storeRecord,
   deleteRecord: deleteRecord,
   editRecord: editRecord,
   updatetRecord: updatetRecord,
   searchRecord: searchRecord  
}