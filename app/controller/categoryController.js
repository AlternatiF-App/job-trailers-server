const Category = require('../model/categoryModel')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const category = await Category.find()
            res.render('admin/category/view_category', {
                category,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    view_create: async(req, res) => {
        try {
            res.render('admin/category/create')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    action_create: async(req, res) => {
        try {
            const { name } = req.body
            let category = await Category({name})
            await category.save()

            req.flash('alertMessage', 'Successfully Added Category');
            req.flash('alertStatus', 'success');
            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    view_edit : async(req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findById({_id : id})
            res.render('admin/category/edit', {
                category
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    action_edit : async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            await Category.findByIdAndUpdate({
                _id : id
            }, {name})

            req.flash('alertMessage', 'Successfully Edit Category');
            req.flash('alertStatus', 'success');

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    action_delete : async(req, res) => {
        try {
            const { id } = req.params
            await Category.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Category');
            req.flash('alertStatus', 'success');

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}