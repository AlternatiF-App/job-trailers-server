const TrailerCategory = require('../model/trailerCategoryModel')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const trailerCategory = await TrailerCategory.find()
            res.render('admin/trailer_category/view_trailer_category', {
                trailerCategory,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    },
    view_create: async(req, res) => {
        try {
            res.render('admin/trailer_category/create')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    },
    action_create: async(req, res) => {
        try {
            const { name } = req.body
            let trailerCategory = await TrailerCategory({name})
            await trailerCategory.save()

            req.flash('alertMessage', 'Successfully Added Trailer Category');
            req.flash('alertStatus', 'success');
            res.redirect('/trailer-category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    },
    view_edit : async(req, res) => {
        try {
            const { id } = req.params
            const trailerCategory = await TrailerCategory.findById({_id : id})
            res.render('admin/trailer_category/edit', {
                trailerCategory
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    },
    action_edit : async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            await TrailerCategory.findByIdAndUpdate({
                _id : id
            }, {name})

            req.flash('alertMessage', 'Successfully Edit Trailer Category');
            req.flash('alertStatus', 'success');

            res.redirect('/trailer-category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    },
    action_delete : async(req, res) => {
        try {
            const { id } = req.params
            await TrailerCategory.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Trailer Category');
            req.flash('alertStatus', 'success');

            res.redirect('/trailer-category')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/trailer-category')
        }
    }
}