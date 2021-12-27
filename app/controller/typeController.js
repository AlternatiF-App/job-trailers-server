const Type = require('../model/typeModel')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const type = await Type.find()
            res.render('admin/type/view_type', {
                type,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    },
    view_create: async(req, res) => {
        try {
            res.render('admin/type/create')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    },
    action_create: async(req, res) => {
        try {
            const { name } = req.body
            let type = await Type({name})
            await type.save()

            req.flash('alertMessage', 'Successfully Added Type');
            req.flash('alertStatus', 'success');
            res.redirect('/type')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    },
    view_edit : async(req, res) => {
        try {
            const { id } = req.params
            const type = await Type.findById({_id : id})
            res.render('admin/type/edit', {
                type
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    },
    action_edit : async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            await Type.findByIdAndUpdate({
                _id : id
            }, {name})

            req.flash('alertMessage', 'Successfully Edit Type');
            req.flash('alertStatus', 'success');

            res.redirect('/type')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    },
    action_delete : async(req, res) => {
        try {
            const { id } = req.params
            await Type.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Type');
            req.flash('alertStatus', 'success');

            res.redirect('/type')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/type')
        }
    }
}